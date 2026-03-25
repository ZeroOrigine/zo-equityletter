import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY!;

if (!stripeSecretKey) {
  throw new Error('Missing environment variable: STRIPE_SECRET_KEY');
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2023-10-16',
  typescript: true,
});

// Map Stripe price IDs to internal plan names
// Update these values to match your Stripe dashboard
export const STRIPE_PRICE_TO_PLAN: Record<string, 'starter' | 'pro' | 'enterprise'> = {
  [process.env.STRIPE_STARTER_PRICE_ID || 'price_starter']: 'starter',
  [process.env.STRIPE_PRO_PRICE_ID || 'price_pro']: 'pro',
  [process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise']: 'enterprise',
};
