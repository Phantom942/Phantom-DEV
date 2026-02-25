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
