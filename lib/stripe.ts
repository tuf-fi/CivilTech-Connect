import Stripe from "stripe";

/**
 * Stripe integration, stubbed by default. If STRIPE_SECRET_KEY isn't set,
 * checkout "just works" by immediately marking the order paid instead of
 * hitting Stripe's API — so the template runs with zero external services.
 * Swapping to real payments is a matter of setting env vars; nothing else
 * in the checkout flow needs to change.
 */

const liveKey = process.env.STRIPE_SECRET_KEY;

export const isStripeLive = Boolean(liveKey);

export const stripe = liveKey
  ? new Stripe(liveKey, { apiVersion: "2025-01-27.acacia" as Stripe.LatestApiVersion })
  : null;

export type StubCheckoutSession = {
  id: string;
  url: string;
  status: "complete";
};

/**
 * Creates a real Stripe Checkout Session when live keys are configured,
 * otherwise returns a stub session that the caller can treat as
 * immediately "paid" (see app actions for the order-creation flow).
 */
export async function createCheckoutSession(params: {
  courseId: string;
  courseTitle: string;
  amountCents: number;
  currency: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}): Promise<StubCheckoutSession | Stripe.Checkout.Session> {
  if (!stripe) {
    return {
      id: `stub_${params.courseId}_${Date.now()}`,
      url: params.successUrl,
      status: "complete",
    };
  }

  return stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: params.currency.toLowerCase(),
          product_data: { name: params.courseTitle },
          unit_amount: params.amountCents,
        },
        quantity: 1,
      },
    ],
    customer_email: params.customerEmail,
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}
