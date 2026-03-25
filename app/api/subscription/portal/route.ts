import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import {
  successResponse,
  unauthorizedResponse,
  errorResponse,
  internalErrorResponse,
} from '@/lib/api-utils';
import { stripe } from '@/lib/stripe';

// ============================================================================
// POST /api/subscription/portal
// Create a Stripe Customer Portal session so users can manage their
// subscription (cancel, update payment method, view invoices).
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return unauthorizedResponse();
    }

    // Fetch the user's Stripe customer ID
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('stripe_customer_id')
      .eq('user_id', session.user.id)
      .single();

    if (subError) {
      console.error('Subscription lookup error:', subError.message);
      return internalErrorResponse();
    }

    if (!subscription?.stripe_customer_id) {
      return errorResponse(
        'No billing account found. Please subscribe to a plan first.',
        'NO_STRIPE_CUSTOMER',
        400
      );
    }

    const requestUrl = new URL(request.url);
    const origin = requestUrl.origin;

    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripe_customer_id,
      return_url: `${origin}/dashboard`,
    });

    return successResponse({
      portalUrl: portalSession.url,
    });
  } catch (error) {
    console.error('POST /api/subscription/portal error:', error instanceof Error ? error.message : 'Unknown error');
    return internalErrorResponse();
  }
}
