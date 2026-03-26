'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { equityTerms, CATEGORIES, searchTerms } from '@/data/equity-terms';

export default function TermsPage() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredTerms = useMemo(() => {
    let results = query ? searchTerms(query) : equityTerms;
    if (activeCategory) {
      results = results.filter((t) => t.category === activeCategory);
    }
    return results;
  }, [query, activeCategory]);

  return (
    <div className="min-h-screen" style={{ background: '#fff', color: '#111827' }}>
      {/* Nav */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-gray-900">
            EquityLetter
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900">
              Compare Offers
            </Link>
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900">
              Newsletter
            </Link>
            <Link href="/auth/login" className="text-sm text-gray-600 hover:text-gray-900">
              Log In
            </Link>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Equity Term Explainer
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {equityTerms.length} equity terms explained in plain English. No jargon, no fluff — just what you need to know.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search terms... (e.g. vesting, AMT, 83b)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 sm:max-w-md"
          />
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory(null)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === null
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All ({equityTerms.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = equityTerms.filter((t) => t.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        {(query || activeCategory) && (
          <p className="mb-4 text-sm text-gray-500">
            Showing {filteredTerms.length} of {equityTerms.length} terms
          </p>
        )}

        {/* Term Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTerms.map((term) => (
            <Link
              key={term.slug}
              href={`/terms/${term.slug}`}
              className="group rounded-lg border border-gray-200 p-5 transition-all hover:border-gray-400 hover:shadow-md"
            >
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-black">
                  {term.term}
                </h3>
                <span className="shrink-0 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">
                  {term.category}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
                {term.definition.substring(0, 150)}...
              </p>
              <span className="mt-3 inline-block text-sm font-medium text-gray-900 group-hover:underline">
                Read more
              </span>
            </Link>
          ))}
        </div>

        {filteredTerms.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-500">No terms match your search.</p>
            <button
              onClick={() => {
                setQuery('');
                setActiveCategory(null);
              }}
              className="mt-2 text-sm font-medium text-gray-900 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
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
