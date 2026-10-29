export function normalizeSiteUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (!url.hostname.includes(".")) return null;
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;
    return url.origin;
  } catch {
    return null;
  }
}

function is172PrivateRange(hostname: string): boolean {
  const match = hostname.match(/^172\.(\d+)\./);
  if (!match) return false;
  const second = Number.parseInt(match[1], 10);
  return second >= 16 && second <= 31;
}

export function isPrivateOrBlockedHost(hostname: string): boolean {
  const h = hostname.toLowerCase().replace(/^\[|\]$/g, "");

  if (h === "localhost" || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "127.0.0.1" || h === "0.0.0.0" || h === "::1") return true;
  if (h === "169.254.169.254" || h.startsWith("169.254.")) return true;
  if (h === "metadata.google.internal" || h === "metadata.goog") return true;
  if (h.startsWith("192.168.") || h.startsWith("10.") || is172PrivateRange(h)) return true;
  if (h.includes("phantomdev.fr")) return true;

  return false;
}

export function validateAuditTargetUrl(raw: string): boolean {
  const url = normalizeSiteUrl(raw);
  if (!url) return false;
  try {
    return !isPrivateOrBlockedHost(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function sanitizeCompetitorUrls(urls: string[], max = 3): string[] {
  const out: string[] = [];
  for (const raw of urls) {
    const url = normalizeSiteUrl(raw);
    if (!url) continue;
    try {
      if (isPrivateOrBlockedHost(new URL(url).hostname)) continue;
    } catch {
      continue;
    }
    if (!out.includes(url)) out.push(url);
    if (out.length >= max) break;
  }
  return out;
}

export function parseCompetitorsFromMetadata(raw: string | undefined | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return sanitizeCompetitorUrls(Array.isArray(parsed) ? parsed.map(String) : []);
  } catch {
    return [];
  }
}
