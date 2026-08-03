export type PlanId = "free" | "pro" | "api" | "enterprise";

export type BillingInterval = "month" | "year";

export type Plan = {
  id: PlanId;
  name: string;
  tagline: string;
  /** Display price in USD; null means custom / contact sales */
  priceMonthly: number | null;
  priceYearly: number | null;
  /** Stripe Price env key suffix, e.g. PRO_MONTHLY → STRIPE_PRICE_PRO_MONTHLY */
  stripePriceEnv?: {
    month?: string;
    year?: string;
  };
  cta: string;
  ctaHref?: string;
  highlighted?: boolean;
  features: string[];
  limits: string[];
};

export const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free",
    tagline: "Prove memory works for you.",
    priceMonthly: 0,
    priceYearly: 0,
    cta: "Start free",
    ctaHref: "/#get-started",
    features: [
      "1 project / workspace",
      "500 memories stored",
      "MCP server for Claude & ChatGPT",
      "7-day retention",
      "Community support",
    ],
    limits: ["No API access", "No cross-device sync"],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Never re-explain your stack again.",
    priceMonthly: 14,
    priceYearly: 140,
    stripePriceEnv: {
      month: "STRIPE_PRICE_PRO_MONTHLY",
      year: "STRIPE_PRICE_PRO_YEARLY",
    },
    cta: "Start Pro",
    highlighted: true,
    features: [
      "Unlimited projects",
      "Unlimited memories",
      "Cross-device sync",
      "Semantic recall across history",
      "JSON export anytime",
      "Priority email support",
    ],
    limits: ["Personal use only"],
  },
  {
    id: "api",
    name: "API",
    tagline: "Ship memory into your product.",
    priceMonthly: 49,
    priceYearly: 490,
    stripePriceEnv: {
      month: "STRIPE_PRICE_API_MONTHLY",
      year: "STRIPE_PRICE_API_YEARLY",
    },
    cta: "Get API access",
    features: [
      "Everything in Pro",
      "REST + SDK access",
      "100k memory ops / month included",
      "$0.40 per extra 1k ops",
      "Webhook events",
      "Usage dashboard",
    ],
    limits: ["Overages billed monthly"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Memory with control and compliance.",
    priceMonthly: null,
    priceYearly: null,
    cta: "Talk to sales",
    ctaHref: "mailto:sales@memoryos.dev?subject=MemoryOS%20Enterprise",
    features: [
      "SSO / SAML",
      "VPC or self-host option",
      "Custom retention & residency",
      "SLA + dedicated support",
      "Security review pack",
      "Volume API pricing",
    ],
    limits: [],
  },
];

export function formatUsd(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function yearlySavingsPercent(plan: Plan): number | null {
  if (
    plan.priceMonthly == null ||
    plan.priceYearly == null ||
    plan.priceMonthly === 0
  ) {
    return null;
  }
  const full = plan.priceMonthly * 12;
  if (full <= 0) return null;
  return Math.round(((full - plan.priceYearly) / full) * 100);
}

export function resolveStripePriceId(
  planId: PlanId,
  interval: BillingInterval,
): string | null {
  const plan = PLANS.find((p) => p.id === planId);
  if (!plan?.stripePriceEnv) return null;
  const envKey = plan.stripePriceEnv[interval];
  if (!envKey) return null;
  return process.env[envKey] ?? null;
}
