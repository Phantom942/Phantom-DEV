import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = "https://phantomdev.fr";

function getAlternates(path: string) {
  const frPath = path === "/" ? "" : path;
  return {
    languages: {
      "fr": `${BASE}${frPath || "/"}`,
      "en-GB": `${BASE}/en-gb${frPath || ""}`,
      "en-US": `${BASE}/en-us${frPath || ""}`,
      "x-default": `${BASE}${frPath || "/"}`,
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      alternates: getAlternates("/"),
    },
    {
      url: `${BASE}/services`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: getAlternates("/services"),
    },
    {
      url: `${BASE}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: getAlternates("/contact"),
    },
    {
      url: `${BASE}/mentions-legales`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
      alternates: getAlternates("/mentions-legales"),
    },
  ];
  const enLocales = ["en-gb", "en-us"] as const;
  const enPaths = ["", "/services", "/contact", "/mentions-legales"] as const;
  const enEntries: MetadataRoute.Sitemap = enLocales.flatMap((locale) =>
    enPaths.map((path) => {
      const fullPath = path ? `/${locale}${path}` : `/${locale}`;
      const url = `${BASE}${fullPath}`;
      const changeFreq = path === "/mentions-legales" ? "yearly" : path === "" || path === "/services" ? "weekly" : "monthly";
      const priority = path === "/mentions-legales" ? 0.2 : path === "" ? 0.9 : 0.8;
      return {
        url,
        lastModified: now,
        changeFrequency: changeFreq as "weekly" | "monthly" | "yearly",
        priority,
        alternates: getAlternates(path || "/"),
      };
    })
  );
  return [...entries, ...enEntries];
}
