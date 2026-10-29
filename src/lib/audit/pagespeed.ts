export type PageSpeedScores = {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
  lcpMs: number | null;
  cls: number | null;
  tbtMs: number | null;
};

export async function fetchPageSpeed(url: string): Promise<PageSpeedScores | null> {
  const key = process.env.GOOGLE_PAGESPEED_API_KEY;
  if (!key) return null;

  const apiUrl = new URL("https://www.googleapis.com/pagespeedonline/v5/runPagespeed");
  apiUrl.searchParams.set("url", url);
  apiUrl.searchParams.set("key", key);
  apiUrl.searchParams.set("strategy", "mobile");
  apiUrl.searchParams.append("category", "performance");
  apiUrl.searchParams.append("category", "seo");
  apiUrl.searchParams.append("category", "accessibility");
  apiUrl.searchParams.append("category", "best-practices");

  try {
    const res = await fetch(apiUrl.toString(), { cache: "no-store" });
    if (!res.ok) return null;
    const data = await res.json();
    const cats = data?.lighthouseResult?.categories ?? {};
    const audits = data?.lighthouseResult?.audits ?? {};
    return {
      performance: Math.round((cats.performance?.score ?? 0) * 100),
      seo: Math.round((cats.seo?.score ?? 0) * 100),
      accessibility: Math.round((cats.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((cats["best-practices"]?.score ?? 0) * 100),
      lcpMs: audits["largest-contentful-paint"]?.numericValue ?? null,
      cls: audits["cumulative-layout-shift"]?.numericValue ?? null,
      tbtMs: audits["total-blocking-time"]?.numericValue ?? null,
    };
  } catch {
    return null;
  }
}
