'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { PLANS, type PlanConfig } from '@/lib/stripe/config';

interface SubscriptionData {
  id: string;
  plan: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

interface UsageData {
  lettersThisMonth: number;
  totalRecipients: number;
}

export default function BillingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [usage, setUsage] = useState<UsageData>({ lettersThisMonth: 0, totalRecipients: 0 });
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [portalLoading, setPortalLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push('/login');
      return;
    }

    // Fetch subscription
    const { data: sub } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (sub) setSubscription(sub);

    // Fetch usage — letters this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const { count: letterCount } = await supabase
      .from('letters')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', startOfMonth.toISOString());

    const { count: recipientCount } = await supabase
      .from('recipients')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    setUsage({
      lettersThisMonth: letterCount || 0,
      totalRecipients: recipientCount || 0,
    });

    setLoading(false);
  }, [router]);

  useEffect(() => {
    fetchData();

    if (searchParams.get('success') === 'true') {
      setSuccessMessage('Subscription activated! Welcome to your new plan.');
      // Refetch after a short delay to allow webhook processing
      setTimeout(fetchData, 2000);
    }
  }, [fetchData, searchParams]);

  async function handleCheckout(priceId: string) {
    setCheckoutLoading(priceId);
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to create checkout session');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setCheckoutLoading(null);
    }
  }

  async function handlePortal() {
    setPortalLoading(true);
    try {
      const response = await fetch('/api/billing/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to open billing portal');
      }
    } catch {
      alert('An error occurred. Please try again.');
    } finally {
      setPortalLoading(false);
    }
  }

  const currentPlan = PLANS.find((p) => p.slug === subscription?.plan) || PLANS[0];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Inline nav */}
        <nav className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <a href="/dashboard" className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              EquityLetter
            </a>
          </div>
        </nav>
        <div className="flex items-center justify-center py-32">
          <svg className="animate-spin h-8 w-8 text-blue-600" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Inline nav */}
      <nav className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a href="/dashboard" className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            EquityLetter
          </a>
          <div className="flex items-center gap-4">
            <a href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">Dashboard</a>
            <a href="/dashboard/billing" className="text-sm font-semibold text-blue-600">Billing</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Success message */}
        {successMessage && (
          <div className="mb-8 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {successMessage}
          </div>
        )}

        {/* Current Plan & Usage */}
        <section className="mb-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">Billing & Subscription</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Plan Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Current Plan</h2>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-slate-900">{currentPlan.name}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                  subscription?.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : subscription?.status === 'past_due'
                    ? 'bg-yellow-100 text-yellow-800'
                    : subscription?.status === 'canceled'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-slate-100 text-slate-800'
                }`}>
                  {subscription?.status || 'active'}
                </span>
              </div>

              {subscription?.cancel_at_period_end && (
                <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
                  Your subscription will end on{' '}
                  {subscription.current_period_end
                    ? new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })
                    : 'the end of the billing period'}.
                </p>
              )}

              {subscription?.current_period_end && !subscription.cancel_at_period_end && subscription.plan !== 'free' && (
                <p className="text-sm text-slate-600 mb-4">
                  Next billing date:{' '}
                  {new Date(subscription.current_period_end).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              )}

              {subscription?.stripe_customer_id && (
                <button
                  onClick={handlePortal}
                  disabled={portalLoading}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                >
                  {portalLoading ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                    </svg>
                  )}
                  Manage Billing
                </button>
              )}
            </div>

            {/* Usage Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Usage This Month</h2>

              {/* Letters usage */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700">Letters sent</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {usage.lettersThisMonth}
                    {currentPlan.limits.lettersPerMonth > 0
                      ? ` / ${currentPlan.limits.lettersPerMonth}`
                      : ' / ∞'}
                  </span>
                </div>
                {currentPlan.limits.lettersPerMonth > 0 && (
                  <div className="w-full bg-slate-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        usage.lettersThisMonth / currentPlan.limits.lettersPerMonth > 0.9
                          ? 'bg-red-500'
                          : usage.lettersThisMonth / currentPlan.limits.lettersPerMonth > 0.7
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                      style={{
                        width: `${Math.min(
                          (usage.lettersThisMonth / currentPlan.limits.lettersPerMonth) * 100,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Recipients per letter limit */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700">Max recipients per letter</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {currentPlan.limits.recipientsPerLetter > 0
                      ? currentPlan.limits.recipientsPerLetter
                      : '∞'}
                  </span>
                </div>
              </div>

              {/* Templates */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-slate-700">Templates available</span>
                  <span className="text-sm font-semibold text-slate-900">
                    {currentPlan.limits.templates > 0
                      ? currentPlan.limits.templates
                      : '∞'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Table */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              {subscription?.plan === 'free' ? 'Upgrade your plan' : 'Change your plan'}
            </h2>
            <p className="text-slate-600">Choose the plan that fits your equity communication needs</p>

            {/* Billing interval toggle */}
            <div className="mt-6 inline-flex items-center bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  billingInterval === 'monthly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  billingInterval === 'yearly'
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Yearly
                <span className="ml-1.5 text-xs font-semibold text-green-600">Save ~17%</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan: PlanConfig) => {
              const isCurrentPlan = subscription?.plan === plan.slug;
              const price = plan.prices
                ? billingInterval === 'monthly'
                  ? plan.prices.monthly
                  : plan.prices.yearly
                : null;
              const isPopular = plan.slug === 'pro';

              return (
                <div
                  key={plan.slug}
                  className={`relative bg-white rounded-xl border-2 p-6 flex flex-col ${
                    isPopular
                      ? 'border-blue-500 shadow-lg shadow-blue-100'
                      : isCurrentPlan
                      ? 'border-green-500'
                      : 'border-slate-200'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Most Popular
                      </span>
                    </div>
                  )}

                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        Current Plan
                      </span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{plan.name}</h3>
                  <p className="text-sm text-slate-600 mb-4">{plan.description}</p>

                  <div className="mb-6">
                    {price ? (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900">
                          ${price.amount}
                        </span>
                        <span className="text-slate-500">
                          /{billingInterval === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-slate-900">$0</span>
                        <span className="text-slate-500">/mo</span>
                      </div>
                    )}
                    {billingInterval === 'yearly' && price && (
                      <p className="text-xs text-slate-500 mt-1">
                        ${Math.round(price.amount / 12)}/mo billed annually
                      </p>
                    )}
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <svg
                          className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {isCurrentPlan ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
                    >
                      Current plan
                    </button>
                  ) : plan.slug === 'free' ? (
                    subscription?.stripe_customer_id ? (
                      <button
                        onClick={handlePortal}
                        disabled={portalLoading}
                        className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
                      >
                        Downgrade
                      </button>
                    ) : (
                      <button
                        disabled
                        className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg bg-slate-100 text-slate-500 cursor-not-allowed"
                      >
                        Free forever
                      </button>
                    )
                  ) : plan.slug === 'enterprise' && !plan.prices ? (
                    <a
                      href="mailto:sales@equityletter.com"
                      className="w-full py-2.5 px-4 text-sm font-semibold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors text-center block"
                    >
                      Contact Sales
                    </a>
                  ) : price ? (
                    subscription?.stripe_customer_id ? (
                      <button
                        onClick={handlePortal}
                        disabled={portalLoading}
                        className={`w-full py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                          isPopular
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Change plan
                      </button>
                    ) : (
                      <button
                        onClick={() => handleCheckout(price.priceId)}
                        disabled={checkoutLoading === price.priceId}
                        className={`w-full py-2.5 px-4 text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                          isPopular
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {checkoutLoading === price.priceId ? (
                          <span className="inline-flex items-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Processing…
                          </span>
                        ) : (
                          `Upgrade to ${plan.name}`
                        )}
                      </button>
                    )
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ / Security note */}
        <section className="mt-16 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Secure payments by Stripe</h3>
                <p className="text-sm text-slate-600">
                  All payments are processed securely by Stripe. We never store your card details.
                  You can cancel or change your plan at any time through the billing portal.
                  Your data is always yours — export it in standard formats anytime.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
