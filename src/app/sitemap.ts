import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://phantomdev.fr";
  const entries = [
    { url: base, priority: 1 },
    { url: `${base}/services`, priority: 0.9 },
    { url: `${base}/contact`, priority: 0.9 },
    { url: `${base}/mentions-legales`, priority: 0.3 },
  ];
  const enLocales = ["en-gb", "en-us"];
  const enEntries = enLocales.flatMap((locale) => [
    { url: `${base}/${locale}`, priority: 0.9 },
    { url: `${base}/${locale}/services`, priority: 0.8 },
    { url: `${base}/${locale}/mentions-legales`, priority: 0.2 },
  ]);
  return [
    ...entries.map((e) => ({
      ...e,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    })),
    ...enEntries.map((e) => ({
      ...e,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
    })),
  ];
}
