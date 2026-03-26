export interface NewsletterIssue {
  id: string;
  subject: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  content: string;
}

export const newsletterIssues: NewsletterIssue[] = [
  {
    id: '1',
    subject: 'The 83(b) Election: The $100 Form That Can Save You Millions',
    slug: 'the-83b-election',
    excerpt:
      'If you receive restricted stock at a startup, you have exactly 30 days to make the most important tax decision of your career. Here is what most people get wrong.',
    publishedAt: '2026-03-18',
    content: `# The 83(b) Election: The $100 Form That Can Save You Millions

If you receive restricted stock at an early-stage startup, you have exactly **30 days** to make one of the most important tax decisions of your career. Miss the deadline, and there is no appeal, no extension, no do-over.

## What is an 83(b) election?

When you receive restricted stock (actual shares that are subject to vesting), the IRS gives you a choice:

**Option A (Default — no 83(b)):** Pay taxes on the value of shares as they vest. If you receive shares at $0.001 but they are worth $5.00 when they vest two years later, you owe ordinary income tax on $5.00/share at vesting.

**Option B (File 83(b) within 30 days):** Pay taxes on the value of shares RIGHT NOW, at the time of receipt. If shares are worth $0.001 today, you pay tax on $0.001/share. All future appreciation is taxed as long-term capital gains when you sell.

## The math that matters

Let's say you're a co-founder receiving 1,000,000 shares at $0.001/share:

**Without 83(b):** Over 4 years of vesting, shares grow to $10/share. You owe ordinary income tax (37% bracket) on $10M = **$3.7M in taxes**, owed as shares vest. You have no cash to pay this.

**With 83(b):** You pay income tax on $1,000 today = roughly **$370 in taxes**. When you sell at $10/share, you pay long-term capital gains (20%) on $9,999,000 = **$2M in taxes**.

The 83(b) election saved **$1.7 million** in this scenario.

## The 30-day rule is absolute

The IRS is extremely strict about this deadline. Day 31? Too late. Your accountant was on vacation? Too late. You didn't know the election existed? Too late.

Here is what you need to do:

1. **File IRS Form 83(b)** with the IRS within 30 days of receiving the stock
2. **Send a copy to your employer**
3. **Keep a copy with your tax records**
4. **Attach a copy to your tax return** for that year

## When 83(b) does NOT make sense

The 83(b) election is not always the right move:

- **If the shares have significant value already:** Paying taxes on $500,000 worth of stock when you have no guarantee the company will succeed is a real risk. If the company fails, you cannot reclaim the taxes you paid.
- **If you cannot afford the tax bill:** Even at low values, the tax is real money. Make sure you can cover it.
- **If you have RSUs, not restricted stock:** 83(b) elections apply to restricted stock only. You cannot file 83(b) for RSUs.

## The bottom line

If you receive restricted stock at a startup where the FMV is very low (under $1/share), filing an 83(b) election is almost always the right move. The downside is small (losing the tax paid if the company fails), and the upside can be life-changing.

Talk to a tax advisor. But do it within 30 days.

---

*This is educational content, not tax advice. Consult a qualified tax professional for your specific situation.*`,
  },
  {
    id: '2',
    subject: 'Why Your "1% Ownership" Might Be Worth Nothing: Understanding Liquidation Preferences',
    slug: 'liquidation-preferences-explained',
    excerpt:
      'Your offer letter says you own 1% of a $100M company. That does not mean you have $1M. Here is the math that most startup employees never see.',
    publishedAt: '2026-03-11',
    content: `# Why Your "1% Ownership" Might Be Worth Nothing

Your offer letter says you own 1% of a company valued at $100M. Simple math says that is $1,000,000. But that simple math is wrong, and the difference can be devastating.

## The headline number is not your number

When a company announces a $100M valuation, that number reflects the price paid by the latest investors for **preferred stock** — shares with special rights that your common stock does not have.

The most important of these rights is the **liquidation preference**.

## How liquidation preferences work

A liquidation preference gives investors the right to get their money back before anyone else in an exit event (acquisition, wind-down, or IPO).

Here is a typical scenario:

- Series A investors put in $10M (1x preference)
- Series B investors put in $30M (1x preference)
- Series C investors put in $60M (1x preference)
- **Total liquidation preference stack: $100M**

This means in any exit, the first $100M goes to investors. Common stockholders (you) split whatever is left.

## The waterfall at different exit prices

| Exit Price | Investors Get | Common Stock Gets | Your 1% |
|-----------|--------------|-------------------|---------|
| $50M | $50M | $0 | **$0** |
| $100M | $100M | $0 | **$0** |
| $150M | $100M | $50M | **$500K** |
| $200M | $100M | $100M | **$1M** |
| $300M | $100M | $200M | **$2M** |

Notice: at a $100M exit (the "valuation" number!), you get **nothing**. The company has to sell for MORE than the total amount invested for common stockholders to receive a single dollar.

## It gets worse with participating preferences

Some investors have **participating preferred** stock, which means they get their preference AND share in the remaining proceeds. In that case:

At a $200M exit with participating preferences: Investors take $100M preference + their share of the remaining $100M. If investors own 60% on a fully diluted basis, they take $100M + $60M = $160M. Common stockholders split $40M. Your 1% of common = **$400K**, not $2M.

## What to ask before accepting an offer

1. **What is the total liquidation preference stack?** This tells you the break-even point for common stockholders.
2. **Are any preferences participating?** This dramatically changes the math.
3. **Are any preferences greater than 1x?** A 2x preference means investors get double their money back first.
4. **What is the current revenue multiple?** This helps you estimate realistic exit prices.

## The uncomfortable truth

Most startup acquisitions are for 1-3x the last round valuation. If a company raised $100M at a $400M valuation, a $500M acquisition sounds great — but after $100M in preferences, common stockholders split $400M. Your 1% is $4M, not the $5M you expected.

And if the company sells for $300M? Investors take $100M, common splits $200M. Your 1% is $2M — less than half of what the headline valuation implies.

## The bottom line

Your equity is not \`ownership% x valuation\`. It is \`ownership% x max(0, exit_price - liquidation_preferences)\`, adjusted for participating preferences.

Always ask for the preference stack. It is the most important number that most startup employees never learn.

---

*This is educational content, not financial advice. Every cap table is different — consult a financial advisor for your specific situation.*`,
  },
  {
    id: '3',
    subject: 'The 90-Day Exercise Window: The Golden Handcuffs Nobody Talks About',
    slug: 'the-90-day-exercise-window',
    excerpt:
      'You leave your startup with 50,000 vested options. You have 90 days to come up with $200,000+ or you lose everything. This is the most employee-hostile term in tech.',
    publishedAt: '2026-03-04',
    content: `# The 90-Day Exercise Window: Golden Handcuffs Nobody Talks About

You spent 4 years building a startup. You vested 50,000 options with a $4 strike price. The current FMV is $20/share. You want to move on.

Then you read the fine print: **you have 90 days after leaving to exercise your vested options, or they expire permanently.**

## The cost of leaving

Exercising 50,000 options at $4 strike = **$200,000 cash** you need within 90 days.

But that is not all. If these are ISOs, the $800,000 spread ($20 FMV - $4 strike x 50,000 shares) is an AMT preference item. Your AMT bill could be an additional **$200,000+**.

Total cost to keep your equity: **$400,000+** — in cash, within 90 days, for shares in a private company that you cannot sell.

## Why this exists

The 90-day post-termination exercise window is an IRS rule for ISOs: if you do not exercise within 90 days of leaving, your ISOs convert to NSOs and lose their favorable tax treatment. Most companies adopted 90 days as the default for ALL options, even though NSOs have no such legal requirement.

## The golden handcuffs effect

This creates a perverse incentive: the more valuable your options become, the harder it is to leave. An early employee with $2M in vested options might need $500K+ in cash and taxes to exercise. Many employees:

- **Stay at companies they want to leave** because they cannot afford to exercise
- **Forfeit years of equity** because they cannot come up with the cash
- **Take on debt** to exercise options in a company with uncertain outcomes

## Companies that fixed this

Several companies have adopted extended post-termination exercise windows:

- **Coinbase:** 7 years
- **Pinterest:** 7 years
- **Quora:** 10 years
- **Stripe:** Extended window
- **Amplitude:** 7 years

These companies recognized that the 90-day window is a retention-by-financial-coercion mechanism, not a legitimate business practice.

## How to protect yourself

### Before accepting an offer:

1. **Ask about the post-termination exercise window.** If it is 90 days, ask if they will extend it. Many companies will negotiate on this point.
2. **Calculate the worst-case exercise cost.** Multiply your shares by the strike price, then add estimated AMT. Can you afford this?
3. **Prefer RSUs over options** at later-stage companies. RSUs do not have an exercise cost.

### While employed:

4. **Consider early exercise** if the company offers it and your strike price is very low. Combined with an 83(b) election, this eliminates the exercise cost problem entirely.
5. **Exercise in batches** during employment to spread the cost and tax impact over multiple years.

### When leaving:

6. **Negotiate an extended exercise window** as part of your departure. Some companies will grant extensions, especially for long-tenured employees.
7. **Consider exercising only the ISOs** (converting NSOs would lose their only advantage) and forfeiting the rest if the cost is too high.
8. **Talk to a tax advisor** before the 90-day clock starts ticking.

## The bottom line

The 90-day exercise window turns equity compensation into a financial trap for departing employees. It is the single most employee-hostile term in standard option agreements, and it is the first thing you should try to negotiate.

If a company will not extend the exercise window, factor the potential forfeiture cost into your decision. Those options are less valuable than they appear on paper.

---

*This is educational content, not financial advice. Consult a qualified financial advisor for your specific situation.*`,
  },
];

export function getIssueBySlug(slug: string): NewsletterIssue | undefined {
  return newsletterIssues.find((i) => i.slug === slug);
}
