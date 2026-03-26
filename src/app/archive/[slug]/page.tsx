import Link from 'next/link';
import { notFound } from 'next/navigation';
import { newsletterIssues, getIssueBySlug } from '@/data/newsletter-issues';
import SubscribeForm from '@/components/SubscribeForm';

interface IssuePageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return newsletterIssues.map((issue) => ({ slug: issue.slug }));
}

export function generateMetadata({ params }: IssuePageProps) {
  const issue = getIssueBySlug(params.slug);
  if (!issue) return { title: 'Issue Not Found' };
  return {
    title: `${issue.subject} | EquityLetter`,
    description: issue.excerpt,
  };
}

// Simple markdown-to-HTML renderer for our own static newsletter content.
// This only processes content we author in src/data/newsletter-issues.ts.
// It is never used with user-supplied input.
function renderMarkdown(content: string): string {
  return content
    .replace(/^### (.+)$/gm, '<h3 class="mt-6 mb-3 text-lg font-semibold text-gray-900">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="mt-8 mb-3 text-xl font-bold text-gray-900">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="mt-8 mb-4 text-2xl font-bold text-gray-900">$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^---$/gm, '<hr class="my-8 border-gray-200" />')
    .replace(/^\|(.+)\|$/gm, (match) => {
      const cells = match.split('|').filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => /^[-:]+$/.test(c))) return '';
      const row = cells
        .map((c) => `<td class="py-2 px-3 border border-gray-200 text-sm">${c}</td>`)
        .join('');
      return `<tr>${row}</tr>`;
    })
    .replace(/^- (.+)$/gm, '<li class="ml-4 text-gray-700">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4 text-gray-700">$2</li>')
    .replace(/^(?!<[a-z]|<\/|^\s*$)(.+)$/gm, (match) => {
      return `<p class="mb-4 text-base leading-relaxed text-gray-700">${match}</p>`;
    })
    .replace(/^\s*$/gm, '');
}

export default function IssuePage({ params }: IssuePageProps) {
  const issue = getIssueBySlug(params.slug);
  if (!issue) notFound();

  // Content is from our own static data file, not user input
  const htmlContent = renderMarkdown(issue.content);

  return (
    <div className="min-h-screen" style={{ background: '#fff', color: '#111827' }}>
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
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900">
              Archive
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/archive"
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            &larr; Back to all issues
          </Link>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-500">
            {new Date(issue.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {issue.subject}
          </h1>
        </div>

        {/* Static content rendered from our own data file */}
        <article
          className="prose-custom"
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />

        <div className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900">
            Get this in your inbox every week
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            One equity concept per week. Free forever. No spam.
          </p>
          <SubscribeForm source="issue-page" className="mt-4 max-w-md mx-auto" />
        </div>
      </main>

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
