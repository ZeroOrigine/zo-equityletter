import Link from 'next/link';
import { notFound } from 'next/navigation';
import { equityTerms, getTermBySlug } from '@/data/equity-terms';

interface TermPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return equityTerms.map((term) => ({ slug: term.slug }));
}

export function generateMetadata({ params }: TermPageProps) {
  const term = getTermBySlug(params.slug);
  if (!term) return { title: 'Term Not Found' };
  return {
    title: `${term.term} — Equity Term Explainer | EquityLetter`,
    description: term.definition.substring(0, 160),
  };
}

export default function TermDetailPage({ params }: TermPageProps) {
  const term = getTermBySlug(params.slug);
  if (!term) notFound();

  const relatedTermObjects = term.relatedTerms
    .map((slug) => equityTerms.find((t) => t.slug === slug))
    .filter(Boolean);

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
              All Terms
            </Link>
            <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900">
              Compare Offers
            </Link>
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900">
              Newsletter
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/terms"
            className="text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            &larr; Back to all terms
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 mb-3">
            {term.category}
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {term.term}
          </h1>
        </div>

        {/* Definition */}
        <section className="mb-8">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Definition</h2>
          <p className="text-base leading-relaxed text-gray-700">
            {term.definition}
          </p>
        </section>

        {/* Example */}
        <section className="mb-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Real-World Example</h2>
          <p className="text-base leading-relaxed text-gray-700">
            {term.example}
          </p>
        </section>

        {/* Common Mistake */}
        <section className="mb-8 rounded-lg border border-red-100 bg-red-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-red-900">Common Mistake</h2>
          <p className="text-base leading-relaxed text-red-800">
            {term.commonMistake}
          </p>
        </section>

        {/* Why It Matters */}
        <section className="mb-8 rounded-lg border border-blue-100 bg-blue-50 p-6">
          <h2 className="mb-3 text-lg font-semibold text-blue-900">Why It Matters</h2>
          <p className="text-base leading-relaxed text-blue-800">
            {term.whyItMatters}
          </p>
        </section>

        {/* Related Terms */}
        {relatedTermObjects.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTermObjects.map((related) =>
                related ? (
                  <Link
                    key={related.slug}
                    href={`/terms/${related.slug}`}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-400 hover:bg-gray-50"
                  >
                    {related.term}
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">
            Want to learn one equity concept per week?
          </p>
          <Link
            href="/archive"
            className="mt-2 inline-block rounded-md bg-gray-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Read the Newsletter
          </Link>
        </section>
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
