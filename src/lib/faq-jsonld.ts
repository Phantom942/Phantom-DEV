import { translations } from "@/data/translations";
import type { Locale } from "@/i18n";

/** FAQPage aligné sur le contenu visible (même langue que la page d’accueil). */
export function buildFaqPageJsonLd(locale: Locale) {
  const items = translations[locale].faq.items;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
