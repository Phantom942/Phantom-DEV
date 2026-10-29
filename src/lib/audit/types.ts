import type { AuditPillarId } from "@/data/audit";

export type AuditIssueSeverity = "critical" | "warning" | "info" | "ok";

export type AuditIssue = {
  severity: AuditIssueSeverity;
  message: string;
};

export type AuditPillarResult = {
  id: AuditPillarId;
  score: number;
  status: "good" | "average" | "poor";
  issues: AuditIssue[];
  highlights: string[];
};

export type AuditPageSummary = {
  url: string;
  path: string;
  status: number;
  ok: boolean;
  title: string;
  hasMeta: boolean;
  hasH1: boolean;
  hasNoindex: boolean;
  wordCount: number;
  pageScore: number;
  issues: string[];
};

export type AuditReport = {
  url: string;
  auditedAt: string;
  overallScore: number;
  pillars: AuditPillarResult[];
  actionPlan: {
    p0: string[];
    p1: string[];
    p2: string[];
  };
  meta: {
    pagespeedAvailable: boolean;
    responseTimeMs: number;
    statusCode: number;
    pagesCrawled: number;
    crawlSource: "sitemap" | "internal" | "home-only";
    pages: AuditPageSummary[];
    expiresAt?: string;
    stripeSessionId?: string;
  };
};

export type RunAuditInput = {
  url: string;
  competitors?: string[];
};
