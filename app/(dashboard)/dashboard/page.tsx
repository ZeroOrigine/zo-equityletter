import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard — EquityLetter',
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Use user.id instead of session.user.id
  const session = { user };

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', session.user.id)
    .single();

  // Fetch letter stats
  const { count: totalLetters } = await supabase
    .from('letters')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', session.user.id);

  const { count: draftCount } = await supabase
    .from('letters')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .eq('status', 'draft');

  const { count: sentCount } = await supabase
    .from('letters')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', session.user.id)
    .eq('status', 'sent');

  const { data: recentLetters } = await supabase
    .from('letters')
    .select('id, title, status, recipient_count, created_at, sent_at')
    .eq('user_id', session.user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  const greeting = profile?.full_name ? `Welcome back, ${profile.full_name.split(' ')[0]}` : 'Welcome back';

  const stats = [
    { label: 'Total Letters', value: totalLetters ?? 0 },
    { label: 'Drafts', value: draftCount ?? 0 },
    { label: 'Sent', value: sentCount ?? 0 },
  ];

  const statusColors: Record<string, string> = {
    draft: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    sent: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    archived: 'bg-gray-100 text-gray-800',
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}</h1>
          <p className="mt-1 text-sm text-gray-600">Here&apos;s an overview of your equity letters.</p>
        </div>
        <Link
          href="/letters/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
        >
          + New Letter
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <article key={stat.label} className="rounded-xl border border-gray-200 bg-white p-6">
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
            <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
          </article>
        ))}
      </div>

      {/* Recent Letters */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Letters</h2>
          <Link href="/letters" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all →
          </Link>
        </div>

        {(!recentLetters || recentLetters.length === 0) ? (
          <div className="mt-6 rounded-xl border-2 border-dashed border-gray-300 p-12 text-center">
            <p className="text-sm text-gray-500">No letters yet. Create your first equity letter to get started.</p>
            <Link
              href="/letters/new"
              className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 transition-colors"
            >
              Create your first letter
            </Link>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
                  <th scope="col" className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 sm:table-cell">Status</th>
                  <th scope="col" className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">Recipients</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentLetters.map((letter) => (
                  <tr key={letter.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <Link href={`/letters/${letter.id}`} className="text-sm font-medium text-gray-900 hover:text-blue-600">
                        {letter.title}
                      </Link>
                    </td>
                    <td className="hidden px-6 py-4 sm:table-cell">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[letter.status] || 'bg-gray-100 text-gray-800'}`}>
                        {letter.status}
                      </span>
                    </td>
                    <td className="hidden px-6 py-4 text-sm text-gray-500 md:table-cell">
                      {letter.recipient_count}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(letter.sent_at || letter.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
