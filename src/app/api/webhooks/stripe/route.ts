import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

/**
 * Stripe webhook handler.
 * Wire this URL in the Stripe Dashboard: /api/webhooks/stripe
 *
 * Persist events to your DB here when auth/users exist.
 * For now we acknowledge and log key lifecycle events.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe webhook signature or secret" },
      { status: 400 },
    );
  }

  const payload = await request.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid webhook signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      console.info("[stripe] checkout.session.completed", {
        id: session.id,
        customer: session.customer,
        subscription: session.subscription,
        planId: session.metadata?.planId,
      });
      break;
    }
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      console.info(`[stripe] ${event.type}`, {
        id: subscription.id,
        status: subscription.status,
        planId: subscription.metadata?.planId,
      });
      break;
    }
    case "invoice.paid":
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      console.info(`[stripe] ${event.type}`, {
        id: invoice.id,
        customer: invoice.customer,
        amountDue: invoice.amount_due,
      });
      break;
    }
    default:
      console.info(`[stripe] unhandled event ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
