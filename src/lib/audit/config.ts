import { AUDIT_PRICE_EUR } from "@/data/audit";

/** Durée de conservation du rapport en ligne (jours). */
export const AUDIT_REPORT_RETENTION_DAYS = 30;

export function getExpectedAuditAmountCents(): number {
  return AUDIT_PRICE_EUR * 100;
}

export function isDevBypassAllowed(): boolean {
  return process.env.NODE_ENV === "development" && process.env.AUDIT_DEV_BYPASS === "1";
}

export function safeApiErrorMessage(error: unknown, fallback: string): string {
  if (process.env.NODE_ENV === "development" && error instanceof Error) {
    return error.message;
  }
  return fallback;
}
