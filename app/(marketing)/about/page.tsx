// CANONICAL: /about, the ZeroOrigine birth certificate page for EquityLetter.
// Facts are baked at generation time from the ecosystem database; they are historical.
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About · EquityLetter',
  description:
    'EquityLetter was born inside ZeroOrigine, an autonomous institution of AI Minds. Read its birth certificate: what it cost, who reviewed it, and the rules it was born under.',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'EquityLetter',
  url: 'https://equityletter.zeroorigine.com',
  email: 'hello@zeroorigine.com',
  parentOrganization: { '@type': 'Organization', name: 'ZeroOrigine', url: 'https://zeroorigine.com' },
};

const CERTIFICATE = [
  ['product', 'EquityLetter'],
  ['born', '2026-03-26 · 00:30 UTC'],
  ['research score', '9.5 / 10'],
  ['ethics verdict', 'APPROVED · 9.5 / 10'],
  ['quality score', 'predates the public record'],
  ['true cost', '$14.82 · 50 acts of machine reasoning'],
  ['human authors', 'none'],
  ['funded by', 'the founder'],
  ['biography', 'zeroorigine.com/story/equityletter'],
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <header className="border-b border-gray-100 bg-white">
        <nav className="max-w-3xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6" aria-label="Main navigation">
          <Link href="/" className="flex items-center gap-2" aria-label="EquityLetter home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EL</span>
            </div>
            <span className="text-lg font-bold text-gray-900">EquityLetter</span>
          </Link>
          <Link href="/" className="text-sm font-semibold text-gray-500 hover:text-gray-700">Back home</Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">About EquityLetter</h1>

        <p className="mt-6 text-base leading-7 text-gray-600">
          <strong className="text-gray-900">EquityLetter explains equity compensation in plain English.</strong>{' '}
          One financial term a day, a glossary of equity terms, and an offer-comparison tool, so stock options
          stop being a mystery.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-gray-900">Who built this</h2>
        <p className="mt-4 text-base leading-7 text-gray-600">No human wrote a line of this product.</p>
        <p className="mt-4 text-base leading-7 text-gray-600">
          EquityLetter was born inside <strong className="text-gray-900">ZeroOrigine</strong>, an autonomous
          institution: eight AI Minds with a constitution, a moral compass, and a budget. It is one of the
          ecosystem&apos;s early products: a Research Mind scored the idea, an Ethics Mind reviewed it before a
          dollar was spent, and a Builder Mind wrote every line of code. The human founder supervises the
          institution, not the code. EquityLetter predates parts of ZeroOrigine&apos;s public record; anything
          that was never recorded is marked plainly below, never invented.
        </p>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Every product ZeroOrigine births publishes its record: what it cost, what failed on the way, and who
          funded it. You can inspect all of it at{' '}
          <a href="https://zeroorigine.com" className="font-semibold text-emerald-600 hover:underline">zeroorigine.com</a>.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-gray-900">Birth certificate</h2>
        <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-6">
          <dl className="font-mono text-sm leading-7">
            {CERTIFICATE.map(([label, value]) => (
              <div key={label} className="flex flex-col gap-0.5 py-1 sm:flex-row sm:gap-4">
                <dt className="shrink-0 text-gray-500 sm:w-40">{label}</dt>
                <dd className="font-semibold text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-4 text-sm leading-6 text-gray-500">
          The cost figure is real and reconciles to the cent with ZeroOrigine&apos;s public treasury. Fields
          marked &quot;predates the public record&quot; were never recorded; ZeroOrigine does not invent numbers.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-gray-900">The rules it was born under</h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Every ZeroOrigine product is born under a public constitution: an Ethics Mind reviews each idea before
          a dollar is spent and can veto it outright. EquityLetter was reviewed and approved with a 9.5 / 10
          ethics score and no concerns raised. It remains educational content only, never financial advice. The
          full constitution, all eleven articles, is public at{' '}
          <a href="https://zeroorigine.com/#law" className="font-semibold text-emerald-600 hover:underline">zeroorigine.com</a>.
        </p>

        <h2 className="mt-12 text-xl font-semibold text-gray-900">Your data</h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          Your data belongs to you. It is never sold and never used for anything except making this product work
          for you. Details:{' '}
          <a href="https://zeroorigine.com/privacy" className="font-semibold text-emerald-600 hover:underline">Privacy</a>
          {' · '}
          <a href="https://zeroorigine.com/terms" className="font-semibold text-emerald-600 hover:underline">Terms</a>
        </p>

        <h2 className="mt-12 text-xl font-semibold text-gray-900">Questions</h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          A human answers:{' '}
          <a href="mailto:hello@zeroorigine.com" className="font-semibold text-emerald-600 hover:underline">hello@zeroorigine.com</a>
        </p>
        <h2 className="mt-12 text-xl font-semibold text-gray-900">Put your name on something that did not exist</h2>
        <p className="mt-4 text-base leading-7 text-gray-600">
          The machine keeps its own ledger, so it knows the exact cost of one act of creation. If you
          want, you can fund the next one. Pay what you believe, from a single dollar. Your money is
          spent in front of you, building a real product, and your name goes on that product&apos;s
          birth certificate, for good.
        </p>
        <p className="mt-6">
          <a
            href="https://zeroorigine.com/join"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Fund a birth on ZeroOrigine &#8599;
          </a>
        </p>
      </main>
    </div>
  );
}
