import type Stripe from "stripe";
import { AUDIT_REPORT_RETENTION_DAYS, getExpectedAuditAmountCents } from "@/lib/audit/config";
import { loadAuditReport, saveAuditReport } from "@/lib/audit/report-store";
import { runSiteAudit } from "@/lib/audit/run-audit";
import { parseCompetitorsFromMetadata, validateAuditTargetUrl } from "@/lib/audit/normalize-url";
import type { AuditReport } from "@/lib/audit/types";

export class AuditSessionError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuditSessionError";
    this.status = status;
  }
}

export function assertPaidAuditSession(session: Stripe.Checkout.Session): void {
  if (session.payment_status !== "paid") {
    throw new AuditSessionError("Paiement non confirmé", 402);
  }
  if (session.amount_total !== getExpectedAuditAmountCents()) {
    throw new AuditSessionError("Montant de paiement invalide", 402);
  }
  if (session.currency !== "eur") {
    throw new AuditSessionError("Devise de paiement invalide", 402);
  }

  const url = session.metadata?.audit_url;
  if (!url || !validateAuditTargetUrl(url)) {
    throw new AuditSessionError("URL d'audit introuvable ou invalide", 400);
  }
}

function withRetentionMeta(report: AuditReport, sessionId: string): AuditReport {
  return {
    ...report,
    meta: {
      ...report.meta,
      expiresAt: new Date(Date.now() + AUDIT_REPORT_RETENTION_DAYS * 86_400_000).toISOString(),
      stripeSessionId: sessionId,
    },
  };
}

export async function executeAuditForSession(session: Stripe.Checkout.Session): Promise<AuditReport> {
  assertPaidAuditSession(session);

  const sessionId = session.id;
  const cached = await loadAuditReport(sessionId);
  if (cached) return cached;

  const url = session.metadata!.audit_url!;
  const competitors = parseCompetitorsFromMetadata(session.metadata?.audit_competitors);

  const report = withRetentionMeta(
    await runSiteAudit({ url, competitors }),
    sessionId
  );

  await saveAuditReport(sessionId, report);
  return report;
}

export async function verifySessionForReportAccess(
  stripe: Stripe,
  sessionId: string
): Promise<void> {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  assertPaidAuditSession(session);
}
