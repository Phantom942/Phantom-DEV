import type { Locale } from "@/i18n";
import { PHANTOMDEV_SITE_URL, WEBSITE_ID } from "@/lib/json-ld";

const ORG_ID = PHANTOMDEV_SITE_URL;

export function buildWebPageSchema(options: {
  path: string;
  name: string;
  description: string;
  locale?: Locale;
}) {
  const { path, name, description, locale = "fr" } = options;
  const url = `${PHANTOMDEV_SITE_URL}${path}`;
  const inLanguage =
    locale === "fr" ? "fr-FR" : locale === "en-GB" ? "en-GB" : "en-US";

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
