import { WHATSAPP_NUMBER } from "@/data/contact";

/** URL canonique et identifiant Schema.org de l'agence. */
export const PHANTOMDEV_SITE_URL = "https://phantomdev.fr";

/** Identifiant Schema.org du site (WebSite). */
export const WEBSITE_ID = `${PHANTOMDEV_SITE_URL}/#website`;

const LOGO_URL = `${PHANTOMDEV_SITE_URL}/images/phantom-logo.png`;

/** Numéro E.164 pour schema.org (ex. +33669040754). */
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
    logo: LOGO_URL,
    description:
      "PhantomDev conçoit des sites web premium et applications sur-mesure (Next.js, React) en Île-de-France et à l'international : vitrines, e-commerce, SaaS, SEO et performance Lighthouse 90+.",
    slogan: "Sites web sur-mesure qui convertissent",
    serviceType: [
      "Création de site web",
      "Développement e-commerce",
      "Application web sur-mesure",
      "Référencement naturel (SEO)",
      "Maintenance de site web",
    ],
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
      { "@type": "City", name: "Ivry-sur-Seine" },
      { "@type": "City", name: "Paris" },
      { "@type": "AdministrativeArea", name: "Île-de-France" },
      { "@type": "Country", name: "France" },
      { "@type": "Place", name: "Europe" },
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
      "PhantomDev — création de sites web premium, e-commerce et applications Next.js. Devis gratuit sous 24h. Paris, Île-de-France, international.",
    publisher: { "@id": PHANTOMDEV_SITE_URL },
    inLanguage: ["fr-FR", "en-GB", "en-US"],
    potentialAction: {
      "@type": "CommunicateAction",
      target: `${PHANTOMDEV_SITE_URL}/contact`,
      name: "Demander un devis",
    },
  };
}
