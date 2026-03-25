'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

interface Letter {
  id: string;
  title: string;
  slug: string;
  subject_line: string | null;
  body_html: string;
  body_text: string;
  status: string;
  recipient_count: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
}

interface Recipient {
  id: string;
  email: string;
  name: string | null;
  opened_at: string | null;
  clicked_at: string | null;
  created_at: string;
}

export default function LetterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const letterId = params.id as string;
  const { toasts, addToast, removeToast } = useToast();

  const [letter, setLetter] = useState<Letter | null>(null);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // Recipient form
  const [showAddRecipient, setShowAddRecipient] = useState(false);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [addingRecipient, setAddingRecipient] = useState(false);

  // Edit mode
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editSubject, setEditSubject] = useState('');
  const [editBody, setEditBody] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchLetter = useCallback(async () => {
    const res = await fetch(`/api/letters/${letterId}`);
    const json = await res.json();
    if (json.data) {
      setLetter(json.data);
      setEditTitle(json.data.title);
      setEditSubject(json.data.subject_line || '');
      setEditBody(json.data.body_html);
    }
  }, [letterId]);

  const fetchRecipients = useCallback(async () => {
    const res = await fetch(`/api/letters/${letterId}/recipients?limit=100`);
    const json = await res.json();
    if (json.data?.items) {
      setRecipients(json.data.items);
    }
  }, [letterId]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      await Promise.all([fetchLetter(), fetchRecipients()]);
      setLoading(false);
    }
    load();
  }, [fetchLetter, fetchRecipients]);

  async function handleSend() {
    if (!confirm('Are you sure you want to send this letter to all recipients?')) return;
    setSending(true);
    const res = await fetch(`/api/letters/${letterId}/send`, { method: 'POST' });
    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
    } else {
      addToast(json.data.message || 'Letter sent!', 'success');
      await fetchLetter();
    }
    setSending(false);
  }

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this letter? This cannot be undone.')) return;
    setDeleting(true);
    const res = await fetch(`/api/letters/${letterId}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
      setDeleting(false);
    } else {
      addToast('Letter deleted', 'success');
      router.push('/letters');
    }
  }

  async function handleAddRecipient(e: React.FormEvent) {
    e.preventDefault();
    setAddingRecipient(true);
    const res = await fetch(`/api/letters/${letterId}/recipients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipients: [{ email: recipientEmail, name: recipientName || null }],
      }),
    });
    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
    } else {
      addToast('Recipient added', 'success');
      setRecipientEmail('');
      setRecipientName('');
      setShowAddRecipient(false);
      await Promise.all([fetchRecipients(), fetchLetter()]);
    }
    setAddingRecipient(false);
  }

  async function handleRemoveRecipient(recipientId: string) {
    const res = await fetch(`/api/letters/${letterId}/recipients/${recipientId}`, { method: 'DELETE' });
    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
    } else {
      addToast('Recipient removed', 'success');
      await Promise.all([fetchRecipients(), fetchLetter()]);
    }
  }

  async function handleSaveEdit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch(`/api/letters/${letterId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editTitle,
        subject_line: editSubject || null,
        body_html: editBody,
        body_text: editBody.replace(/<[^>]*>/g, ''),
      }),
    });
    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
    } else {
      addToast('Letter updated', 'success');
      setEditing(false);
      await fetchLetter();
    }
    setSaving(false);
  }

  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    sent: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  const canEdit = letter && (letter.status === 'draft' || letter.status === 'scheduled');
  const canSend = letter && (letter.status === 'draft' || letter.status === 'scheduled' || letter.status === 'failed');

  if (loading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-4 w-32" />
          <div className="skeleton mt-6 h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  if (!letter) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-xl font-bold text-gray-900">Letter not found</h1>
          <p className="mt-2 text-sm text-gray-600">This letter may have been deleted.</p>
          <Link href="/letters" className="mt-4 inline-block text-sm font-medium text-blue-600 hover:text-blue-500">
            ← Back to letters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Toast container */}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
              toast.type === 'success' ? 'bg-green-600 text-white' :
              toast.type === 'error' ? 'bg-red-600 text-white' :
              'bg-gray-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white" aria-label="Dismiss">✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <Link href="/letters" className="text-sm text-gray-500 hover:text-gray-700">← Letters</Link>

        {/* Header */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">{letter.title}</h1>
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[letter.status] || 'bg-gray-100 text-gray-800'}`}>
                {letter.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500">
              {letter.recipient_count} recipient{letter.recipient_count !== 1 ? 's' : ''}
              {letter.sent_at && ` · Sent ${new Date(letter.sent_at).toLocaleDateString()}`}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {canEdit && (
              <button
                onClick={() => setEditing(!editing)}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {editing ? 'Cancel Edit' : 'Edit'}
              </button>
            )}
            {canSend && (
              <button
                onClick={handleSend}
                disabled={sending}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {sending ? 'Sending…' : 'Send Letter'}
              </button>
            )}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="rounded-lg border border-red-300 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 transition-colors"
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>

        {/* Edit form */}
        {editing && (
          <form onSubmit={handleSaveEdit} className="mt-6 space-y-4 rounded-xl border border-blue-200 bg-blue-50/50 p-6">
            <div>
              <label htmlFor="editTitle" className="block text-sm font-medium text-gray-700">Title</label>
              <input
                id="editTitle"
                type="text"
                required
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="editSubject" className="block text-sm font-medium text-gray-700">Subject Line</label>
              <input
                id="editSubject"
                type="text"
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label htmlFor="editBody" className="block text-sm font-medium text-gray-700">Body</label>
              <textarea
                id="editBody"
                rows={10}
                value={editBody}
                onChange={(e) => setEditBody(e.target.value)}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </form>
        )}

        {/* Letter preview */}
        {!editing && (
          <section className="mt-6">
            <h2 className="text-sm font-semibold text-gray-700">Preview</h2>
            {letter.subject_line && (
              <p className="mt-2 text-sm text-gray-500">Subject: <span className="font-medium text-gray-900">{letter.subject_line}</span></p>
            )}
            <div className="mt-3 rounded-xl border border-gray-200 bg-white p-6">
              {letter.body_html ? (
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: letter.body_html }}
                />
              ) : (
                <p className="text-sm text-gray-400 italic">No content yet. Click Edit to add your letter body.</p>
              )}
            </div>
          </section>
        )}

        {/* Recipients */}
        <section className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recipients</h2>
            {canEdit && (
              <button
                onClick={() => setShowAddRecipient(!showAddRecipient)}
                className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
              >
                {showAddRecipient ? 'Cancel' : '+ Add Recipient'}
              </button>
            )}
          </div>

          {showAddRecipient && (
            <form onSubmit={handleAddRecipient} className="mt-4 flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label htmlFor="recipientEmail" className="block text-xs font-medium text-gray-700">Email *</label>
                <input
                  id="recipientEmail"
                  type="email"
                  required
                  value={recipientEmail}
                  onChange={(e) => setRecipientEmail(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="investor@example.com"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="recipientName" className="block text-xs font-medium text-gray-700">Name</label>
                <input
                  id="recipientName"
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Jane Smith"
                />
              </div>
              <button
                type="submit"
                disabled={addingRecipient}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {addingRecipient ? 'Adding…' : 'Add'}
              </button>
            </form>
          )}

          {recipients.length === 0 ? (
            <div className="mt-4 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
              <p className="text-sm text-gray-500">No recipients yet. Add people to send this letter to.</p>
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Recipient</th>
                    <th scope="col" className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">Status</th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recipients.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">{r.name || r.email}</p>
                        {r.name && <p className="text-xs text-gray-500">{r.email}</p>}
                      </td>
                      <td className="hidden px-6 py-4 sm:table-cell">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          {r.opened_at && <span className="rounded-full bg-green-100 px-2 py-0.5 text-green-700">Opened</span>}
                          {r.clicked_at && <span className="rounded-full bg-blue-100 px-2 py-0.5 text-blue-700">Clicked</span>}
                          {!r.opened_at && !r.clicked_at && <span className="text-gray-400">—</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {canEdit && (
                          <button
                            onClick={() => handleRemoveRecipient(r.id)}
                            className="text-xs font-medium text-red-600 hover:text-red-500"
                            aria-label={`Remove ${r.name || r.email}`}
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
