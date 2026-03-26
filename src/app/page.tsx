import Link from 'next/link';
import SubscribeForm from '@/components/SubscribeForm';
import { equityTerms } from '@/data/equity-terms';

export default function HomePage() {
  return (
    <div className="min-h-screen" style={{ background: '#fff', color: '#111827' }}>
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-gray-900">
            EquityLetter
          </Link>
          <div className="flex items-center gap-4 sm:gap-6">
            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
              Terms
            </Link>
            <Link href="/compare" className="text-sm text-gray-600 hover:text-gray-900">
              Compare
            </Link>
            <Link href="/archive" className="text-sm text-gray-600 hover:text-gray-900">
              Newsletter
            </Link>
            <Link href="/pricing" className="text-sm text-gray-600 hover:text-gray-900">
              Pricing
            </Link>
            <Link
              href="/auth/login"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Log In
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Understand your equity
            <br />
            before you sign
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Stock options, RSUs, vesting schedules, tax traps — explained in plain English.
            Free tools to help you make the most important financial decisions of your career.
          </p>
          <div className="mt-8 mx-auto max-w-md">
            <SubscribeForm source="hero" />
            <p className="mt-2 text-xs text-gray-500">
              One equity concept per week. Free forever. No spam.
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-gray-100 bg-gray-50 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Everything you need to understand equity compensation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                Three free tools, zero fluff.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {/* Feature 1: Term Explainer */}
              <Link
                href="/terms"
                className="group rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-400 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white text-lg font-bold">
                  A
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                  Equity Term Explainer
                </h3>
                <p className="mt-3 text-gray-600">
                  {equityTerms.length}+ equity terms explained in plain English. Real definitions, real examples,
                  and the common mistakes that cost people thousands.
                </p>
                <p className="mt-4 text-sm font-medium text-gray-900 group-hover:underline">
                  Browse all terms &rarr;
                </p>
              </Link>

              {/* Feature 2: Offer Comparison */}
              <Link
                href="/compare"
                className="group rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-400 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white text-lg font-bold">
                  B
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                  Offer Comparison Tool
                </h3>
                <p className="mt-3 text-gray-600">
                  Compare two job offers side by side. See total comp across growth scenarios,
                  risk assessments, tax implications, and questions to ask.
                </p>
                <p className="mt-4 text-sm font-medium text-gray-900 group-hover:underline">
                  Compare offers &rarr;
                </p>
              </Link>

              {/* Feature 3: Newsletter */}
              <Link
                href="/archive"
                className="group rounded-xl border border-gray-200 bg-white p-8 transition-all hover:border-gray-400 hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-900 text-white text-lg font-bold">
                  C
                </div>
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-black">
                  Weekly Newsletter
                </h3>
                <p className="mt-3 text-gray-600">
                  One equity concept per week, delivered to your inbox. The 83(b) election,
                  liquidation preferences, exercise windows — topics that save careers.
                </p>
                <p className="mt-4 text-sm font-medium text-gray-900 group-hover:underline">
                  Read the archive &rarr;
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* Who Is This For */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Who is this for?
            </h2>
            <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900">Startup employees</h3>
                <p className="mt-2 text-sm text-gray-600">
                  You got an offer with stock options. You are not sure what 10,000 shares means,
                  what a 1-year cliff does to you, or how AMT could cost you $50K.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900">People comparing offers</h3>
                <p className="mt-2 text-sm text-gray-600">
                  One offer has ISOs at a Series A startup. The other has RSUs at a public company.
                  Which is worth more? It depends — and our tool shows you the math.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900">Founders giving equity</h3>
                <p className="mt-2 text-sm text-gray-600">
                  You want to give your early team fair equity. Understanding strike prices,
                  409A valuations, and vesting structures helps you do it right.
                </p>
              </div>
              <div className="rounded-lg border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900">Anyone who wants to learn</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Equity compensation is the most valuable — and most misunderstood — part of
                  tech compensation. We are here to fix that.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-gray-100 bg-gray-50 py-20">
          <div className="mx-auto max-w-xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Start learning today
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              One email per week. One equity concept. Plain English. Free forever.
            </p>
            <div className="mt-8">
              <SubscribeForm source="footer-cta" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} EquityLetter by{' '}
              <a href="https://zeroorigine.com" className="hover:text-gray-700" target="_blank" rel="noopener noreferrer">
                ZeroOrigine
              </a>
              . Educational content, not financial advice.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-500 hover:text-gray-700">
                Terms
              </Link>
              <Link href="/compare" className="text-sm text-gray-500 hover:text-gray-700">
                Compare
              </Link>
              <Link href="/archive" className="text-sm text-gray-500 hover:text-gray-700">
                Newsletter
              </Link>
              <Link href="/pricing" className="text-sm text-gray-500 hover:text-gray-700">
                Pricing
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
