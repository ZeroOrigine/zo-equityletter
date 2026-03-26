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
    <div className="min-h-screen bg-white text-gray-900">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EquityLetter</span>
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">All Terms</Link>
            <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900">Compare</Link>
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900">Newsletter</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/terms" className="text-sm font-medium text-gray-500 hover:text-gray-700">
            &larr; Back to all terms
          </Link>
        </div>

        <div className="mb-8">
          <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700 mb-3">
            {term.category}
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {term.term}
          </h1>
        </div>

        <section className="mb-8">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Definition</h2>
          <p className="text-base leading-relaxed text-gray-700">{term.definition}</p>
        </section>

        <section className="mb-8 rounded-xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="mb-3 text-lg font-bold text-gray-900">Real-World Example</h2>
          <p className="text-base leading-relaxed text-gray-700">{term.example}</p>
        </section>

        <section className="mb-8 rounded-xl border border-red-100 bg-red-50 p-6">
          <h2 className="mb-3 text-lg font-bold text-red-900">Common Mistake</h2>
          <p className="text-base leading-relaxed text-red-800">{term.commonMistake}</p>
        </section>

        <section className="mb-8 rounded-xl border border-blue-100 bg-blue-50 p-6">
          <h2 className="mb-3 text-lg font-bold text-blue-900">Why It Matters</h2>
          <p className="text-base leading-relaxed text-blue-800">{term.whyItMatters}</p>
        </section>

        {relatedTermObjects.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Related Terms</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTermObjects.map((related) =>
                related ? (
                  <Link
                    key={related.slug}
                    href={`/terms/${related.slug}`}
                    className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50"
                  >
                    {related.term}
                  </Link>
                ) : null
              )}
            </div>
          </section>
        )}

        <section className="rounded-xl border border-gray-200 bg-gray-50 p-6 text-center">
          <p className="text-sm text-gray-600">Want to learn one equity concept per week?</p>
          <Link
            href="/archive"
            className="mt-2 inline-block rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Read the Newsletter
          </Link>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} EquityLetter by ZeroOrigine. Educational content, not financial advice.</p>
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
