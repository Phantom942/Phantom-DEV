import Stripe from "stripe";
import { NextResponse } from "next/server";
import { safeApiErrorMessage } from "@/lib/audit/config";
import { loadAuditReport } from "@/lib/audit/report-store";
import { checkRateLimit, getClientIp, rateLimitResponse } from "@/lib/audit/rate-limit";
import { AuditSessionError, verifySessionForReportAccess } from "@/lib/audit/stripe-session";

export const runtime = "nodejs";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY manquant");
  return new Stripe(key);
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`audit-report:${ip}`, 30, 60 * 60 * 1000)) {
    return rateLimitResponse();
  }

  const sessionId = new URL(request.url).searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json({ error: "session_id requis" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    await verifySessionForReportAccess(stripe, sessionId);

    const report = await loadAuditReport(sessionId);
    if (!report) {
      return NextResponse.json(
        { error: "Rapport introuvable ou expiré — relancez l'analyse depuis la page résultat." },
        { status: 404 }
      );
    }

    return NextResponse.json({ report, cached: true });
  } catch (e) {
    console.error("[audit/report]", e);
    if (e instanceof AuditSessionError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json(
      { error: safeApiErrorMessage(e, "Accès au rapport impossible.") },
      { status: 500 }
    );
  }
}
