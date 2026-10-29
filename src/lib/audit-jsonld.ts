import { AUDIT_PRICE_EUR } from "@/data/audit";

const BASE = "https://phantomdev.fr";

export function buildAuditServiceSchema(locale: "fr" | "en" = "fr") {
  const isFr = locale === "fr";
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: isFr ? "Diagnostic site web" : "Website audit",
    description: isFr
      ? "Audit complet de site internet : technique, SEO Google, performance, contenu, concurrence, visibilité IA et plan d'action priorisé."
      : "Full website audit: technical health, Google SEO, performance, content, competitors, AI visibility and prioritized action plan.",
    provider: {
      "@type": "Organization",
      name: "PhantomDev",
      url: BASE,
    },
    areaServed: isFr ? "FR" : "Worldwide",
    offers: {
      "@type": "Offer",
      price: String(AUDIT_PRICE_EUR),
      priceCurrency: "EUR",
      url: `${BASE}/audit`,
      availability: "https://schema.org/InStock",
    },
  };
}
