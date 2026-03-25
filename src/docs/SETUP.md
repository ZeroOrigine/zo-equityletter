# EquityLetter — Setup Guide

## Prerequisites
- Node.js 18+
- Supabase project (https://supabase.com)
- Stripe account (https://stripe.com)

## 1. Clone & Install
```bash
npm install
cp .env.local.example .env.local
```

## 2. Supabase Setup
1. Create a new Supabase project
2. Run the database schema SQL in the Supabase SQL Editor
3. Copy your project URL and anon key to `.env.local`
4. Copy your service role key to `.env.local`
5. Enable Google and GitHub OAuth in Supabase Dashboard > Auth > Providers

## 3. Stripe Setup
1. Create a Stripe account
2. Create products and prices in Stripe Dashboard:
   - **Starter**: $29/mo and $290/yr
   - **Pro**: $79/mo and $790/yr  
   - **Enterprise**: $199/mo and $1990/yr
3. Copy price IDs to `.env.local`
4. Copy API keys to `.env.local`

## 4. Stripe Webhooks

### Local Development
```bash
# Install Stripe CLI: https://stripe.com/docs/stripe-cli
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET` in `.env.local`.

### Production
1. Go to Stripe Dashboard > Developers > Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the signing secret to your production environment variables

## 5. Configure Stripe Billing Portal
1. Go to Stripe Dashboard > Settings > Billing > Customer portal
2. Enable the features you want (cancel, change plan, update payment)
3. Save

## 6. Run
```bash
npm run dev
```

Visit http://localhost:3000

## 7. Deploy
Deploy to Vercel:
```bash
vercel
```
Set all environment variables in Vercel Dashboard > Settings > Environment Variables.
