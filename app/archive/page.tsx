import Link from 'next/link';
import { newsletterIssues } from '@/data/newsletter-issues';
import SubscribeForm from '@/components/SubscribeForm';

export const metadata = {
  title: 'Newsletter Archive | EquityLetter',
  description: 'Free weekly newsletter explaining one equity concept at a time. Plain English, real examples, no fluff.',
};

export default function ArchivePage() {
  const sortedIssues = [...newsletterIssues].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen" style={{ background: '#fff', color: '#111827' }}>
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-gray-900">
            EquityLetter
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Equity Terms
            </Link>
            <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900">
              Compare Offers
            </Link>
            <Link href="/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log In
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Newsletter Archive
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            One equity concept per week, explained in plain English. Free forever.
          </p>
        </div>

        {/* Subscribe */}
        <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-lg font-semibold text-gray-900">Get this in your inbox</h2>
          <p className="mt-1 text-sm text-gray-600">
            Join the newsletter. One email per week. No spam. Unsubscribe anytime.
          </p>
          <SubscribeForm source="archive-page" className="mt-4" />
        </div>

        {/* Issues List */}
        <div className="space-y-6">
          {sortedIssues.map((issue) => (
            <Link
              key={issue.slug}
              href={`/archive/${issue.slug}`}
              className="group block rounded-lg border border-gray-200 p-6 transition-all hover:border-gray-400 hover:shadow-md"
            >
              <p className="text-sm text-gray-500">
                {new Date(issue.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-gray-900 group-hover:text-black">
                {issue.subject}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                {issue.excerpt}
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-gray-900 group-hover:underline">
                Read full issue
              </span>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} EquityLetter by ZeroOrigine. Educational content, not financial advice.
          </p>
          <div className="flex gap-6">
            <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">Terms</Link>
            <Link href="/compare" className="text-sm text-gray-500 hover:text-gray-700">Compare</Link>
            <Link href="/archive" className="text-sm text-gray-500 hover:text-gray-700">Archive</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
