import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user.id)
    .single();

  // Fetch recent letters
  const { data: recentLetters } = await supabase
    .from('letters')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch letter count this month
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const { count: lettersThisMonth } = await supabase
    .from('letters')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .gte('created_at', startOfMonth.toISOString());

  const { count: totalRecipients } = await supabase
    .from('recipients')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id);

  const planName = subscription?.plan
    ? subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)
    : 'Free';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Inline nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/dashboard" className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            EquityLetter
          </a>
          <div className="flex items-center gap-6">
            <a href="/dashboard" className="text-sm font-semibold text-blue-600">Dashboard</a>
            <a href="/dashboard/billing" className="text-sm text-slate-600 hover:text-slate-900">Billing</a>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold text-sm">
                {profile?.full_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || '?'}
              </div>
              <form action="/api/auth/signout" method="POST">
                <button
                  type="submit"
                  className="text-sm text-slate-500 hover:text-slate-700"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Welcome back{profile?.full_name ? `, ${profile.full_name}` : ''}!
          </h1>
          <p className="text-slate-600 mt-1">
            {profile?.company_name ? `${profile.company_name} · ` : ''}
            {planName} plan
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500 mb-1">Letters this month</p>
            <p className="text-3xl font-bold text-slate-900">{lettersThisMonth || 0}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500 mb-1">Total recipients</p>
            <p className="text-3xl font-bold text-slate-900">{totalRecipients || 0}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500 mb-1">Current plan</p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-slate-900">{planName}</p>
              {subscription?.plan === 'free' && (
                <a
                  href="/dashboard/billing"
                  className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors"
                >
                  Upgrade
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Recent Letters */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Recent Letters</h2>
          </div>

          {recentLetters && recentLetters.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Title</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Recipients</th>
                    <th className="text-left text-xs font-semibold text-slate-500 uppercase tracking-wider px-6 py-3">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLetters.map((letter: { id: string; title: string; status: string; recipient_count: number; created_at: string }) => (
                    <tr key={letter.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{letter.title}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                          letter.status === 'sent'
                            ? 'bg-green-100 text-green-800'
                            : letter.status === 'draft'
                            ? 'bg-slate-100 text-slate-700'
                            : letter.status === 'scheduled'
                            ? 'bg-blue-100 text-blue-800'
                            : letter.status === 'failed'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {letter.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">{letter.recipient_count}</td>
                      <td className="px-6 py-4 text-sm text-slate-500">
                        {new Date(letter.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <svg className="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">No letters yet</h3>
              <p className="text-slate-600">Create your first equity letter to get started.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
