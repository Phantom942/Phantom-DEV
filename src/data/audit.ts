/** Identifiants des axes du diagnostic (libellés dans les traductions). */
export const AUDIT_PILLAR_IDS = [
  "technical",
  "seo",
  "structure",
  "conversion",
  "compliance",
  "popularity",
  "competitors",
  "discoverability",
  "actionPlan",
] as const;

export type AuditPillarId = (typeof AUDIT_PILLAR_IDS)[number];

/** Axes analysés hors plan d'action (pour le copy marketing). */
export const AUDIT_ANALYSIS_COUNT = AUDIT_PILLAR_IDS.length - 1;

export const AUDIT_PRICE_EUR =
  typeof process !== "undefined"
    ? Number(process.env.NEXT_PUBLIC_AUDIT_PRICE_EUR || "39")
    : 39;

export const AUDIT_STRIPE_URL =
  typeof process !== "undefined"
    ? process.env.NEXT_PUBLIC_AUDIT_STRIPE_URL || ""
    : "";
