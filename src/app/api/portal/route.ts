import { NextResponse } from "next/server";
import { getAppUrl, getStripe } from "@/lib/stripe";

type PortalBody = {
  customerId?: string;
};

/**
 * Opens the Stripe Customer Portal for plan changes / cancellation.
 * Pass a Stripe customer ID once auth is wired.
 */
export async function POST(request: Request) {
  let body: PortalBody;
  try {
    body = (await request.json()) as PortalBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.customerId) {
    return NextResponse.json(
      { error: "customerId is required" },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripe();
    const session = await stripe.billingPortal.sessions.create({
      customer: body.customerId,
      return_url: `${getAppUrl()}/pricing`,
    });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Portal session failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
