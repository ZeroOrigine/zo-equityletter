import Stripe from 'stripe';

// Lazy initialization - don't throw at module load time during build
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('Missing environment variable: STRIPE_SECRET_KEY');
    }
    _stripe = new Stripe(key, {
      apiVersion: '2023-10-16',
      typescript: true,
    });
  }
  return _stripe;
}

// Keep backward compatibility - but use getter pattern
// This will only throw when actually accessed at runtime, not at build time
export const stripe = typeof process !== 'undefined' && process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2023-10-16',
      typescript: true,
    })
  : (null as unknown as Stripe);

// Map Stripe price IDs to internal plan names
// Update these values to match your Stripe dashboard
export const STRIPE_PRICE_TO_PLAN: Record<string, 'starter' | 'pro' | 'enterprise'> = {
  [process.env.STRIPE_STARTER_PRICE_ID || 'price_starter']: 'starter',
  [process.env.STRIPE_PRO_PRICE_ID || 'price_pro']: 'pro',
  [process.env.STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise']: 'enterprise',
};
