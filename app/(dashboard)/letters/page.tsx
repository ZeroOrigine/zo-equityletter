import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Letters — EquityLetter',
};

export default async function LettersPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const session = { user };

  const statusFilter = searchParams.status || null;
  const page = Math.max(1, parseInt(searchParams.page || '1', 10));
  const limit = 20;
  const offset = (page - 1) * limit;

  let countQuery = supabase
    .from('letters')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', session.user.id);

  if (statusFilter) {
    countQuery = countQuery.eq('status', statusFilter);
  }

  const { count } = await countQuery;
  const total = count ?? 0;
  const totalPages = Math.ceil(total / limit);

  let dataQuery = supabase
    .from('letters')
    .select('id, title, slug, status, recipient_count, created_at, sent_at, scheduled_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (statusFilter) {
    dataQuery = dataQuery.eq('status', statusFilter);
  }

  const { data: letters } = await dataQuery;

  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    sent: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  const filterTabs = [
    { label: 'All', value: null },
    { label: 'Drafts', value: 'draft' },
    { label: 'Scheduled', value: 'scheduled' },
    { label: 'Sent', value: 'sent' },
    { label: 'Archived', value: 'archived' },
  ];

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Letters</h1>
          <p className="mt-1 text-sm text-gray-600">{total} letter{total !== 1 ? 's' : ''} total</p>
        </div>
        <Link
          href="/letters/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + New Letter
        </Link>
      </div>

      {/* Filter tabs */}
      <nav className="mt-6 flex gap-1 overflow-x-auto" aria-label="Filter letters by status">
        {filterTabs.map((tab) => {
          const isActive = statusFilter === tab.value;
          const href = tab.value ? `/letters?status=${tab.value}` : '/letters';
          return (
            <Link
              key={tab.label}
              href={href}
              className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>

      {/* Letters list */}
      {(!letters || letters.length === 0) ? (
        <div className="mt-8 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
          <p className="text-sm text-gray-500">
            {statusFilter
              ? `No ${statusFilter} letters found.`
              : 'No letters yet. Create your first one!'}
          </p>
          <Link
            href="/letters/new"
            className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Create a letter
          </Link>
        </div>
      ) : (
        <>
          <div className="mt-4 space-y-3">
            {letters.map((letter) => (
              <Link
                key={letter.id}
                href={`/letters/${letter.id}`}
                className="block rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-900">{letter.title}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span>{letter.recipient_count} recipient{letter.recipient_count !== 1 ? 's' : ''}</span>
                      <span>·</span>
                      <span>{new Date(letter.sent_at || letter.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`inline-flex flex-shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[letter.status] || 'bg-gray-100 text-gray-800'}`}>
                    {letter.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="mt-8 flex items-center justify-center gap-2" aria-label="Pagination">
              {page > 1 && (
                <Link
                  href={`/letters?page=${page - 1}${statusFilter ? `&status=${statusFilter}` : ''}`}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </Link>
              )}
              <span className="text-sm text-gray-500">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link
                  href={`/letters?page=${page + 1}${statusFilter ? `&status=${statusFilter}` : ''}`}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Next
                </Link>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
