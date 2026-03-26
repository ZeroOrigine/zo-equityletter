-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed')),
  joined_at TIMESTAMPTZ DEFAULT now(),
  source TEXT DEFAULT 'website'
);

-- Index for email lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_status ON subscribers(status);

-- Enable RLS
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (for the subscribe form) but restrict reads
CREATE POLICY "subscribers_public_insert" ON subscribers
  FOR INSERT WITH CHECK (true);

-- Only authenticated admins can read subscriber list
CREATE POLICY "subscribers_admin_read" ON subscribers
  FOR SELECT USING (auth.role() = 'authenticated');


-- Newsletter issues table
CREATE TABLE IF NOT EXISTS newsletter_issues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for slug lookups
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_slug ON newsletter_issues(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_issues_published ON newsletter_issues(published_at DESC);

-- Enable RLS
ALTER TABLE newsletter_issues ENABLE ROW LEVEL SECURITY;

-- Public read access for published newsletters
CREATE POLICY "newsletter_issues_public_read" ON newsletter_issues
  FOR SELECT USING (true);


-- Seed 3 newsletter issues with real equity education content
INSERT INTO newsletter_issues (subject, slug, content, excerpt, published_at) VALUES
(
  'The 83(b) Election: The $100 Form That Can Save You Millions',
  'the-83b-election',
  '# The 83(b) Election: The $100 Form That Can Save You Millions

If you receive restricted stock at an early-stage startup, you have exactly **30 days** to make one of the most important tax decisions of your career. Miss the deadline, and there is no appeal, no extension, no do-over.

## What is an 83(b) election?

When you receive restricted stock (actual shares subject to vesting), the IRS gives you a choice:

**Option A (Default):** Pay taxes on share value as they vest. Shares at $0.001 now but $5.00 at vesting = tax on $5.00/share.

**Option B (File 83(b) within 30 days):** Pay taxes on value RIGHT NOW. Shares worth $0.001 today = tax on $0.001/share. All future appreciation taxed as long-term capital gains.

## The math

Co-founder receiving 1,000,000 shares at $0.001/share:

**Without 83(b):** Over 4 years, shares grow to $10/share. Ordinary income tax (37%) on $10M = **$3.7M**.

**With 83(b):** Tax on $1,000 today = **$370**. At sale: long-term capital gains (20%) on $9.999M = **$2M**.

Savings: **$1.7 million.**

The 30-day deadline is absolute. No exceptions.',
  'If you receive restricted stock at a startup, you have exactly 30 days to make the most important tax decision of your career. Here is what most people get wrong.',
  '2026-03-18'
),
(
  'Why Your 1% Ownership Might Be Worth Nothing: Understanding Liquidation Preferences',
  'liquidation-preferences-explained',
  '# Why Your 1% Ownership Might Be Worth Nothing

Your offer letter says you own 1% of a $100M company. That is NOT $1,000,000. The math is more complicated — and less favorable — than you think.

## The preference stack

When investors buy preferred stock, they get a liquidation preference: the right to get their money back first.

Example:
- Series A: $10M invested (1x preference)
- Series B: $30M invested (1x preference)
- Series C: $60M invested (1x preference)
- Total stack: $100M

The first $100M of any exit goes to investors. Common stockholders split the remainder.

## The waterfall

At a $100M exit (the "valuation"!): investors get $100M, you get **$0**.
At a $150M exit: investors get $100M, common splits $50M. Your 1% = $500K.
At a $200M exit: investors get $100M, common splits $100M. Your 1% = $1M.

## Always ask

1. What is the total liquidation preference stack?
2. Are any preferences participating?
3. What is the current revenue and realistic exit multiple?

Your equity is not ownership% x valuation. It is ownership% x max(0, exit - preferences).',
  'Your offer letter says you own 1% of a $100M company. That does not mean you have $1M. Here is the math that most startup employees never see.',
  '2026-03-11'
),
(
  'The 90-Day Exercise Window: The Golden Handcuffs Nobody Talks About',
  'the-90-day-exercise-window',
  '# The 90-Day Exercise Window: Golden Handcuffs Nobody Talks About

You leave your startup with 50,000 vested options at $4 strike, FMV $20/share. You have **90 days** to come up with $200,000 cash plus potentially $200,000+ in AMT.

Total cost to keep your equity: **$400,000+** in 90 days, for illiquid private stock.

## Why this exists

The 90-day rule for ISOs is an IRS requirement. But companies adopted it as the default for ALL options, even though NSOs have no such legal requirement.

## The golden handcuffs effect

The more valuable your options, the harder it is to leave:
- Stay at companies you want to leave (can''t afford to exercise)
- Forfeit years of equity (can''t come up with cash)
- Take on debt for uncertain outcomes

## Companies that fixed this

Coinbase: 7 years. Pinterest: 7 years. Quora: 10 years.

These companies recognized 90 days is retention-by-financial-coercion.

## How to protect yourself

Before accepting: Ask about the exercise window. If 90 days, negotiate longer.
While employed: Consider early exercise if strike is low. Exercise in batches across years.
When leaving: Negotiate an extended window as part of departure.',
  'You leave your startup with 50,000 vested options. You have 90 days to come up with $200,000+ or you lose everything. This is the most employee-hostile term in tech.',
  '2026-03-04'
);
