'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { slugify } from '@/lib/slugify';
import { useToast } from '@/hooks/use-toast';

export default function NewLetterPage() {
  const router = useRouter();
  const { toasts, addToast, removeToast } = useToast();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [subjectLine, setSubjectLine] = useState('');
  const [bodyHtml, setBodyHtml] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slugManuallyEdited) {
      setSlug(slugify(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugManuallyEdited(true);
    setSlug(slugify(value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const res = await fetch('/api/letters', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        slug: slug || slugify(title),
        subject_line: subjectLine || null,
        body_html: bodyHtml,
        body_text: bodyHtml.replace(/<[^>]*>/g, ''),
        status: 'draft',
      }),
    });

    const json = await res.json();

    if (!res.ok || json.error) {
      if (json.details) {
        setErrors(json.details);
      }
      addToast(json.error || 'Failed to create letter', 'error');
      setLoading(false);
      return;
    }

    addToast('Letter created!', 'success');
    router.push(`/letters/${json.data.id}`);
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Toast container */}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition-all ${
              toast.type === 'success' ? 'bg-green-600 text-white' :
              toast.type === 'error' ? 'bg-red-600 text-white' :
              'bg-gray-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white" aria-label="Dismiss">
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-3">
          <Link href="/letters" className="text-sm text-gray-500 hover:text-gray-700">← Letters</Link>
        </div>

        <h1 className="mt-4 text-2xl font-bold text-gray-900">New Letter</h1>
        <p className="mt-1 text-sm text-gray-600">Compose your equity letter. You can add recipients after saving.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Q4 2024 Investor Update"
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title[0]}</p>}
          </div>

          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">URL Slug *</label>
            <input
              id="slug"
              type="text"
              required
              value={slug}
              onChange={(e) => handleSlugChange(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="q4-2024-investor-update"
            />
            {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug[0]}</p>}
            <p className="mt-1 text-xs text-gray-500">Lowercase letters, numbers, and hyphens only.</p>
          </div>

          <div>
            <label htmlFor="subjectLine" className="block text-sm font-medium text-gray-700">Subject Line</label>
            <input
              id="subjectLine"
              type="text"
              value={subjectLine}
              onChange={(e) => setSubjectLine(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Your Q4 2024 Equity Update"
            />
            {errors.subject_line && <p className="mt-1 text-xs text-red-600">{errors.subject_line[0]}</p>}
          </div>

          <div>
            <label htmlFor="bodyHtml" className="block text-sm font-medium text-gray-700">Letter Body</label>
            <textarea
              id="bodyHtml"
              rows={12}
              value={bodyHtml}
              onChange={(e) => setBodyHtml(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 font-mono"
              placeholder="<p>Dear Investors,</p>\n<p>We're excited to share our Q4 2024 update...</p>"
            />
            {errors.body_html && <p className="mt-1 text-xs text-red-600">{errors.body_html[0]}</p>}
            <p className="mt-1 text-xs text-gray-500">HTML is supported. A rich text editor is coming soon.</p>
          </div>

          <div className="flex items-center gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Creating…' : 'Create Letter'}
            </button>
            <Link
              href="/letters"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
