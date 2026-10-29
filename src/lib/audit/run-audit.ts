import type { AuditPillarId } from "@/data/audit";
import {
  fetchCrawlPages,
  multiPageSeoIssues,
  multiPageStructureIssues,
} from "@/lib/audit/crawl-pages";
import { analyzeHtml, fetchText, type FetchTextResult } from "@/lib/audit/html-analyzer";
import { fetchPageSpeed } from "@/lib/audit/pagespeed";
import { isPrivateOrBlockedHost, normalizeSiteUrl } from "@/lib/audit/normalize-url";
import {
  extractInternalPageUrls,
  MAX_CRAWL_PAGES,
  normalizePageUrl,
  pickCrawlUrls,
  resolveSitemapPageUrls,
} from "@/lib/audit/sitemap";
import type { AuditIssue, AuditPillarResult, AuditReport, RunAuditInput } from "@/lib/audit/types";

function scoreFromIssues(issues: AuditIssue[]): number {
  let s = 100;
  for (const i of issues) {
    if (i.severity === "critical") s -= 25;
    else if (i.severity === "warning") s -= 12;
    else if (i.severity === "info") s -= 5;
  }
  return Math.max(0, Math.min(100, s));
}

function statusFromScore(score: number): "good" | "average" | "poor" {
  if (score >= 75) return "good";
  if (score >= 50) return "average";
  return "poor";
}

function pillar(id: AuditPillarId, issues: AuditIssue[], highlights: string[]): AuditPillarResult {
  const score = scoreFromIssues(issues);
  return { id, score, status: statusFromScore(score), issues, highlights };
}

function extractKeywords(snapshot: ReturnType<typeof analyzeHtml>): string[] {
  const blob = [snapshot.title, snapshot.metaDescription, ...snapshot.h1].join(" ").toLowerCase();
  const words = blob.match(/[a-zàâäéèêëïîôùûüç0-9-]{4,}/gi) ?? [];
  const stop = new Set(["votre", "notre", "site", "internet", "accueil", "contact", "services", "home", "page"]);
  const freq = new Map<string, number>();
  for (const w of words) {
    if (stop.has(w)) continue;
    freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([w]) => w);
}

const emptyFetch = (): FetchTextResult => ({
  ok: false,
  text: "",
  status: 0,
  headers: new Headers(),
});

async function compareCompetitor(_origin: string, competitorUrl: string) {
  const normalized = normalizeSiteUrl(competitorUrl);
  if (!normalized) return null;
  try {
    if (isPrivateOrBlockedHost(new URL(normalized).hostname)) return null;
    const { text, ok } = await fetchText(normalized, 8000);
    if (!ok) return { url: normalized, ok: false as const };
    const snap = analyzeHtml(text, normalized);
    return {
      url: normalized,
      ok: true as const,
      title: snap.title,
      hasMeta: !!snap.metaDescription,
      h1Count: snap.h1.length,
      wordCount: snap.wordCount,
    };
  } catch {
    return { url: normalized, ok: false as const };
  }
}

