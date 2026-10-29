import type { AuditIssue } from "@/lib/audit/types";
import { analyzeHtml, fetchText, type FetchTextResult } from "@/lib/audit/html-analyzer";
import { normalizePageUrl } from "@/lib/audit/sitemap";
import type { AuditPageSummary } from "@/lib/audit/types";

function pagePath(url: string): string {
  try {
    const p = new URL(url).pathname;
    return p === "/" ? "/" : p.replace(/\/+$/, "");
  } catch {
    return url;
  }
}

function computePageScore(status: number, snap: ReturnType<typeof analyzeHtml>): number {
  let s = 100;
  if (status >= 400) s -= 50;
  if (!snap.title) s -= 20;
  if (!snap.metaDescription) s -= 12;
  if (snap.h1.length === 0) s -= 18;
  if (snap.hasNoindex) s -= 35;
  if (snap.wordCount < 150) s -= 12;
  return Math.max(0, Math.min(100, s));
}

function pageIssueLabels(status: number, snap: ReturnType<typeof analyzeHtml>): string[] {
  const issues: string[] = [];
  if (status >= 400) issues.push(`HTTP ${status}`);
  if (!snap.title) issues.push("Sans title");
  if (!snap.metaDescription) issues.push("Sans meta");
  if (snap.h1.length === 0) issues.push("Sans H1");
  if (snap.hasNoindex) issues.push("noindex");
  if (snap.wordCount < 150) issues.push("Contenu thin");
  return issues;
}

export function buildPageSummary(url: string, fetch: FetchTextResult): AuditPageSummary {
  const snap = analyzeHtml(fetch.text, url);
  return {
    url: normalizePageUrl(url),
    path: pagePath(url),
    status: fetch.status,
    ok: fetch.ok,
    title: snap.title.slice(0, 80),
    hasMeta: !!snap.metaDescription,
    hasH1: snap.h1.length > 0,
    hasNoindex: snap.hasNoindex,
    wordCount: snap.wordCount,
    pageScore: computePageScore(fetch.status, snap),
    issues: pageIssueLabels(fetch.status, snap),
  };
}

export async function fetchCrawlPages(
  urls: string[],
  prefetched: Map<string, FetchTextResult>
): Promise<AuditPageSummary[]> {
  const normalized = urls.map((u) => normalizePageUrl(u));
  const toFetch = normalized.filter((u) => !prefetched.has(u));

  const fetched = await Promise.all(
    toFetch.map(async (url) => {
      const res = await fetchText(url, 8000).catch(() => ({
        ok: false,
        text: "",
        status: 0,
        headers: new Headers(),
      }));
      return [url, res] as const;
    })
  );

  for (const [url, res] of fetched) prefetched.set(url, res);

  return normalized.map((url) => buildPageSummary(url, prefetched.get(url)!));
}

export function multiPageStructureIssues(pages: AuditPageSummary[]): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const okPages = pages.filter((p) => p.ok);

  issues.push({
    severity: "ok",
    message: `${pages.length} page(s) analysée(s) (home + sitemap/liens internes).`,
  });

  const broken = pages.filter((p) => !p.ok || p.status >= 400);
  for (const p of broken.slice(0, 3)) {
    issues.push({
      severity: p.status >= 500 ? "critical" : "warning",
      message: `${p.path} — erreur HTTP ${p.status || "inaccessible"}.`,
    });
  }

  const noH1 = okPages.filter((p) => !p.hasH1);
  if (noH1.length) {
    issues.push({
      severity: "warning",
      message: `${noH1.length} page(s) sans H1 : ${noH1.map((p) => p.path).slice(0, 3).join(", ")}.`,
    });
  }

  const noindex = okPages.filter((p) => p.hasNoindex);
  for (const p of noindex.slice(0, 2)) {
    issues.push({
      severity: "critical",
      message: `${p.path} en noindex — non indexée par Google.`,
    });
  }

  const titles = okPages.filter((p) => p.title).map((p) => p.title.toLowerCase());
  const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
  if (dupTitles.length) {
    issues.push({
      severity: "warning",
      message: `Titles dupliqués détectés sur plusieurs pages (« ${dupTitles[0].slice(0, 40)}… »).`,
    });
  }

  const thin = okPages.filter((p) => p.wordCount < 150 && p.path !== "/");
  if (thin.length) {
    issues.push({
      severity: "info",
      message: `${thin.length} page(s) avec peu de contenu (< 150 mots).`,
    });
  }

  return issues;
}

export function multiPageSeoIssues(pages: AuditPageSummary[]): AuditIssue[] {
  const issues: AuditIssue[] = [];
  const okPages = pages.filter((p) => p.ok);

  const noMeta = okPages.filter((p) => !p.hasMeta);
  if (noMeta.length) {
    issues.push({
      severity: "warning",
      message: `${noMeta.length} page(s) sans meta description : ${noMeta.map((p) => p.path).slice(0, 3).join(", ")}.`,
    });
  }

  const weak = okPages.filter((p) => p.pageScore < 60);
  if (weak.length) {
    issues.push({
      severity: "info",
      message: `${weak.length} page(s) sous 60/100 au score page (SEO de base faible).`,
    });
  }

  return issues;
}
