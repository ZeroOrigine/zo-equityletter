import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'EquityLetter — Equity Compensation Insights Delivered Weekly',
  description: 'Understand your stock options, RSUs, and equity compensation with clear, actionable insights. Free weekly newsletter plus premium tools for startup employees and founders.',
  keywords: 'equity compensation, stock options, RSUs, startup equity, vesting schedule, 409A valuation, equity newsletter',
  openGraph: {
    title: 'EquityLetter — Equity Compensation Insights Delivered Weekly',
    description: 'Understand your stock options, RSUs, and equity compensation with clear, actionable insights.',
    type: 'website',
    url: 'https://equityletter.com',
    siteName: 'EquityLetter',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'EquityLetter' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EquityLetter — Equity Compensation Insights Delivered Weekly',
    description: 'Understand your stock options, RSUs, and equity compensation with clear, actionable insights.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://equityletter.com' },
};

/* ─── Inline SVG Icons ─── */
function IconChart() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function IconCalculator() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm0 2.25h.008v.008H8.25v-.008zm2.498-6.75h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm0 2.25h.007v.008h-.007v-.008zm2.504-6.75h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zm2.498 0h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008v-.008zM8.25 6h7.5v2.25h-7.5V6zM12 2.25c-1.892 0-3.758.11-5.593.322C5.307 2.7 4.5 3.65 4.5 4.757V19.5a2.25 2.25 0 002.25 2.25h10.5a2.25 2.25 0 002.25-2.25V4.757c0-1.108-.806-2.057-1.907-2.185A48.507 48.507 0 0012 2.25z" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconBell() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
    </svg>
  );
}

