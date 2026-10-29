import { serviceConfigs } from "@/data/services";
import { translations } from "@/data/translations/index";
import type { Locale } from "@/i18n";
import { PHANTOMDEV_SITE_URL } from "@/lib/json-ld";

export function buildServicesItemListSchema(locale: Locale) {
  const sl = translations[locale].servicesList;
  const prefix =
    locale === "en-GB" ? "/en-gb" : locale === "en-US" ? "/en-us" : "";

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name:
      locale === "fr"
        ? "Services NADER DEV WEB — site vitrine, RDV en ligne, automatisation garage, CRM PME"
        : "NADER DEV WEB services — custom web development",
    url: `${PHANTOMDEV_SITE_URL}${prefix}/services`,
    numberOfItems: serviceConfigs.length,
    itemListElement: serviceConfigs.map((config, index) => {
      const copy = sl[config.id as keyof typeof sl] as { title: string; description: string };
      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Service",
          name: copy.title,
          description: copy.description,
          provider: {
            "@type": "ProfessionalService",
            name: "NADER DEV WEB",
            url: PHANTOMDEV_SITE_URL,
          },
          areaServed: "FR",
        },
      };
    }),
  };
}
