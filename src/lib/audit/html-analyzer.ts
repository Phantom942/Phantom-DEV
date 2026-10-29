const TAG = (html: string, name: string) => {
  const re = new RegExp(`<${name}[^>]*>([\\s\\S]*?)<\\/${name}>`, "i");
  const m = html.match(re);
  return m ? stripTags(m[1]).trim() : "";
};

const META = (html: string, attr: "name" | "property", key: string) => {
  const re = new RegExp(
    `<meta[^>]+${attr}=["']${key}["'][^>]+content=["']([^"']*)["']`,
    "i"
  );
  const m = html.match(re);
  if (m) return m[1].trim();
  const re2 = new RegExp(
    `<meta[^>]+content=["']([^"']*)["'][^>]+${attr}=["']${key}["']`,
    "i"
  );
  return re2.exec(html)?.[1]?.trim() ?? "";
};

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

export type HtmlSnapshot = {
  title: string;
  metaDescription: string;
  h1: string[];
  h2Count: number;
  canonical: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: boolean;
  lang: string;
  hasViewport: boolean;
  hasNoindex: boolean;
  wordCount: number;
  hasTelLink: boolean;
  hasMailLink: boolean;
  hasWhatsAppLink: boolean;
  hasForm: boolean;
  ctaKeywordHits: number;
  internalLinkCount: number;
  externalLinkCount: number;
  jsonLdCount: number;
  hasFaqSchema: boolean;
  hasLocalBusinessSchema: boolean;
  hasLegalLink: boolean;
  hasPrivacyLink: boolean;
  hasCookieBanner: boolean;
  imgWithoutAlt: number;
  imgTotal: number;
  inputWithoutLabel: number;
  inputTotal: number;
};

export function analyzeHtml(html: string, origin: string): HtmlSnapshot {
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) =>
    stripTags(m[1]).trim()
  );
  const h2Count = (html.match(/<h2[\s>]/gi) ?? []).length;
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  const langMatch = html.match(/<html[^>]+lang=["']([^"']+)["']/i);
  const viewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const noindex = /<meta[^>]+name=["']robots["'][^>]+content=["'][^"']*noindex/i.test(html);

  const text = stripTags(
    html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "")
  );
  const words = text.split(/\s+/).filter((w) => w.length > 2);

  const originHost = new URL(origin).hostname;
  let internal = 0;
  let external = 0;
  for (const m of html.matchAll(/<a[^>]+href=["']([^"']+)["']/gi)) {
    try {
      const href = m[1];
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const u = new URL(href, origin);
      if (u.hostname === originHost) internal++;
      else external++;
    } catch {
      /* skip */
    }
  }

  const jsonLdBlocks =
    html.match(/<script[^>]+type=["']application\/ld\+json["'][^>]*>[\s\S]*?<\/script>/gi) ?? [];
  const jsonLdRaw = jsonLdBlocks.join(" ");
  const hasFaq = /FAQPage/i.test(jsonLdRaw);
  const hasLocal = /LocalBusiness|ProfessionalService|Store/i.test(jsonLdRaw);

  const imgTags = html.match(/<img[^>]*>/gi) ?? [];
  let imgWithoutAlt = 0;
  for (const img of imgTags) {
    if (!/\balt=["'][^"']+["']/i.test(img)) imgWithoutAlt++;
  }

  const inputTags = html.match(/<input[^>]*>/gi) ?? [];
  let inputWithoutLabel = 0;
  for (const input of inputTags) {
    const hasAria = /\baria-label=["'][^"']+["']/i.test(input);
    const hasId = /\bid=["']([^"']+)["']/i.exec(input);
    const hasLabel = hasId ? new RegExp(`for=["']${hasId[1]}["']`, "i").test(html) : false;
    if (!hasAria && !hasLabel) inputWithoutLabel++;
  }

  const ctaPattern =
    /(devis|contact|rendez-vous|rdv|réserver|reserver|appeler|whatsapp|demander|prendre contact)/gi;
  const ctaKeywordHits = (text.match(ctaPattern) ?? []).length;

  const legalPattern =
    /(mentions[- ]legales|mentions-legales|legal|cgv|cgu|conditions generales)/i;
  const privacyPattern =
    /(politique[- ]de[- ]confidentialite|privacy|confidentialite|rgpd|donnees personnelles)/i;
  const hasLegalLink = [...html.matchAll(/href=["']([^"']+)["']/gi)].some((m) =>
    legalPattern.test(m[1])
  );
  const hasPrivacyLink = [...html.matchAll(/href=["']([^"']+)["']/gi)].some((m) =>
    privacyPattern.test(m[1])
  );

  const cookiePattern =
    /(cookiebot|tarteaucitron|didomi|axeptio|onetrust|cookie-consent|cookies? banner|gdpr)/i;
  const hasCookieBanner = cookiePattern.test(html);

  return {
    title: TAG(html, "title"),
    metaDescription: META(html, "name", "description"),
    h1: h1Matches.filter(Boolean),
    h2Count,
    canonical: canonicalMatch?.[1] ?? "",
    ogTitle: META(html, "property", "og:title"),
    ogDescription: META(html, "property", "og:description"),
    ogImage: !!META(html, "property", "og:image") || /property=["']og:image["']/i.test(html),
    lang: langMatch?.[1] ?? "",
    hasViewport: viewport,
    hasNoindex: noindex,
    wordCount: words.length,
    hasTelLink: /href=["']tel:/i.test(html),
    hasMailLink: /href=["']mailto:/i.test(html),
    hasWhatsAppLink: /(wa\.me|whatsapp\.com|api\.whatsapp)/i.test(html),
    hasForm: /<form[\s>]/i.test(html),
    ctaKeywordHits,
    internalLinkCount: internal,
    externalLinkCount: external,
    jsonLdCount: jsonLdBlocks.length,
    hasFaqSchema: hasFaq,
    hasLocalBusinessSchema: hasLocal,
    hasLegalLink,
    hasPrivacyLink,
    hasCookieBanner,
    imgWithoutAlt,
    imgTotal: imgTags.length,
    inputWithoutLabel,
    inputTotal: inputTags.length,
  };
}

export type FetchTextResult = {
  ok: boolean;
  text: string;
  status: number;
  headers: Headers;
};

export async function fetchText(url: string, timeoutMs = 12000): Promise<FetchTextResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "PhantomDev-AuditBot/1.0 (+https://phantomdev.fr/audit)",
        Accept: "text/html,text/plain,application/xml,*/*",
      },
      redirect: "follow",
    });
    const text = await res.text();
    return { ok: res.ok, text, status: res.status, headers: res.headers };
  } finally {
    clearTimeout(timer);
  }
}
