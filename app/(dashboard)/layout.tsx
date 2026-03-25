import { getSupabaseServerClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = getSupabaseServerClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', session.user.id)
    .single();

  const displayName = profile?.full_name || profile?.email || session.user.email || 'User';
  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/letters', label: 'Letters', icon: '✉️' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
    { href: '/billing', label: 'Billing', icon: '💳' },
  ];

  return (
    <div className="flex min-h-full">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 border-r border-gray-200 bg-white lg:block">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b border-gray-200 px-6">
            <Link href="/dashboard" className="text-xl font-bold text-blue-600">
              EquityLetter
            </Link>
          </div>
          <nav className="flex-1 space-y-1 px-3 py-4" aria-label="Main navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{displayName}</p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST" className="mt-3">
              <button
                type="submit"
                className="w-full rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 lg:hidden">
          <Link href="/dashboard" className="text-lg font-bold text-blue-600">
            EquityLetter
          </Link>
          <nav className="flex items-center gap-2" aria-label="Mobile navigation">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg p-2 text-sm text-gray-600 hover:bg-gray-100"
                aria-label={item.label}
              >
                <span aria-hidden="true">{item.icon}</span>
              </Link>
            ))}
          </nav>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