function IconDocument() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function IconUsers() {
  return (
    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function IconX() {
  return (
    <svg className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function IconChevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`w-5 h-5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}

/* ─── Navigation (inline) ─── */
function Navigation() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-lg border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2" aria-label="EquityLetter Home">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">EL</span>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">EquityLetter</span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Pricing</a>
            <a href="#faq" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">FAQ</a>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a href="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">Log in</a>
            <a
              href="/signup"
              className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-sm"
            >
              Get Started Free
            </a>
          </div>

          {/* Mobile menu button — uses details/summary for zero-JS toggle */}
          <details className="md:hidden relative">
            <summary className="list-none cursor-pointer p-2 -mr-2 text-gray-600 dark:text-gray-300" aria-label="Open menu">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </summary>
            <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3 z-50">
              <a href="#features" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 py-2">Features</a>
              <a href="#pricing" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 py-2">Pricing</a>
              <a href="#faq" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-emerald-600 py-2">FAQ</a>
              <hr className="border-gray-200 dark:border-gray-700" />
              <a href="/login" className="text-sm font-medium text-gray-700 dark:text-gray-200 py-2">Log in</a>
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

/* ─── Hero Section ─── */
function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:from-emerald-950/20 dark:via-gray-950 dark:to-teal-950/10" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Now in open beta — join 1,200+ readers
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1]">
              Your Equity,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                Finally Explained
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Stop guessing what your stock options are worth. EquityLetter delivers clear, personalized equity insights so you can make confident career and financial decisions.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
              >
                Start Free — No Card Required
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center px-6 py-3.5 text-base font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
              >
                See How It Works
              </a>
            </div>
            {/* Social proof */}
            <div className="mt-10 flex items-center gap-4">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-gray-950"
                    style={{
                      background: [
                        'linear-gradient(135deg, #6EE7B7, #34D399)',
                        'linear-gradient(135deg, #93C5FD, #3B82F6)',
                        'linear-gradient(135deg, #FCA5A5, #EF4444)',
                        'linear-gradient(135deg, #FDE68A, #F59E0B)',
                        'linear-gradient(135deg, #C4B5FD, #8B5CF6)',
                      ][i],
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Trusted by <span className="font-semibold text-gray-700 dark:text-gray-200">1,200+</span> startup employees & founders
              </p>
            </div>
          </div>

          {/* Right: Hero Visual */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-emerald-100 via-teal-50 to-cyan-100 dark:from-emerald-900/30 dark:via-teal-900/20 dark:to-cyan-900/30 border border-gray-200/60 dark:border-gray-800/60 shadow-2xl overflow-hidden flex items-center justify-center">
              {/* Simulated dashboard preview */}
              <div className="w-[90%] h-[85%] bg-white dark:bg-gray-900 rounded-xl shadow-lg p-4 sm:p-6 flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <div className="ml-auto h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
                <div className="flex-1 grid grid-cols-3 gap-3">
                  <div className="col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-lg p-3">
                    <div className="h-2 w-16 bg-emerald-200 dark:bg-emerald-700 rounded mb-2" />
                    <div className="h-6 w-24 bg-emerald-300 dark:bg-emerald-600 rounded mb-3" />
                    <div className="flex items-end gap-1 h-16">
                      {[40, 55, 45, 70, 60, 80, 75, 90, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-emerald-400/60 dark:bg-emerald-500/40 rounded-t" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="h-2 w-10 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                      <div className="h-4 w-14 bg-gray-300 dark:bg-gray-600 rounded" />
                    </div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="h-2 w-10 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                      <div className="h-4 w-14 bg-teal-300 dark:bg-teal-600 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">Your equity value</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">+127% this year</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Logo Bar ─── */
function LogoBar() {
  const companies = ['Stripe', 'Notion', 'Vercel', 'Linear', 'Figma'];
  return (
    <section className="bg-gray-50/50 dark:bg-gray-900/50 border-y border-gray-200/50 dark:border-gray-800/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-wider">
          Used by employees at
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16">
          {companies.map((name) => (
            <div
              key={name}
              className="text-xl sm:text-2xl font-bold text-gray-300 dark:text-gray-700 select-none"
              aria-label={name}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features Section ─── */
function FeaturesSection() {
  const features = [
    {
      icon: <IconChart />,
      title: 'Equity Valuation Tracker',
      description: 'See your stock options and RSUs valued in real-time using the latest 409A data, funding rounds, and market comparables.',
    },
    {
      icon: <IconCalculator />,
      title: 'Tax Scenario Modeler',
      description: 'Model AMT, capital gains, and exercise strategies before you make costly mistakes. Know your tax bill before it arrives.',
    },
    {
      icon: <IconBell />,
      title: 'Vesting Cliff Alerts',
      description: 'Never miss a vesting milestone. Get notified before cliffs, acceleration events, and exercise windows close.',
    },
    {
      icon: <IconDocument />,
      title: 'Weekly Equity Digest',
      description: 'A curated newsletter breaking down equity news, IPO analysis, and compensation trends — in plain English.',
    },
    {
      icon: <IconShield />,
      title: 'Offer Letter Decoder',
      description: 'Paste your offer letter and get an instant breakdown of what your equity package is actually worth — and what to negotiate.',
    },
    {
      icon: <IconUsers />,
      title: 'Peer Compensation Data',
      description: 'Anonymous benchmarking against others at your stage, role, and location. Know if your equity is competitive.',
    },
  ];

  return (
    <section id="features" className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Everything you need to understand your equity
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            From offer letter to IPO, EquityLetter gives you the tools and knowledge to maximize your equity compensation.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-6 sm:p-8 border border-gray-200/60 dark:border-gray-800/60 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'Enter your equity details',
      description: 'Paste your offer letter or manually enter your grant type, strike price, vesting schedule, and company stage. Takes under 60 seconds.',
    },
    {
      num: '02',
      title: 'Get personalized insights',
      description: 'Our engine calculates your equity value, tax implications, and optimal exercise strategy based on real market data and your personal situation.',
    },
    {
      num: '03',
      title: 'Stay informed weekly',
      description: 'Receive a weekly digest with your portfolio updates, market analysis, and actionable advice tailored to your equity holdings.',
    },
  ];

  return (
    <section id="how-it-works" className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            From confused to confident in 3 steps
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((s, i) => (
            <div key={s.num} className="relative">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-px bg-gradient-to-r from-emerald-300 to-emerald-100 dark:from-emerald-700 dark:to-emerald-900" aria-hidden="true" />
              )}
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-600 text-white text-xl font-bold mb-6 shadow-lg shadow-emerald-500/25">
                  {s.num}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{s.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs mx-auto">{s.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing Section ─── */
function PricingSection() {
  const tiers = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for understanding your first equity grant.',
      cta: 'Get Started Free',
      popular: false,
      features: [
        { text: 'Weekly equity digest newsletter', included: true },
        { text: '1 equity grant tracker', included: true },
        { text: 'Basic valuation estimates', included: true },
        { text: 'Offer letter decoder (3/month)', included: true },
        { text: 'Community access', included: true },
        { text: 'Tax scenario modeler', included: false },
        { text: 'Peer compensation data', included: false },
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
        { text: 'Unlimited equity grant tracking', included: true },
        { text: 'Advanced valuation with 409A data', included: true },
        { text: 'Tax scenario modeler (AMT, LTCG)', included: true },
        { text: 'Unlimited offer letter decoding', included: true },
        { text: 'Vesting cliff alerts & reminders', included: true },
        { text: 'Peer compensation benchmarks', included: true },
        { text: 'Email support', included: true },
      ],
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For founders and teams managing cap tables.',
      cta: 'Contact Sales',
      popular: false,
      features: [
        { text: 'Everything in Pro', included: true },
        { text: 'Team equity dashboard', included: true },
        { text: 'Cap table integration', included: true },
        { text: 'Custom valuation models', included: true },
        { text: 'Board-ready equity reports', included: true },
        { text: 'SSO & admin controls', included: true },
        { text: 'Dedicated account manager', included: true },
        { text: 'SLA & priority support', included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">Pricing</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Simple pricing, no equity required
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Start free and upgrade when you need more. Cancel anytime.
          </p>
          <div className="mt-6 inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <span className="px-4 py-2 text-sm font-semibold text-white bg-emerald-600 rounded-full">Monthly</span>
            <span className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-700 dark:hover:text-gray-200">
              Annual <span className="text-emerald-600 dark:text-emerald-400 text-xs font-bold">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-2xl p-6 sm:p-8 flex flex-col ${
                tier.popular
                  ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 ring-2 ring-emerald-500 shadow-2xl shadow-emerald-500/10 scale-[1.02] md:scale-105'
                  : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className={`text-lg font-bold ${tier.popular ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-white'}`}>{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-4xl font-extrabold ${tier.popular ? 'text-white dark:text-gray-900' : 'text-gray-900 dark:text-white'}`}>{tier.price}</span>
                  <span className={`text-sm ${tier.popular ? 'text-gray-300 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>{tier.period}</span>
                </div>
                <p className={`mt-2 text-sm ${tier.popular ? 'text-gray-300 dark:text-gray-500' : 'text-gray-500 dark:text-gray-400'}`}>{tier.description}</p>
              </div>

              <ul className="flex-1 space-y-3 mb-8" role="list">
                {tier.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-3">
                    {f.included ? <IconCheck /> : <IconX />}
                    <span className={`text-sm ${
                      f.included
                        ? tier.popular ? 'text-gray-100 dark:text-gray-700' : 'text-gray-700 dark:text-gray-300'
                        : tier.popular ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-400 dark:text-gray-600 line-through'
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
                    : 'bg-gray-900 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-100 text-white dark:text-gray-900'
                }`}
              >
                {tier.cta}
              </a>
              {tier.name !== 'Enterprise' && (
                <p className={`mt-3 text-center text-xs ${tier.popular ? 'text-gray-400 dark:text-gray-500' : 'text-gray-400 dark:text-gray-500'}`}>
                  No credit card required
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
function TestimonialsSection() {
  const testimonials = [
    {
      quote: "I had no idea my stock options were about to expire. EquityLetter's cliff alerts saved me from losing $47,000 in equity. This should be mandatory for every startup employee.",
      name: 'Sarah Chen',
      role: 'Senior Engineer',
      company: 'Series B Startup',
    },
    {
      quote: "The tax scenario modeler showed me I'd owe $23K in AMT if I exercised in December vs $4K in January. That single insight paid for 10 years of the Pro plan.",
      name: 'Marcus Johnson',
      role: 'Product Manager',
      company: 'Pre-IPO Company',
    },
    {
      quote: "I used the offer letter decoder when negotiating my new role. It showed my equity was 40% below market. I negotiated an extra 15,000 shares. Took 30 seconds.",
      name: 'Priya Patel',
      role: 'Engineering Lead',
      company: 'Growth-Stage Startup',
    },
  ];

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Real people, real equity wins
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white dark:bg-gray-950 rounded-2xl p-6 sm:p-8 border border-gray-200/60 dark:border-gray-800/60 shadow-sm flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[0, 1, 2, 3, 4].map((i) => (
                  <IconStar key={i} />
                ))}
              </div>
              <blockquote className="flex-1 text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex-shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${['#6EE7B7,#059669', '#93C5FD,#2563EB', '#FCA5A5,#DC2626'][testimonials.indexOf(t)]})`,
                  }}
                  aria-hidden="true"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role} at {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ Section ─── */
function FAQSection() {
  const faqs = [
    {
      q: 'Is the free plan actually useful?',
      a: 'Absolutely. The free plan includes our weekly equity digest newsletter, one equity grant tracker, basic valuation estimates, and 3 offer letter decodings per month. Many users stay on free for months before upgrading.',
    },
    {
      q: 'How do you calculate equity valuations?',
      a: 'We use a combination of latest 409A valuations, public funding round data, revenue multiples from comparable companies, and secondary market pricing where available. Pro users get access to our most detailed models.',
    },
    {
      q: 'Is my financial data secure?',
      a: 'Yes. All data is encrypted at rest and in transit. We never share your personal equity data with anyone. We use Supabase with Row Level Security, and you can export or delete your data at any time.',
    },
    {
      q: 'Can I integrate with my company\'s cap table software?',
      a: 'Enterprise plans include integrations with Carta, Pulley, and AngelList. Pro users can manually import data via CSV. We\'re adding more integrations quarterly.',
    },
    {
      q: 'What if I have equity at multiple companies?',
      a: 'Free users can track 1 grant. Pro users get unlimited grant tracking across multiple companies with a unified portfolio view. Perfect if you\'ve worked at several startups.',
    },
    {
      q: 'Can I cancel anytime?',
      a: 'Yes, cancel with one click from your dashboard. No contracts, no cancellation fees. Your data remains accessible on the free plan after downgrading.',
    },
  ];

  return (
    <section id="faq" className="bg-white dark:bg-gray-950 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              className="group bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200/60 dark:border-gray-800/60 overflow-hidden"
            >
              <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-left list-none">
                <span className="text-base font-semibold text-gray-900 dark:text-white pr-4">{faq.q}</span>
                <svg
                  className="w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Final CTA ─── */
function FinalCTASection() {
  return (
    <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
          Stop leaving money on the table
        </h2>
        <p className="mt-6 text-lg text-emerald-100 max-w-xl mx-auto leading-relaxed">
          Your equity is part of your compensation. It&apos;s time you understood exactly what it&apos;s worth and how to make the most of it.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-emerald-700 bg-white hover:bg-emerald-50 rounded-xl transition-colors shadow-xl shadow-emerald-900/30"
          >
            Get Started Free — No Card Required
          </a>
        </div>
        <p className="mt-6 text-sm text-emerald-200">
          Free plan available forever · Upgrade anytime · Cancel in one click
        </p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">EL</span>
              </div>
              <span className="text-lg font-bold text-white">EquityLetter</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Equity compensation insights for startup employees and founders. Understand what you own.
            </p>
          </div>
          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="/changelog" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>
          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="/blog" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/careers" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="/security" className="hover:text-white transition-colors">Security</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">&copy; {new Date().getFullYear()} EquityLetter. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="https://twitter.com/equityletter" aria-label="Twitter" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
            </a>
            <a href="https://linkedin.com/company/equityletter" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── Structured Data (JSON-LD) ─── */
function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'EquityLetter',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description: 'Equity compensation insights for startup employees and founders. Understand your stock options, RSUs, and equity compensation.',
    url: 'https://equityletter.com',
    offers: [
      { '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free' },
      { '@type': 'Offer', price: '29', priceCurrency: 'USD', name: 'Pro', billingIncrement: 'P1M' },
      { '@type': 'Offer', price: '99', priceCurrency: 'USD', name: 'Enterprise', billingIncrement: 'P1M' },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '127',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

/* ─── Main Page ─── */
export default function MarketingPage() {
  return (
    <>
      <StructuredData />
      <Navigation />
      <main>
        <HeroSection />
        <LogoBar />
        <FeaturesSection />
        <HowItWorksSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
