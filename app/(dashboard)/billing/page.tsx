'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  plan: string;
  status: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
}

export default function BillingPage() {
  const { toasts, addToast, removeToast } = useToast();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [upgrading, setUpgrading] = useState(false);
  const [managingBilling, setManagingBilling] = useState(false);

  useEffect(() => {
    async function fetchSubscription() {
      const res = await fetch('/api/subscription');
      const json = await res.json();
      if (json.data) {
        setSubscription(json.data);
      }
      setLoading(false);
    }
    fetchSubscription();
  }, []);

  async function handleUpgrade() {
    setUpgrading(true);
    const priceId = process.env.NEXT_PUBLIC_STRIPE_PRO_PRICE_ID || 'price_pro';

    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
      setUpgrading(false);
    } else if (json.data?.checkoutUrl) {
      window.location.href = json.data.checkoutUrl;
    }
  }

  async function handleManageBilling() {
    setManagingBilling(true);
    const res = await fetch('/api/subscription/portal', {
      method: 'POST',
    });

    const json = await res.json();
    if (json.error) {
      addToast(json.error, 'error');
      setManagingBilling(false);
    } else if (json.data?.portalUrl) {
      window.location.href = json.data.portalUrl;
    }
  }

  const planLabels: Record<string, string> = {
    free: 'Free',
    starter: 'Starter',
    pro: 'Pro',
    enterprise: 'Enterprise',
  };

  const statusLabels: Record<string, { label: string; color: string }> = {
    active: { label: 'Active', color: 'bg-green-100 text-green-800' },
    trialing: { label: 'Trial', color: 'bg-blue-100 text-blue-800' },
    past_due: { label: 'Past Due', color: 'bg-red-100 text-red-800' },
    canceled: { label: 'Canceled', color: 'bg-gray-100 text-gray-800' },
    unpaid: { label: 'Unpaid', color: 'bg-red-100 text-red-800' },
  };

  if (loading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl space-y-4">
          <div className="skeleton h-8 w-32" />
          <div className="skeleton h-4 w-48" />
          <div className="skeleton mt-6 h-48 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* Toast container */}
      <div className="fixed right-4 top-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="alert"
            className={`rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${
              toast.type === 'success' ? 'bg-green-600 text-white' :
              toast.type === 'error' ? 'bg-red-600 text-white' :
              'bg-gray-800 text-white'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span>{toast.message}</span>
              <button onClick={() => removeToast(toast.id)} className="text-white/80 hover:text-white" aria-label="Dismiss">✕</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="mt-1 text-sm text-gray-600">Manage your subscription and billing.</p>

        {/* Current plan */}
        <article className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Current Plan</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {planLabels[subscription?.plan || 'free'] || subscription?.plan}
              </p>
            </div>
            {subscription && (
              <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusLabels[subscription.status]?.color || 'bg-gray-100 text-gray-800'}`}>
                {statusLabels[subscription.status]?.label || subscription.status}
              </span>
            )}
          </div>

          {subscription?.current_period_end && (
            <p className="mt-3 text-sm text-gray-500">
              {subscription.cancel_at_period_end
                ? `Cancels on ${new Date(subscription.current_period_end).toLocaleDateString()}`
                : `Renews on ${new Date(subscription.current_period_end).toLocaleDateString()}`
              }
            </p>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {subscription?.plan === 'free' && (
              <button
                onClick={handleUpgrade}
                disabled={upgrading}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
              >
                {upgrading ? 'Redirecting…' : 'Upgrade to Pro — $29/mo'}
              </button>
            )}

            {subscription?.stripe_customer_id && (
              <button
                onClick={handleManageBilling}
                disabled={managingBilling}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                {managingBilling ? 'Redirecting…' : 'Manage Billing'}
              </button>
            )}
          </div>
        </article>

        {/* Plan comparison */}
        <section className="mt-10">
          <h2 className="text-lg font-semibold text-gray-900">Plan Comparison</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <article className={`rounded-xl border p-5 ${subscription?.plan === 'free' ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 bg-white'}`}>
              <h3 className="font-semibold text-gray-900">Free</h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">$0<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✓ 3 letters/month</li>
                <li>✓ 25 recipients/letter</li>
                <li>✓ Basic open tracking</li>
              </ul>
            </article>
            <article className={`rounded-xl border p-5 ${subscription?.plan === 'pro' ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200 bg-white'}`}>
              <h3 className="font-semibold text-gray-900">Pro</h3>
              <p className="mt-1 text-2xl font-bold text-gray-900">$29<span className="text-sm font-normal text-gray-500">/mo</span></p>
              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✓ Unlimited letters</li>
                <li>✓ Unlimited recipients</li>
                <li>✓ Open & click tracking</li>
                <li>✓ Custom branding</li>
                <li>✓ Priority support</li>
              </ul>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
