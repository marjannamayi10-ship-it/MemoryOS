/**
 * Creates MemoryOS products + prices in Stripe (test or live, based on key).
 *
 * Usage:
 *   STRIPE_SECRET_KEY=sk_test_... node scripts/setup-stripe-products.mjs
 *
 * Prints env vars to paste into .env.local
 */
import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;
if (!key) {
  console.error("Set STRIPE_SECRET_KEY before running this script.");
  process.exit(1);
}

const stripe = new Stripe(key);

const catalog = [
  {
    envPrefix: "PRO",
    name: "MemoryOS Pro",
    description: "Unlimited personal memory, sync, and semantic recall.",
    monthly: 1400,
    yearly: 14000,
    metadata: { planId: "pro" },
  },
  {
    envPrefix: "API",
    name: "MemoryOS API",
    description: "Pro features plus API access and included memory ops.",
    monthly: 4900,
    yearly: 49000,
    metadata: { planId: "api" },
  },
];

const lines = [];

for (const item of catalog) {
  const product = await stripe.products.create({
    name: item.name,
    description: item.description,
    metadata: item.metadata,
  });

  const monthly = await stripe.prices.create({
    product: product.id,
    unit_amount: item.monthly,
    currency: "usd",
    recurring: { interval: "month" },
    metadata: { ...item.metadata, interval: "month" },
  });

  const yearly = await stripe.prices.create({
    product: product.id,
    unit_amount: item.yearly,
    currency: "usd",
    recurring: { interval: "year" },
    metadata: { ...item.metadata, interval: "year" },
  });

  lines.push(`STRIPE_PRICE_${item.envPrefix}_MONTHLY=${monthly.id}`);
  lines.push(`STRIPE_PRICE_${item.envPrefix}_YEARLY=${yearly.id}`);

  console.log(`Created ${item.name}`);
  console.log(`  product: ${product.id}`);
  console.log(`  monthly: ${monthly.id}`);
  console.log(`  yearly:  ${yearly.id}`);
}

console.log("\nAdd these to .env.local:\n");
console.log(lines.join("\n"));
