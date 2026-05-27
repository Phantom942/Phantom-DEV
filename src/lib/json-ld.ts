import { WHATSAPP_NUMBER } from "@/data/contact";

/** URL canonique et identifiant Schema.org de l'agence. */
export const PHANTOMDEV_SITE_URL = "https://phantomdev.fr";

const WEBSITE_ID = `${PHANTOMDEV_SITE_URL}/#website`;

/** Numéro E.164 pour schema.org (ex. +33746325035). */
function getSchemaTelephone(): string {
  const d = WHATSAPP_NUMBER;
  return d.startsWith("+") ? d : `+${d}`;
}

/**
 * Schéma ProfessionalService — SEO classique + signaux structurés pour indexation IA (GEO/LLM).
 * @see https://schema.org/ProfessionalService
 */
export function buildProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": PHANTOMDEV_SITE_URL,
    name: "PhantomDev",
    url: PHANTOMDEV_SITE_URL,
    image: `${PHANTOMDEV_SITE_URL}/og-image.png`,
    description:
      "PhantomDev est une agence de création de sites web premium et d'applications sur-mesure basée en Île-de-France, spécialisée dans les architectures Next.js ultra-performantes.",
    priceRange: "$$$",
    telephone: getSchemaTelephone(),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ivry-sur-Seine",
      addressRegion: "Île-de-France",
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.812,
      longitude: 2.395,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Ivry-sur-Seine",
      },
      {
        "@type": "AdministrativeArea",
        name: "Île-de-France",
      },
      {
        "@type": "Country",
        name: "France",
      },
    ],
    knowsAbout: [
      "Web Development",
      "Next.js",
      "React",
      "TypeScript",
      "Search Engine Optimization",
      "E-commerce Development",
      "SaaS",
      "Progressive Web Apps",
      "Artificial Intelligence Integration",
      "API Integration",
      "Website Maintenance",
      "Core Web Vitals",
      "GrapheneOS Installation",
    ],
    sameAs: ["https://github.com/Phantom942"],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: getSchemaTelephone(),
      availableLanguage: ["French", "English"],
      areaServed: "FR",
      url: `${PHANTOMDEV_SITE_URL}/contact`,
    },
  };
}

/** Schéma WebSite — relie le site à l'entité ProfessionalService pour les moteurs. */
export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: PHANTOMDEV_SITE_URL,
    name: "PhantomDev",
    description:
      "PhantomDev est une agence de création de sites web premium et d'applications sur-mesure basée en Île-de-France, spécialisée dans les architectures Next.js ultra-performantes.",
    publisher: { "@id": PHANTOMDEV_SITE_URL },
    inLanguage: ["fr", "en"],
  };
}
