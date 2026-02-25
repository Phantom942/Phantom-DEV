import type { MetadataRoute } from "next";
import { getHreflangAlternates } from "@/lib/hreflang";

export const dynamic = "force-static";

const BASE = "https://phantomdev.fr";

function makeEntry(path: string, priority: number): MetadataRoute.Sitemap[number] {
  const url = path === "/" ? BASE : `${BASE}${path}`;
  return {
    url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority,
    alternates: {
      languages: getHreflangAlternates(path),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const frPaths = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/mentions-legales", priority: 0.3 },
  ];
  const enPaths = [
    { path: "/en-gb", priority: 0.9 },
    { path: "/en-gb/services", priority: 0.8 },
    { path: "/en-gb/contact", priority: 0.9 },
    { path: "/en-gb/mentions-legales", priority: 0.2 },
    { path: "/en-us", priority: 0.9 },
    { path: "/en-us/services", priority: 0.8 },
    { path: "/en-us/contact", priority: 0.9 },
    { path: "/en-us/mentions-legales", priority: 0.2 },
  ];
  return [...frPaths, ...enPaths].map(({ path, priority }) =>
    makeEntry(path, priority)
  );
}
