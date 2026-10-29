import type { Locale } from "@/i18n";

export type WhatsAppProjectType =
  | "vitrine"
  | "application"
  | "seo"
  | "maintenance"
  | "autre";

const MESSAGES: Record<Locale, Record<WhatsAppProjectType | "default", string>> = {
  fr: {
    default:
      "Bonjour NADER ASSEL DEV WEB, je souhaite des informations pour un projet web sur-mesure.",
    vitrine:
      "Bonjour NADER ASSEL DEV WEB, je souhaite un devis pour un site vitrine / landing page premium.",
    application:
      "Bonjour NADER ASSEL DEV WEB, je souhaite un devis pour une application ou un e-commerce sur-mesure.",
    seo: "Bonjour NADER ASSEL DEV WEB, je souhaite un devis pour un accompagnement SEO / visibilité.",
    maintenance:
      "Bonjour NADER ASSEL DEV WEB, je souhaite un devis pour la maintenance de mon site.",
    autre:
      "Bonjour NADER ASSEL DEV WEB, je souhaite un devis (intégration IA, API ou conseil technique).",
  },
  "en-GB": {
    default:
      "Hello NADER ASSEL DEV WEB, I'd like information about a bespoke web project.",
    vitrine:
      "Hello NADER ASSEL DEV WEB, I'd like a quote for a premium showcase / landing page.",
    application:
      "Hello NADER ASSEL DEV WEB, I'd like a quote for a custom app or e-commerce build.",
    seo: "Hello NADER ASSEL DEV WEB, I'd like a quote for SEO / visibility support.",
    maintenance:
      "Hello NADER ASSEL DEV WEB, I'd like a quote for website maintenance.",
    autre:
      "Hello NADER ASSEL DEV WEB, I'd like a quote (AI integration, APIs or technical consulting).",
  },
  "en-US": {
    default:
      "Hello NADER ASSEL DEV WEB, I'd like information about a custom web project.",
    vitrine:
      "Hello NADER ASSEL DEV WEB, I'd like a quote for a premium showcase / landing page.",
    application:
      "Hello NADER ASSEL DEV WEB, I'd like a quote for a custom app or e-commerce build.",
    seo: "Hello NADER ASSEL DEV WEB, I'd like a quote for SEO / visibility support.",
    maintenance:
      "Hello NADER ASSEL DEV WEB, I'd like a quote for website maintenance.",
    autre:
      "Hello NADER ASSEL DEV WEB, I'd like a quote (AI integration, APIs or technical consulting).",
  },
};

export function normalizeWhatsAppProjectType(
  raw: string | null | undefined
): WhatsAppProjectType | null {
  if (!raw) return null;
  const t = raw.toLowerCase().trim();
  if (
    t === "vitrine" ||
    t === "application" ||
    t === "seo" ||
    t === "maintenance" ||
    t === "autre"
  ) {
    return t;
  }
  return null;
}

export function getWhatsAppMessage(
  locale: Locale,
  projectType?: string | null
): string {
  const normalized = normalizeWhatsAppProjectType(projectType);
  const pack = MESSAGES[locale];
  if (normalized && pack[normalized]) return pack[normalized];
  return pack.default;
}
