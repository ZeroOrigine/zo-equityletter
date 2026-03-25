export interface PlanConfig {
  name: string;
  slug: 'free' | 'starter' | 'pro' | 'enterprise';
  description: string;
  features: string[];
  limits: {
    lettersPerMonth: number;
    recipientsPerLetter: number;
    templates: number;
  };
  prices: {
    monthly: {
      amount: number;
      priceId: string;
    };
    yearly: {
      amount: number;
      priceId: string;
    };
  } | null; // null for free plan
}

// IMPORTANT: Replace these price IDs with your actual Stripe Price IDs
// Create these in your Stripe Dashboard > Products > Pricing
export const PLANS: PlanConfig[] = [
  {
    name: 'Free',
    slug: 'free',
    description: 'Get started with equity letters',
    features: [
      'Up to 3 letters per month',
      'Up to 10 recipients per letter',
      '1 basic template',
      'Email delivery',
      'Basic analytics',
    ],
    limits: {
      lettersPerMonth: 3,
      recipientsPerLetter: 10,
      templates: 1,
    },
    prices: null,
  },
  {
    name: 'Starter',
    slug: 'starter',
    description: 'For growing companies',
    features: [
      'Up to 20 letters per month',
      'Up to 100 recipients per letter',
      '5 professional templates',
      'Email delivery with tracking',
      'Open & click analytics',
      'Scheduled sending',
    ],
    limits: {
      lettersPerMonth: 20,
      recipientsPerLetter: 100,
      templates: 5,
    },
    prices: {
      monthly: {
        amount: 29,
        priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_MONTHLY_PRICE_ID || 'price_starter_monthly',
      },
      yearly: {
        amount: 290,
        priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_YEARLY_PRICE_ID || 'price_starter_yearly',
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    description: 'For scaling teams',
    features: [
      'Unlimited letters',
      'Up to 500 recipients per letter',
      'Unlimited templates',
      'Priority email delivery',
      'Advanced analytics & reports',
      'Scheduled sending',
      'Custom branding',
      'Priority support',
    ],
    limits: {
      lettersPerMonth: -1, // unlimited
      recipientsPerLetter: 500,
      templates: -1, // unlimited
    },
    prices: {
      monthly: {
        amount: 79,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_MONTHLY_PRICE_ID || 'price_pro_monthly',
      },
      yearly: {
        amount: 790,
        priceId: process.env.NEXT_PUBLIC_STRIPE_PRO_YEARLY_PRICE_ID || 'price_pro_yearly',
      },
    },
  },
  {
    name: 'Enterprise',
    slug: 'enterprise',
    description: 'For large organizations',
    features: [
      'Everything in Pro',
      'Unlimited recipients',
      'Custom integrations (API access)',
      'SSO / SAML support',
      'Dedicated account manager',
      'Custom SLA',
      'Data export in standard formats',
      'Audit logs',
    ],
    limits: {
      lettersPerMonth: -1,
      recipientsPerLetter: -1,
      templates: -1,
    },
    prices: {
      monthly: {
        amount: 199,
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_MONTHLY_PRICE_ID || 'price_enterprise_monthly',
      },
      yearly: {
        amount: 1990,
        priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_YEARLY_PRICE_ID || 'price_enterprise_yearly',
      },
    },
  },
];

export function getPlanBySlug(slug: string): PlanConfig | undefined {
  return PLANS.find((p) => p.slug === slug);
}

export function getPlanByPriceId(priceId: string): PlanConfig | undefined {
  return PLANS.find(
    (p) =>
      p.prices?.monthly.priceId === priceId ||
      p.prices?.yearly.priceId === priceId
  );
}
