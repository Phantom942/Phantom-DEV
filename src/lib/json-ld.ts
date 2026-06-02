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
      "PhantomDev accompagne TPE, PME, artisans et garages : sites vitrines, e-commerce, prise de rendez-vous en ligne, visibilité Google, automatisation et IA. Plus de clients, moins de paperasse.",
    slogan: "Plus de clients. Moins de paperasse. Moins de tâches répétitives.",
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
      { "@type": "Place", name: "Worldwide" },
      { "@type": "Place", name: "Europe" },
      { "@type": "Country", name: "France" },
    ],
    knowsAbout: [
      "Création de site web",
      "Site vitrine professionnel",
      "Site web artisan",
      "Site web garage automobile",
      "Automatisation garage",
      "Gain de temps artisan",
      "CRM PME local",
      "Prise de rendez-vous en ligne",
      "Référencement local",
      "Visibilité Google entreprise",
      "Boutique en ligne sur-mesure",
      "Automatisation PME",
      "Intelligence artificielle entreprise",
      "Maintenance de site web",
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
      "PhantomDev — sites web et outils digitaux pour TPE et PME : vitrines, e-commerce, réservation en ligne, automatisation. Devis gratuit sous 24h.",
    publisher: { "@id": PHANTOMDEV_SITE_URL },
    inLanguage: ["fr-FR", "en-GB", "en-US"],
    potentialAction: {
      "@type": "CommunicateAction",
      target: `${PHANTOMDEV_SITE_URL}/contact`,
      name: "Demander un devis",
    },
  };
}
