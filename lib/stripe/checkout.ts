import type Stripe from 'stripe';
import { stripe } from './client';

export async function createCheckoutSession({
  userId,
  email,
  priceId,
  customerId,
}: {
  userId: string;
  email: string;
  priceId: string;
  customerId?: string;
}) {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  const sessionParams: Stripe.Checkout.SessionCreateParams = {
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${appUrl}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}&success=true`,
    cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
    allow_promotion_codes: true,
  };

  if (customerId) {
    sessionParams.customer = customerId;
  } else {
    sessionParams.customer_email = email;
  }

  const session = await stripe.checkout.sessions.create(sessionParams);
  return session;
}
