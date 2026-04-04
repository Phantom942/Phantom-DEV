const BASE = "https://phantomdev.fr";

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function getBreadcrumbForPath(path: string, label: string) {
  const items = [
    { name: "PhantomDev", url: BASE },
    { name: label, url: `${BASE}${path}` },
  ];
  return getBreadcrumbSchema(items);
}

/** Fil d’Ariane à partir de la home PhantomDev + segments (ex. GrapheneOS, mentions). */
export function getBreadcrumbTrail(
  segments: readonly { path: string; label: string }[]
) {
  const items = [
    { name: "PhantomDev", url: BASE },
    ...segments.map((s) => ({ name: s.label, url: `${BASE}${s.path}` })),
  ];
  return getBreadcrumbSchema(items);
}
