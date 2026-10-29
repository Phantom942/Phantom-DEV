/** Base URL pour les appels API audit (Vercel). Vide = même origine (dev local / Vercel). */
export function getPublicAuditApiBase(): string {
  const url = process.env.NEXT_PUBLIC_AUDIT_API_URL?.trim();
  return url ? url.replace(/\/$/, "") : "";
}

export function auditApiUrl(path: string): string {
  const base = getPublicAuditApiBase();
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
