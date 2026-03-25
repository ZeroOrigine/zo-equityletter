import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EquityLetter — Authentication',
  description: 'Sign in or create your EquityLetter account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col">
      {/* Minimal header */}
      <header className="w-full px-6 py-4">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-xl font-bold text-slate-900 hover:text-blue-600 transition-colors"
        >
          <svg
            className="w-8 h-8 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
            />
          </svg>
          EquityLetter
        </a>
      </header>

      {/* Centered card */}
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="w-full px-6 py-4 text-center text-sm text-slate-500">
        &copy; {new Date().getFullYear()} EquityLetter. All rights reserved.
      </footer>
    </div>
  );
}
