import { NextResponse } from "next/server";
import type { BillingInterval, PlanId } from "@/lib/pricing";
import { resolveStripePriceId } from "@/lib/pricing";
import { getAppUrl, getStripe } from "@/lib/stripe";

type CheckoutBody = {
  planId?: PlanId;
  interval?: BillingInterval;
  email?: string;
};

export async function POST(request: Request) {
  let body: CheckoutBody;
  try {
    body = (await request.json()) as CheckoutBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const planId = body.planId;
  const interval = body.interval ?? "month";

  if (!planId || (planId !== "pro" && planId !== "api")) {
    return NextResponse.json(
      { error: "Checkout is only available for Pro and API plans" },
      { status: 400 },
    );
  }

  if (interval !== "month" && interval !== "year") {
    return NextResponse.json({ error: "Invalid billing interval" }, { status: 400 });
  }

  const priceId = resolveStripePriceId(planId, interval);
  if (!priceId) {
    return NextResponse.json(
      {
        error:
          "Stripe price is not configured. Set STRIPE_PRICE_* env vars or run scripts/setup-stripe-products.mjs",
      },
      { status: 503 },
    );
  }

  try {
    const stripe = getStripe();
    const appUrl = getAppUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing?canceled=1`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      customer_email: body.email || undefined,
      metadata: {
        planId,
        interval,
      },
      subscription_data: {
        metadata: {
          planId,
          interval,
        },
        trial_period_days: planId === "pro" ? 14 : undefined,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
