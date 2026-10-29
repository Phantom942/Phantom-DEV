import Stripe from "stripe";
import { NextResponse } from "next/server";
import { AUDIT_PRICE_EUR } from "@/data/audit";
import { safeApiErrorMessage } from "@/lib/audit/config";
import {
  sanitizeCompetitorUrls,
  validateAuditTargetUrl,
  normalizeSiteUrl,
} from "@/lib/audit/normalize-url";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/audit/rate-limit";

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquant");
  return new Stripe(key);
}

function getSiteBase(request: Request): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (env) return env;
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : "https://phantomdev.fr";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`audit-checkout:${ip}`, 8, 60 * 60 * 1000)) {
    return rateLimitResponse();
  }

  try {
    const body = await request.json();
    const siteUrl = normalizeSiteUrl(String(body.url ?? ""));

    if (!siteUrl || !validateAuditTargetUrl(siteUrl)) {
      return NextResponse.json({ error: "URL invalide ou non autorisée" }, { status: 400 });
    }

    if (body.acceptTerms !== true) {
      return NextResponse.json({ error: "Conditions de vente non acceptées" }, { status: 400 });
    }

    const competitors = sanitizeCompetitorUrls(
      Array.isArray(body.competitors) ? body.competitors.map(String) : []
    );

    const stripe = getStripe();
    const base = getSiteBase(request);
    const localePrefix = String(body.localePrefix ?? "");
    const cgvUrl = `${base}${localePrefix || ""}/mentions-legales#audit-cgv`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "link"],
      customer_creation: "if_required",
      billing_address_collection: "auto",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: AUDIT_PRICE_EUR * 100,
            product_data: {
              name: "Audit site internet PhantomDev",
              description: `Diagnostic automatique en ligne — ${siteUrl}`,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        audit_url: siteUrl,
        audit_competitors: JSON.stringify(competitors),
      },
      custom_text: {
        submit: {
          message: `Service numérique livré immédiatement à l'écran après paiement. Rapport conservé 30 jours.`,
        },
      },
      success_url: `${base}${localePrefix}/audit/result?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}${localePrefix}/audit`,
    });

    return NextResponse.json({ checkoutUrl: session.url, termsUrl: cgvUrl });
  } catch (e) {
    console.error("[audit/checkout]", e);
    return NextResponse.json(
      { error: safeApiErrorMessage(e, "Paiement indisponible — réessayez ou contactez-nous.") },
      { status: 500 }
    );
  }
}
