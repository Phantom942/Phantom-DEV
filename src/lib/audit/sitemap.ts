import { fetchText, type FetchTextResult } from "@/lib/audit/html-analyzer";

export const MAX_CRAWL_PAGES = 8;

const PRIORITY_PATH = /contact|service|about|a-propos|qui-sommes|tarif|devis|realisation|portfolio|blog/i;

export function extractUrlsFromSitemapXml(xml: string, origin: string): string[] {
  const originHost = new URL(origin).origin;
  const urls: string[] = [];

  for (const m of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/gi)) {
    try {
      const href = m[1].trim();
      const u = new URL(href);
      if (u.origin === originHost) {
        urls.push(normalizePageUrl(u.href));
      }
    } catch {
      /* skip invalid */
    }
  }

  return [...new Set(urls)];
}

export function normalizePageUrl(url: string): string {
  try {
    const u = new URL(url);
    u.hash = "";
    let path = u.pathname.replace(/\/+$/, "") || "/";
    return `${u.origin}${path}`;
  } catch {
    return url.replace(/\/+$/, "");
  }
}

export function pickCrawlUrls(origin: string, candidates: string[], maxPages = MAX_CRAWL_PAGES): string[] {
  const home = normalizePageUrl(origin);
  const others = candidates.filter((u) => normalizePageUrl(u) !== home);

  others.sort((a, b) => {
    const score = (url: string) => {
      try {
        return PRIORITY_PATH.test(new URL(url).pathname) ? 1 : 0;
      } catch {
        return 0;
      }
    };
    return score(b) - score(a) || a.localeCompare(b);
  });

  return [home, ...others.slice(0, Math.max(0, maxPages - 1))];
}

export function extractInternalPageUrls(html: string, origin: string, limit: number): string[] {
  const home = normalizePageUrl(origin);
  const originHost = new URL(origin).hostname;
  const found: string[] = [];

  for (const m of html.matchAll(/<a[^>]+href=["']([^"'#]+)["']/gi)) {
    try {
      const href = m[1].trim();
      if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;
      const u = new URL(href, origin);
      if (u.hostname !== originHost) continue;
      const normalized = normalizePageUrl(u.href);
      if (normalized === home) continue;
      if (!found.includes(normalized)) found.push(normalized);
      if (found.length >= limit) break;
    } catch {
      /* skip */
    }
  }

  return found;
}

export async function resolveSitemapPageUrls(
  origin: string,
  sitemapFetches: FetchTextResult[]
): Promise<string[]> {
  const collected: string[] = [];

  for (const res of sitemapFetches) {
    if (!res.ok || !res.text.includes("<")) continue;

    if (/<sitemapindex/i.test(res.text)) {
      const childSitemaps = extractUrlsFromSitemapXml(res.text, origin).slice(0, 3);
      const childResults = await Promise.all(
        childSitemaps.map((u) => fetchText(u, 8000).catch(() => null))
      );
      for (const child of childResults) {
        if (child?.ok) collected.push(...extractUrlsFromSitemapXml(child.text, origin));
      }
    } else {
      collected.push(...extractUrlsFromSitemapXml(res.text, origin));
    }
  }

  return [...new Set(collected)];
}
