import { NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { stripe } from '@/lib/stripe/client';
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
  internalErrorResponse,
} from '@/lib/api-utils';

interface SubscriptionRow {
  id: string;
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  plan: string;
  status: string;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

const SUBSCRIPTION_COLUMNS = 'id, user_id, stripe_customer_id, stripe_subscription_id, plan, status, current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at' as const;

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    const { data: subscription, error } = await supabase
      .from('subscriptions')
      .select(SUBSCRIPTION_COLUMNS)
      .eq('user_id', user.id)
      .single();

    if (error || !subscription) {
      console.error('Subscription fetch error:', error?.message || 'Not found');
      return internalErrorResponse();
    }

    return successResponse(subscription as SubscriptionRow);
  } catch (error) {
    console.error('GET /api/subscription error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return unauthorizedResponse();

    let body: { priceId?: string };
    try { body = await request.json(); } catch {
      return errorResponse('Request body must be valid JSON with a priceId field.', 'INVALID_BODY', 400);
    }

    const { priceId } = body;
    if (!priceId || typeof priceId !== 'string') {
      return errorResponse('A valid Stripe price ID is required.', 'MISSING_PRICE_ID', 400);
    }

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', user.id)
      .single();

    let stripeCustomerId = subscription?.stripe_customer_id;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { user_id: user.id },
      });
      stripeCustomerId = customer.id;
      await supabase
        .from('subscriptions')
        .update({ stripe_customer_id: stripeCustomerId })
        .eq('user_id', user.id);
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard?checkout=success`,
      cancel_url: `${appUrl}/pricing?checkout=canceled`,
      metadata: { user_id: user.id },
    });

    return successResponse({ checkoutUrl: checkoutSession.url, sessionId: checkoutSession.id });
  } catch (error) {
    console.error('POST /api/subscription error:', error instanceof Error ? error.message : 'Unknown');
    return internalErrorResponse();
  }
}
