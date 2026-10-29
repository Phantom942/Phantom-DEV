import Stripe from "stripe";
import { NextResponse } from "next/server";
import { safeApiErrorMessage } from "@/lib/audit/config";
import { executeAuditForSession } from "@/lib/audit/stripe-session";

export const runtime = "nodejs";
export const maxDuration = 60;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquant");
  return new Stripe(key);
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook non configuré" }, { status: 501 });
  }

  try {
    const stripe = getStripe();
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Signature manquante" }, { status: 400 });
    }

    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "payment" && session.metadata?.audit_url) {
        try {
          await executeAuditForSession(session);
        } catch (e) {
          console.error("[audit/webhook] execute failed", session.id, e);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("[audit/webhook]", e);
    return NextResponse.json(
      { error: safeApiErrorMessage(e, "Webhook invalide") },
      { status: 400 }
    );
  }
}
