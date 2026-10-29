import { WHATSAPP_NUMBER } from "@/data/contact";
import { PHANTOMDEV_SITE_URL } from "@/lib/json-ld";

function schemaTelephone(): string {
  const d = WHATSAPP_NUMBER;
  return d.startsWith("+") ? d : `+${d}`;
}

export function buildContactPageSchema(locale: "fr" | "en-GB" | "en-US" = "fr") {
  const prefix =
    locale === "en-GB" ? "/en-gb" : locale === "en-US" ? "/en-us" : "";
  const url = `${PHANTOMDEV_SITE_URL}${prefix}/contact`;

  const name =
    locale === "fr"
      ? "Contact NADER DEV WEB — Devis site web gratuit sous 24h"
      : "Contact NADER DEV WEB — Free web project quote within 24h";
  const description =
    locale === "fr"
      ? "Demandez un devis gratuit pour votre site vitrine, e-commerce ou application. Réponse sous 24h via WhatsApp."
      : "Request a free quote for your showcase site, e-commerce or app. Reply within 24h via WhatsApp.";

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${url}#contactpage`,
    url,
    name,
    description,
    inLanguage: locale === "fr" ? "fr-FR" : locale === "en-GB" ? "en-GB" : "en-US",
    mainEntity: {
      "@type": "ProfessionalService",
      "@id": PHANTOMDEV_SITE_URL,
      name: "NADER DEV WEB",
      url: PHANTOMDEV_SITE_URL,
      telephone: schemaTelephone(),
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: schemaTelephone(),
        availableLanguage: ["French", "English"],
        areaServed: ["FR", "GB", "US", "EU"],
        url,
      },
    },
  };
}
