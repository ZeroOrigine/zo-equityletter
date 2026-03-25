# EquityLetter — Security Documentation

## Authentication

### Architecture
- **Provider**: Supabase Auth (not custom)
- **Session management**: HttpOnly, Secure, SameSite cookies via `@supabase/ssr`
- **OAuth providers**: Google, GitHub
- **Email confirmation**: Required for email/password signups
- **Password requirements**: Min 8 chars, uppercase, lowercase, number

### Protected Routes
- `/dashboard/*` — requires authenticated session
- `/api/*` — requires authenticated session (except webhooks)
- `/api/webhooks/*` — public (Stripe needs access)

### Middleware
- Next.js middleware intercepts all requests
- Refreshes auth tokens on every request
- Redirects unauthenticated users to `/login`
- Redirects authenticated users away from auth pages

## Payments

### Architecture
- **Provider**: Stripe Checkout (not custom payment form)
- **PCI Compliance**: Card details never touch our servers
- **Webhook verification**: `stripe.webhooks.constructEvent()` with signature verification
- **Secret key**: Server-side only, never exposed to client

### Webhook Events Handled
1. `checkout.session.completed` — New subscription created
2. `customer.subscription.updated` — Plan change, renewal
3. `customer.subscription.deleted` — Cancellation
4. `invoice.payment_failed` — Payment failure

### Billing Portal
- Stripe Customer Portal for self-service billing management
- Users can update payment method, cancel, change plan

## Row-Level Security (RLS)
- All tables have RLS enabled
- Users can only access their own data
- Admin role can access all data
- Webhook handlers use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS

## Rate Limiting (Recommended)
Apply rate limits at these endpoints:
- `POST /api/auth/*` — 5 requests/minute per IP
- `POST /api/billing/checkout` — 3 requests/minute per user
- `POST /api/billing/portal` — 3 requests/minute per user
- `POST /api/webhooks/stripe` — No rate limit (Stripe needs access)

Implement via Vercel Edge Config, Upstash Redis, or similar.

## Environment Variables
See `.env.local.example` for required variables.
Never commit secrets to version control.

## Data Ownership
- Users own their data
- Export available in standard formats (JSON, CSV)
- Account deletion cascades all user data
- No vendor lock-in on user content
