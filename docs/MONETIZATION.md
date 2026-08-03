# MemoryOS monetization

## Plans

| Plan | Price | Role |
| --- | --- | --- |
| Free | $0 | Acquisition — 1 project, 500 memories, 7-day retention |
| Pro | $14/mo or $140/yr | Core revenue — unlimited personal memory + sync |
| API | $49/mo or $490/yr + $0.40/1k overage | Product builders embedding MemoryOS |
| Enterprise | Custom | SSO, VPC/self-host, SLA |

Pro checkout includes a **14-day trial** via Stripe `subscription_data.trial_period_days`.

## Revenue model math

- **Blended ARPU (early):** ~$18–25 if mix is mostly Pro with a few API seats
- **Target early MRR:** 100 Pro + 20 API ≈ **$2,380 MRR**
- **Post–PMF band:** a few hundred Pro + growing API ≈ **$5k–15k MRR** before enterprise
- **Enterprise:** add $10k–100k+ ACV once security pack and SSO ship

Yearly plans are ~17% off monthly to pull cash forward and reduce churn.

## Stripe setup

1. Create a Stripe account and copy test keys into `.env.local` (see `.env.example`).
2. Create products/prices:

```bash
STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe-products.mjs
```

3. Paste the printed `STRIPE_PRICE_*` values into `.env.local`.
4. Forward webhooks locally:

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

5. Put the webhook signing secret in `STRIPE_WEBHOOK_SECRET`.
6. In production, set the webhook endpoint to `https://<your-domain>/api/webhooks/stripe` for:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`

## App routes

| Route | Purpose |
| --- | --- |
| `/` | Landing / acquisition |
| `/pricing` | Plan picker + Stripe Checkout |
| `/success` | Post-checkout confirmation |
| `/api/checkout` | Creates Checkout Session (Pro / API) |
| `/api/webhooks/stripe` | Subscription lifecycle events |
| `/api/portal` | Customer Portal (needs `customerId`) |

## Next product steps to maximize revenue

1. Ship Free MCP onboarding so Free → Pro conversion has a clear “aha.”
2. Add auth + map Stripe `customer` / `subscription` to users (webhook already logs events).
3. Meter API ops and bill overages (Stripe metered price or usage records).
4. Publish a public status/security page before Enterprise outreach.
5. Instrument funnel: visit → signup → memory created → paid.
