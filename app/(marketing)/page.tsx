import type { Metadata } from 'next';
import Link from 'next/link';
import SubscribeForm from '@/components/SubscribeForm';
import { equityTerms } from '@/data/equity-terms';

export const metadata: Metadata = {
  title: 'EquityLetter — Equity Compensation Explained in Plain English',
  description: 'Understand your stock options, RSUs, and equity compensation. 50+ terms explained, offer comparison tool, and free weekly newsletter.',
  keywords: 'equity compensation, stock options, RSUs, startup equity, vesting schedule, 409A valuation, equity newsletter',
  openGraph: {
    title: 'EquityLetter — Equity Compensation Explained in Plain English',
    description: 'Understand your stock options, RSUs, and equity compensation. Free tools and weekly newsletter.',
    type: 'website',
    url: 'https://equityletter.zeroorigine.com',
    siteName: 'EquityLetter',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EquityLetter — Equity Compensation Explained in Plain English',
    description: 'Understand your stock options, RSUs, and equity compensation. Free tools and weekly newsletter.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://equityletter.zeroorigine.com' },
};

/* --- Inline SVG Icons --- */
function IconBook() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function IconScale() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.988 5.988 0 01-2.031.352 5.988 5.988 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L18.75 4.971zm-16.5.52c.99-.203 1.99-.377 3-.52m0 0l2.62 10.726c.122.499-.106 1.028-.589 1.202a5.989 5.989 0 01-2.031.352 5.989 5.989 0 01-2.031-.352c-.483-.174-.711-.703-.59-1.202L5.25 4.971z" />
    </svg>
  );
}

function IconEnvelope() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg className="w-5 h-5 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

/* --- Navigation --- */
function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center gap-2" aria-label="EquityLetter Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EL</span>
            </div>
            <span className="text-xl font-bold text-gray-900">EquityLetter</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/terms" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Equity Terms</Link>
            <Link href="/compare" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Compare Offers</Link>
            <Link href="/archive" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Newsletter</Link>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Log in</a>
            <a
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile menu */}
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer p-2 -mr-2 text-gray-600" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 p-4 flex flex-col gap-3 z-50">
              <Link href="/terms" className="text-sm font-medium text-gray-700 hover:text-emerald-600 py-2">Equity Terms</Link>
              <Link href="/compare" className="text-sm font-medium text-gray-700 hover:text-emerald-600 py-2">Compare Offers</Link>
              <Link href="/archive" className="text-sm font-medium text-gray-700 hover:text-emerald-600 py-2">Newsletter</Link>
              <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-emerald-600 py-2">Pricing</a>
              <hr className="border-gray-200" />
              <a href="/login" className="text-sm font-medium text-gray-700 py-2">Log in</a>
              <a href="/signup" className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors">
                Get Started Free
              </a>
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

