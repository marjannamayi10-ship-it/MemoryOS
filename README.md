# MemoryOS

Persistent semantic memory for AI assistants, agents, and apps.

## Quick start

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Monetization

Plans, Stripe setup, and revenue targets live in [docs/MONETIZATION.md](docs/MONETIZATION.md).

| Plan | Price |
| --- | --- |
| Free | $0 |
| Pro | $14/mo · $140/yr (14-day trial) |
| API | $49/mo · $490/yr |
| Enterprise | Custom |

Create Stripe products:

```bash
STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe-products.mjs
```

## Stack

- Next.js (App Router) + Tailwind
- Stripe Checkout, Customer Portal, webhooks

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run stripe:setup` | Create Stripe products & prices |
