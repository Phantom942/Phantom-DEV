import Stripe from "stripe";
import { NextResponse } from "next/server";
import { AUDIT_REPORT_RETENTION_DAYS, isDevBypassAllowed, safeApiErrorMessage } from "@/lib/audit/config";
import { sanitizeCompetitorUrls, validateAuditTargetUrl } from "@/lib/audit/normalize-url";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/audit/rate-limit";
import { loadAuditReport, saveAuditReport } from "@/lib/audit/report-store";
import { runSiteAudit } from "@/lib/audit/run-audit";
import { AuditSessionError, executeAuditForSession } from "@/lib/audit/stripe-session";

export const runtime = "nodejs";
export const maxDuration = 60;

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquant");
  return new Stripe(key);
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`audit-run:${ip}`, 12, 60 * 60 * 1000)) {
    return rateLimitResponse();
  }

  try {
    const body = await request.json();
    const sessionId = String(body.sessionId ?? "");

    if (isDevBypassAllowed() && body.url) {
      if (!validateAuditTargetUrl(String(body.url))) {
        return NextResponse.json({ error: "URL invalide ou non autorisée" }, { status: 400 });
      }

      const devSessionId = sessionId || `dev-${Date.now()}`;
      const cachedDev = sessionId ? await loadAuditReport(devSessionId) : null;
      if (cachedDev) {
        return NextResponse.json({ report: cachedDev, cached: true });
      }

      const report = await runSiteAudit({
        url: String(body.url),
        competitors: sanitizeCompetitorUrls(
          Array.isArray(body.competitors) ? body.competitors.map(String) : []
        ),
      });

      const enriched = {
        ...report,
        meta: {
          ...report.meta,
          expiresAt: new Date(Date.now() + AUDIT_REPORT_RETENTION_DAYS * 86_400_000).toISOString(),
        },
      };

      if (sessionId) await saveAuditReport(devSessionId, enriched);
      return NextResponse.json({ report: enriched });
    }

    if (!sessionId) {
      return NextResponse.json({ error: "Session de paiement requise" }, { status: 400 });
    }

    const cached = await loadAuditReport(sessionId);
    if (cached) {
      return NextResponse.json({ report: cached, cached: true });
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const report = await executeAuditForSession(session);

    return NextResponse.json({ report });
  } catch (e) {
    console.error("[audit/run]", e);
    if (e instanceof AuditSessionError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json(
      { error: safeApiErrorMessage(e, "Impossible de lancer l'audit. Réessayez ou contactez-nous.") },
      { status: 500 }
    );
  }
}