/* --- Hero Section --- */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
            Understand your equity{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
              before you sign
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Stock options, RSUs, vesting schedules, tax traps — explained in plain English.
            Free tools and a weekly newsletter to help you make confident equity decisions.
          </p>
          <div className="mt-8 max-w-md mx-auto">
            <SubscribeForm source="hero" />
            <p className="mt-3 text-xs text-gray-500">
              One equity concept per week. Free forever. No spam.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --- Features Section (3 REAL features only) --- */
function FeaturesSection() {
  const features = [
    {
      icon: <IconBook />,
      title: 'Equity Term Explainer',
      description: `${equityTerms.length}+ equity terms explained in plain English. Real definitions, real examples, and the common mistakes that cost people thousands.`,
      href: '/terms',
      cta: 'Browse all terms',
    },
    {
      icon: <IconScale />,
      title: 'Offer Comparison Tool',
      description: 'Compare two job offers side by side. See total comp across growth scenarios (0x to 10x), risk assessments, tax implications, and questions to ask the employer.',
      href: '/compare',
      cta: 'Compare offers',
    },
    {
      icon: <IconEnvelope />,
      title: 'Weekly Newsletter',
      description: 'One equity concept per week, delivered to your inbox. The 83(b) election, liquidation preferences, exercise windows — topics that save careers.',
      href: '/archive',
      cta: 'Read the archive',
    },
  ];

  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">What We Built</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Three free tools. Zero fluff.
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to understand equity compensation, built for startup employees and founders.
          </p>
        </div>
        <div className="grid sm:grid-cols-3 gap-8">
          {features.map((f) => (
            <Link
              key={f.title}
              href={f.href}
              className="group relative bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200/60 hover:border-emerald-300 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
              <p className="mt-4 text-sm font-semibold text-emerald-600 group-hover:text-emerald-700">
                {f.cta} &rarr;
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- How It Works --- */
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Learn the terms',
      description: 'Browse 50+ equity terms with real definitions, examples, and common mistakes. Understand what ISOs, RSUs, AMT, and 83(b) elections actually mean.',
    },
    {
      num: '02',
      title: 'Compare your offers',
      description: 'Enter two job offers and see total compensation across growth scenarios (0x to 10x). Understand risk, tax implications, and what questions to ask.',
    },
    {
      num: '03',
      title: 'Stay informed weekly',
      description: 'Subscribe to the free newsletter. One equity concept per week, explained with real examples. Never get caught off guard by a tax bill or vesting trap.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            From confused to confident in 3 steps
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-emerald-300 to-emerald-100" aria-hidden="true" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white text-xl font-bold mb-6 shadow-lg shadow-emerald-500/25">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Who Is This For --- */
function AudienceSection() {
  const audiences = [
    {
      title: 'Startup employees',
      description: 'You got an offer with stock options. You are not sure what 10,000 shares means, what a 1-year cliff does, or how AMT could cost you $50K.',
    },
    {
      title: 'People comparing offers',
      description: 'One offer has ISOs at a Series A startup. The other has RSUs at a public company. Which is worth more? Our tool shows you the math.',
    },
    {
      title: 'Founders giving equity',
      description: 'You want to give your early team fair equity. Understanding strike prices, 409A valuations, and vesting structures helps you do it right.',
    },
    {
      title: 'Anyone who wants to learn',
      description: 'Equity compensation is the most valuable and most misunderstood part of tech compensation. We are here to fix that.',
    },
  ];

  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">Who is this for</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Built for people navigating equity decisions
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {audiences.map((a) => (
            <div key={a.title} className="rounded-2xl border border-gray-200 p-6 sm:p-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{a.title}</h3>
              <p className="text-gray-600 leading-relaxed">{a.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Pricing Section --- */
function PricingSection() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Everything you need to understand equity.',
      cta: 'Get Started Free',
      popular: false,
      features: [
        { text: `${equityTerms.length}+ equity terms explained`, included: true },
        { text: 'Offer comparison tool', included: true },
        { text: 'Weekly newsletter', included: true },
        { text: 'Newsletter archive access', included: true },
        { text: 'Personalized equity tracking', included: false },
        { text: 'Tax scenario modeler', included: false },
        { text: 'Priority support', included: false },
      ],
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      description: 'For startup employees serious about maximizing equity.',
      cta: 'Start Pro Trial',
      popular: true,
      features: [
        { text: 'Everything in Free', included: true },
        { text: 'Personalized equity tracking', included: true },
        { text: 'Tax scenario modeler (AMT, LTCG)', included: true },
        { text: 'Offer letter decoder', included: true },
        { text: 'Vesting milestone alerts', included: true },
        { text: 'Email support', included: true },
        { text: 'Early access to new tools', included: true },
      ],
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For founders and teams managing equity programs.',
      cta: 'Contact Sales',
      popular: false,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Team equity dashboard', included: true },
        { text: 'Cap table integration', included: true },
        { text: 'Board-ready equity reports', included: true },
        { text: 'SSO & admin controls', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'SLA & priority support', included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-gray-50 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Simple pricing, no equity required
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Start free with all three core tools. Upgrade when you need more.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                tier.popular
                  ? 'bg-gray-900 text-white ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02] md:scale-105'
                  : 'bg-white border border-gray-200'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-lg font-bold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${tier.popular ? 'text-white' : 'text-gray-900'}`}>{tier.price}</span>
                  <span className={`text-sm ${tier.popular ? 'text-gray-300' : 'text-gray-500'}`}>{tier.period}</span>
                </div>
                <p className={`mt-2 text-sm ${tier.popular ? 'text-gray-300' : 'text-gray-500'}`}>{tier.description}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8" role="list">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    {f.included ? <IconCheck /> : <IconX />}
                    <span className={`text-sm ${
                      f.included
                        ? tier.popular ? 'text-gray-100' : 'text-gray-700'
                        : tier.popular ? 'text-gray-500 line-through' : 'text-gray-400 line-through'
                    }`}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className={`block w-full text-center py-3 px-4 rounded-xl text-sm font-semibold transition-colors ${
                  tier.popular
                    ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/25'
                    : 'bg-gray-900 hover:bg-gray-800 text-white'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- FAQ Section --- */
function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group border-b border-gray-200 py-6">
      <summary className="flex items-center justify-between cursor-pointer list-none">
        <h3 className="text-base font-semibold text-gray-900 pr-4">{q}</h3>
        <span className="text-gray-400 group-open:rotate-180 transition-transform">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </span>
      </summary>
      <p className="mt-4 text-gray-600 leading-relaxed pr-8">{a}</p>
    </details>
  );
}

function FAQSection() {
  const faqs = [
    {
      q: 'Is this really free?',
      a: 'Yes. The equity term explainer, offer comparison tool, and weekly newsletter are all completely free. We plan to offer premium features (personalized tracking, tax modeling) as a paid Pro tier in the future.',
    },
    {
      q: 'Is this financial advice?',
      a: 'No. EquityLetter provides educational content about equity compensation. We are not financial advisors. Always consult a qualified tax professional or financial advisor for decisions specific to your situation.',
    },
    {
      q: 'Who built this?',
      a: 'EquityLetter is built by ZeroOrigine, an autonomous AI ecosystem. The content is thoroughly researched and covers real equity compensation concepts that affect millions of startup employees.',
    },
    {
      q: 'How is the offer comparison tool different from a spreadsheet?',
      a: 'Our tool automatically calculates total compensation across 5 growth scenarios (0x through 10x), provides risk assessments based on company stage, explains tax differences between ISOs, NSOs, and RSUs, and gives you specific questions to ask the employer.',
    },
    {
      q: 'How often is the newsletter sent?',
      a: 'Once per week. Each issue covers one equity concept in depth with real examples, common mistakes, and actionable advice. No spam, no fluff. Unsubscribe anytime.',
    },
    {
      q: 'Can I use the tools without signing up?',
      a: 'Yes. The offer comparison tool, equity terms, and newsletter archive are all accessible without creating an account. No sign-up wall.',
    },
  ];

  return (
    <section id="faq" className="bg-white py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Frequently asked questions
          </h2>
        </div>
        <div>
          {faqs.map((f) => (
            <FAQItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --- Final CTA --- */
function FinalCTASection() {
  return (
    <section className="bg-gradient-to-br from-emerald-600 to-teal-700 py-20 sm:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Start understanding your equity today
        </h2>
        <p className="mt-4 text-lg text-emerald-100 max-w-xl mx-auto">
          One email per week. One equity concept. Plain English. Free forever.
        </p>
        <div className="mt-8 max-w-md mx-auto">
          <SubscribeForm source="footer-cta" />
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <Link href="/terms" className="text-sm font-medium text-emerald-200 hover:text-white transition-colors">
            Browse {equityTerms.length}+ terms &rarr;
          </Link>
          <Link href="/compare" className="text-sm font-medium text-emerald-200 hover:text-white transition-colors">
            Compare offers &rarr;
          </Link>
          <Link href="/archive" className="text-sm font-medium text-emerald-200 hover:text-white transition-colors">
            Read newsletter &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

/* --- Footer --- */
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">EL</span>
              </div>
              <span className="text-lg font-bold text-white">EquityLetter</span>
            </div>
            <p className="text-sm leading-relaxed">
              Equity compensation explained in plain English. Built by{' '}
              <a href="https://zeroorigine.com" className="text-emerald-400 hover:text-emerald-300" target="_blank" rel="noopener noreferrer">
                ZeroOrigine
              </a>.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Tools</h4>
            <ul className="space-y-2">
              <li><Link href="/terms" className="text-sm hover:text-white transition-colors">Equity Terms</Link></li>
              <li><Link href="/compare" className="text-sm hover:text-white transition-colors">Compare Offers</Link></li>
              <li><Link href="/archive" className="text-sm hover:text-white transition-colors">Newsletter Archive</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Account</h4>
            <ul className="space-y-2">
              <li><a href="/login" className="text-sm hover:text-white transition-colors">Log in</a></li>
              <li><a href="/signup" className="text-sm hover:text-white transition-colors">Sign up</a></li>
              <li><a href="#pricing" className="text-sm hover:text-white transition-colors">Pricing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><span className="text-sm">Educational content only</span></li>
              <li><span className="text-sm">Not financial advice</span></li>
              <li><a href="mailto:support@zeroorigine.com" className="text-sm hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} EquityLetter by ZeroOrigine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* --- Main Page --- */
export default function MarketingPage() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <AudienceSection />
        <PricingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