export async function runSiteAudit(input: RunAuditInput): Promise<AuditReport> {
  const origin = normalizeSiteUrl(input.url);
  if (!origin) throw new Error("URL invalide");

  const competitorUrls = input.competitors?.slice(0, 3) ?? [];
  const homeStart = Date.now();

  const [home, robotsRes, llmsRes, sitemapXml, sitemapIndex, pagespeed, ...competitorResults] =
    await Promise.all([
      fetchText(origin),
      fetchText(`${origin}/robots.txt`, 8000).catch(() => emptyFetch()),
      fetchText(`${origin}/llms.txt`, 8000).catch(() => emptyFetch()),
      fetchText(`${origin}/sitemap.xml`, 8000).catch(() => emptyFetch()),
      fetchText(`${origin}/sitemap_index.xml`, 8000).catch(() => emptyFetch()),
      fetchPageSpeed(origin),
      ...competitorUrls.map((c) => compareCompetitor(origin, c)),
    ]);

  const responseTimeMs = Date.now() - homeStart;
  const snapshot = analyzeHtml(home.text, origin);
  const competitors = competitorResults;

  const sitemapFetches = [sitemapXml, sitemapIndex];
  const hasSitemap = sitemapFetches.some((r) => r.ok && r.text.includes("<"));
  let crawlSource: AuditReport["meta"]["crawlSource"] = "home-only";

  let sitemapUrls = await resolveSitemapPageUrls(origin, sitemapFetches);
  if (sitemapUrls.length) {
    crawlSource = "sitemap";
  } else {
    sitemapUrls = extractInternalPageUrls(home.text, origin, MAX_CRAWL_PAGES * 2);
    if (sitemapUrls.length) crawlSource = "internal";
  }

  const crawlUrls = pickCrawlUrls(origin, sitemapUrls, MAX_CRAWL_PAGES);
  const prefetched = new Map<string, FetchTextResult>();
  prefetched.set(normalizePageUrl(origin), home);
  const pages = await fetchCrawlPages(crawlUrls, prefetched);

  const keywords = extractKeywords(snapshot);

  // — Technique & sécurité
  const technicalIssues: AuditIssue[] = [];
  if (!origin.startsWith("https://")) {
    technicalIssues.push({ severity: "critical", message: "Le site n'est pas servi en HTTPS." });
  } else {
    technicalIssues.push({ severity: "ok", message: "HTTPS actif." });
  }
  if (home.status >= 400) {
    technicalIssues.push({ severity: "critical", message: `Page d'accueil en erreur HTTP ${home.status}.` });
  }
  if (!snapshot.hasViewport) {
    technicalIssues.push({ severity: "critical", message: "Balise viewport mobile absente." });
  }
  const hsts = home.headers.get("strict-transport-security");
  if (origin.startsWith("https://") && !hsts) {
    technicalIssues.push({ severity: "info", message: "En-tête HSTS absent — renforcez la sécurité HTTPS." });
  } else if (hsts) {
    technicalIssues.push({ severity: "ok", message: "HSTS configuré." });
  }
  if (responseTimeMs > 3000) {
    technicalIssues.push({
      severity: "warning",
      message: `Temps de réponse serveur élevé (${responseTimeMs} ms).`,
    });
  }

  // — SEO Google (home)
  const seoIssues: AuditIssue[] = [];
  if (!snapshot.title) seoIssues.push({ severity: "critical", message: "Balise <title> absente sur la home." });
  else if (snapshot.title.length < 20 || snapshot.title.length > 65) {
    seoIssues.push({ severity: "warning", message: `Longueur du title atypique (${snapshot.title.length} car.).` });
  } else seoIssues.push({ severity: "ok", message: "Title présent et dimensionné." });

  if (!snapshot.metaDescription) {
    seoIssues.push({ severity: "critical", message: "Meta description absente sur la home." });
  } else if (snapshot.metaDescription.length < 70 || snapshot.metaDescription.length > 165) {
    seoIssues.push({ severity: "warning", message: "Meta description courte ou trop longue." });
  } else seoIssues.push({ severity: "ok", message: "Meta description renseignée." });

  if (snapshot.h1.length === 0) seoIssues.push({ severity: "critical", message: "Aucun H1 sur la home." });
  else if (snapshot.h1.length > 1) {
    seoIssues.push({ severity: "warning", message: `${snapshot.h1.length} H1 — un seul recommandé.` });
  } else seoIssues.push({ severity: "ok", message: `H1 : « ${snapshot.h1[0].slice(0, 60)} »` });

  if (!snapshot.canonical) {
    seoIssues.push({ severity: "info", message: "Canonical non détecté sur la home." });
  }
  if (snapshot.jsonLdCount === 0) {
    seoIssues.push({ severity: "warning", message: "Aucune donnée structurée Schema.org sur la home." });
  } else {
    seoIssues.push({ severity: "ok", message: `${snapshot.jsonLdCount} bloc(s) JSON-LD sur la home.` });
  }
  seoIssues.push(...multiPageSeoIssues(pages));

  // — Performance
  const perfIssues: AuditIssue[] = [];
  if (pagespeed) {
    if (pagespeed.performance < 50) {
      perfIssues.push({ severity: "critical", message: `Score performance mobile ${pagespeed.performance}/100.` });
    } else if (pagespeed.performance < 80) {
      perfIssues.push({
        severity: "warning",
        message: `Performance mobile ${pagespeed.performance}/100 — marge de progrès.`,
      });
    } else {
      perfIssues.push({ severity: "ok", message: `Performance mobile ${pagespeed.performance}/100.` });
    }
    if (pagespeed.lcpMs && pagespeed.lcpMs > 4000) {
      perfIssues.push({ severity: "warning", message: `LCP ~${Math.round(pagespeed.lcpMs)} ms (objectif < 2,5 s).` });
    }
  } else {
    perfIssues.push({
      severity: "info",
      message: "Scores PageSpeed indisponibles (clé API Google non configurée côté serveur).",
    });
    if (responseTimeMs > 1500) {
      perfIssues.push({ severity: "warning", message: `Chargement initial ~${responseTimeMs} ms.` });
    }
  }

  // — Structure & navigation
  const structureIssues: AuditIssue[] = [];
  if (snapshot.internalLinkCount < 3) {
    structureIssues.push({ severity: "warning", message: "Peu de liens internes sur la home — maillage faible." });
  } else {
    structureIssues.push({ severity: "ok", message: `${snapshot.internalLinkCount} liens internes sur la home.` });
  }
  if (snapshot.h2Count === 0) {
    structureIssues.push({ severity: "warning", message: "Aucun H2 sur la home — structure de contenu plate." });
  } else {
    structureIssues.push({ severity: "ok", message: `${snapshot.h2Count} sections H2 sur la home.` });
  }
  structureIssues.push(...multiPageStructureIssues(pages));

  // — Contenu & mots-clés
  const contentIssues: AuditIssue[] = [];
  if (snapshot.wordCount < 150) {
    contentIssues.push({ severity: "critical", message: "Contenu home insuffisant pour convaincre et ranker." });
  } else if (snapshot.wordCount < 350) {
    contentIssues.push({ severity: "warning", message: `${snapshot.wordCount} mots sur la home — contenu minimal.` });
  } else {
    contentIssues.push({ severity: "ok", message: `${snapshot.wordCount} mots de contenu sur la home.` });
  }
  if (keywords.length) {
    contentIssues.push({
      severity: "ok",
      message: `Termes dominants : ${keywords.slice(0, 5).join(", ")}.`,
    });
  } else {
    contentIssues.push({ severity: "warning", message: "Peu de mots-clés identifiables dans title/H1." });
  }
  if (!snapshot.ogTitle && !snapshot.ogDescription) {
    contentIssues.push({ severity: "info", message: "Open Graph absent — partage réseaux sociaux limité." });
  } else if (!snapshot.ogImage) {
    contentIssues.push({ severity: "info", message: "Image Open Graph absente — aperçu social moins attractif." });
  }

  // — Conversion & contact
  const conversionIssues: AuditIssue[] = [];
  const contactChannels = [
    snapshot.hasForm && "formulaire",
    snapshot.hasTelLink && "téléphone",
    snapshot.hasMailLink && "email",
    snapshot.hasWhatsAppLink && "WhatsApp",
  ].filter(Boolean);
  if (contactChannels.length === 0) {
    conversionIssues.push({
      severity: "critical",
      message: "Aucun canal de contact visible sur la home (form, tel, email, WhatsApp).",
    });
  } else {
    conversionIssues.push({
      severity: "ok",
      message: `Canaux contact home : ${contactChannels.join(", ")}.`,
    });
  }
  const contactPage = pages.find((p) => /contact/i.test(p.path));
  if (contactPage && !contactPage.hasH1) {
    conversionIssues.push({
      severity: "warning",
      message: "Page contact sans H1 — opportunité manquée pour le SEO local.",
    });
  }
  if (snapshot.ctaKeywordHits < 2) {
    conversionIssues.push({
      severity: "warning",
      message: "Peu d'appels à l'action explicites (devis, contact, RDV…).",
    });
  } else {
    conversionIssues.push({
      severity: "ok",
      message: `${snapshot.ctaKeywordHits} mentions de conversion sur la home.`,
    });
  }

  // — Accessibilité
  const accessibilityIssues: AuditIssue[] = [];
  if (!snapshot.lang) {
    accessibilityIssues.push({ severity: "warning", message: "Attribut lang absent sur <html>." });
  } else {
    accessibilityIssues.push({ severity: "ok", message: `Langue déclarée : ${snapshot.lang}.` });
  }
  if (snapshot.imgTotal > 0 && snapshot.imgWithoutAlt / snapshot.imgTotal > 0.3) {
    accessibilityIssues.push({
      severity: "warning",
      message: `${snapshot.imgWithoutAlt}/${snapshot.imgTotal} images sans attribut alt (home).`,
    });
  } else if (snapshot.imgTotal > 0) {
    accessibilityIssues.push({ severity: "ok", message: "Images home majoritairement avec attribut alt." });
  }
  if (snapshot.inputTotal > 0 && snapshot.inputWithoutLabel > 0) {
    accessibilityIssues.push({
      severity: "warning",
      message: `${snapshot.inputWithoutLabel} champ(s) sans label ni aria-label.`,
    });
  }

  // — Confiance, local & RGPD
  const trustIssues: AuditIssue[] = [];
  if (!snapshot.hasLegalLink) {
    trustIssues.push({ severity: "warning", message: "Lien mentions légales non détecté." });
  } else {
    trustIssues.push({ severity: "ok", message: "Mentions légales référencées." });
  }
  if (!snapshot.hasPrivacyLink) {
    trustIssues.push({ severity: "warning", message: "Politique de confidentialité non détectée." });
  } else {
    trustIssues.push({ severity: "ok", message: "Politique de confidentialité référencée." });
  }
  if (!snapshot.hasCookieBanner) {
    trustIssues.push({
      severity: "info",
      message: "Bandeau cookies non détecté — vérifiez la conformité RGPD.",
    });
  } else {
    trustIssues.push({ severity: "ok", message: "Solution cookies / consentement détectée." });
  }
  if (snapshot.hasLocalBusinessSchema) {
    trustIssues.push({ severity: "ok", message: "Schema LocalBusiness / activité locale présent." });
  } else {
    trustIssues.push({
      severity: "info",
      message: "Pas de Schema local — opportunité pour Google Maps et fiches établissement.",
    });
  }

  // — Popularité
  const popularityIssues: AuditIssue[] = [
    {
      severity: "info",
      message:
        "Backlinks : analyse approfondie non incluse dans le scan auto. Vérifiez Google Business Profile et vos profils locaux.",
    },
  ];
  if (snapshot.externalLinkCount > 0) {
    popularityIssues.push({
      severity: "ok",
      message: `${snapshot.externalLinkCount} liens externes depuis la home.`,
    });
  }

  // — Concurrents
  const competitorIssues: AuditIssue[] = [];
  if (competitors.length === 0) {
    competitorIssues.push({
      severity: "info",
      message: "Aucun concurrent fourni — ajoutez 2–3 URLs pour une comparaison.",
    });
  } else {
    for (const c of competitors) {
      if (!c || !c.ok) {
        competitorIssues.push({ severity: "warning", message: `Concurrent inaccessible : ${c?.url ?? "?"}` });
        continue;
      }
      competitorIssues.push({
        severity: "info",
        message: `${c.url} — ${c.wordCount} mots, meta ${c.hasMeta ? "OK" : "absente"}.`,
      });
      if (c.wordCount > snapshot.wordCount + 100) {
        competitorIssues.push({
          severity: "warning",
          message: `${c.url} a plus de contenu visible que votre home.`,
        });
      }
    }
  }

  // — Indexation, robots & visibilité IA
  const discoverabilityIssues: AuditIssue[] = [];
  if (robotsRes.ok) {
    discoverabilityIssues.push({ severity: "ok", message: "robots.txt accessible." });
    if (/disallow:\s*\/\s*$/im.test(robotsRes.text)) {
      discoverabilityIssues.push({ severity: "critical", message: "robots.txt bloque tout le site (Disallow: /)." });
    }
  } else {
    discoverabilityIssues.push({ severity: "warning", message: "robots.txt introuvable ou inaccessible." });
  }
  if (hasSitemap) {
    discoverabilityIssues.push({ severity: "ok", message: "Sitemap XML détecté." });
  } else {
    discoverabilityIssues.push({ severity: "warning", message: "Sitemap XML non trouvé à l'emplacement standard." });
  }
  if (snapshot.hasNoindex) {
    discoverabilityIssues.push({ severity: "critical", message: "Meta robots noindex sur la home — page non indexée." });
  }
  if (llmsRes.ok && llmsRes.text.length > 20) {
    discoverabilityIssues.push({ severity: "ok", message: "Fichier llms.txt détecté — bon pour la visibilité IA." });
  } else {
    discoverabilityIssues.push({ severity: "warning", message: "Pas de llms.txt — les LLM indexent moins bien votre site." });
  }
  if (snapshot.hasFaqSchema) {
    discoverabilityIssues.push({ severity: "ok", message: "FAQ structurée (Schema FAQPage) détectée." });
  } else {
    discoverabilityIssues.push({ severity: "info", message: "Pas de FAQ Schema — opportunité pour citations IA." });
  }

  const complianceIssues = [...accessibilityIssues, ...trustIssues];

  const techHighlights = pagespeed
    ? [`Perf. mobile ${pagespeed.performance}/100`, `SEO Lighthouse ${pagespeed.seo}/100`]
    : [];

  const pillars: AuditPillarResult[] = [
    pillar("technical", [...technicalIssues, ...perfIssues], techHighlights),
    pillar("seo", [...seoIssues, ...contentIssues], keywords.slice(0, 6)),
    pillar("structure", structureIssues, []),
    pillar("conversion", conversionIssues, []),
    pillar("compliance", complianceIssues, []),
    pillar("popularity", popularityIssues, []),
    pillar("competitors", competitorIssues, []),
    pillar("discoverability", discoverabilityIssues, []),
    pillar("actionPlan", [], []),
  ];

  const p0: string[] = [];
  const p1: string[] = [];
  const p2: string[] = [];

  for (const pl of pillars) {
    if (pl.id === "actionPlan") continue;
    for (const issue of pl.issues) {
      if (issue.severity === "critical") p0.push(issue.message);
      else if (issue.severity === "warning") p1.push(issue.message);
      else if (issue.severity === "info" && pl.score < 70) p2.push(issue.message);
    }
  }

  if (p0.length === 0 && p1.length === 0) {
    p2.push("Site globalement sain — optimisations fines SEO et contenu recommandées.");
  }

  pillars[pillars.length - 1] = pillar(
    "actionPlan",
    [{ severity: p0.length ? "critical" : "ok", message: `${p0.length} urgent(s), ${p1.length} important(s).` }],
    p0.slice(0, 3)
  );

  const overallScore = Math.round(
    pillars.filter((p) => p.id !== "actionPlan").reduce((a, p) => a + p.score, 0) / (pillars.length - 1)
  );

  return {
    url: origin,
    auditedAt: new Date().toISOString(),
    overallScore,
    pillars,
    actionPlan: { p0, p1, p2 },
    meta: {
      pagespeedAvailable: !!pagespeed,
      responseTimeMs,
      statusCode: home.status,
      pagesCrawled: pages.length,
      crawlSource,
      pages,
    },
  };
}
