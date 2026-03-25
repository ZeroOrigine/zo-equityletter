import { stripe } from './client';
import { createClient } from '@supabase/supabase-js';
import type Stripe from 'stripe';
import { getPlanByPriceId } from './config';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Missing Supabase admin env vars');
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  const userId = session.metadata?.userId;
  if (!userId) {
    console.error('No userId in checkout session metadata');
    return;
  }

  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const priceId = subscription.items.data[0]?.price.id;
  const plan = getPlanByPriceId(priceId);

  const supabase = getAdminClient();

  const { error } = await supabase
    .from('subscriptions')
    .update({
      stripe_customer_id: customerId,
      stripe_subscription_id: subscriptionId,
      plan: plan?.slug || 'starter',
      status: subscription.status,
      current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
      current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
      cancel_at_period_end: subscription.cancel_at_period_end,
    })
    .eq('user_id', userId);

  if (error) {
    console.error('Error updating subscription after checkout:', error);
    throw error;
  }
}

export async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription
) {
  const userId = subscription.metadata?.userId;
  const supabase = getAdminClient();

  const priceId = subscription.items.data[0]?.price.id;
  const plan = getPlanByPriceId(priceId);

  const updateData = {
    plan: plan?.slug || 'free',
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
    cancel_at_period_end: subscription.cancel_at_period_end,
  };

  let result = await supabase
    .from('subscriptions')
    .update(updateData)
    .eq('stripe_subscription_id', subscription.id);

  if (result.error && userId) {
    result = await supabase
      .from('subscriptions')
      .update(updateData)
      .eq('user_id', userId);
  }

  if (result.error) {
    console.error('Error updating subscription:', result.error);
    throw result.error;
  }
}

export async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription
) {
  const supabase = getAdminClient();

  const { error } = await supabase
    .from('subscriptions')
    .update({
      plan: 'free',
      status: 'canceled',
      stripe_subscription_id: null,
      cancel_at_period_end: false,
    })
    .eq('stripe_subscription_id', subscription.id);

  if (error) {
    console.error('Error handling subscription deletion:', error);
    throw error;
  }
}

export async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = invoice.subscription as string;
  if (!subscriptionId) return;

  const supabase = getAdminClient();

  const { error } = await supabase
    .from('subscriptions')
    .update({ status: 'past_due' })
    .eq('stripe_subscription_id', subscriptionId);

  if (error) {
    console.error('Error handling failed payment:', error);
    throw error;
  }
}
