import type { Locale } from "@/i18n";
import { translations } from "@/data/translations";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { SITE_URL, grapheneOpenGraphImageBase } from "@/lib/social-metadata";

const PATH_BY_LOCALE: Record<Locale, string> = {
  fr: "/grapheneos",
  "en-GB": "/en-gb/grapheneos",
  "en-US": "/en-us/grapheneos",
};

const IN_LANGUAGE: Record<Locale, string> = {
  fr: "fr-FR",
  "en-GB": "en-GB",
  "en-US": "en-US",
};

export function GraphenePageJsonLd({ locale }: { locale: Locale }) {
  const path = PATH_BY_LOCALE[locale];
  const canonical = `${SITE_URL}${path}`;
  const g = translations[locale].graphenePage;
  const logoUrl = `${SITE_URL}${grapheneOpenGraphImageBase.url}`;
  const breadcrumb = getBreadcrumbForPath(path, "GrapheneOS") as {
    itemListElement: object[];
  };

  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const graph: object[] = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "PhantomDev",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.svg`,
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: SITE_URL,
      name: "PhantomDev",
      publisher: { "@id": organizationId },
      inLanguage: [IN_LANGUAGE[locale], "fr-FR", "en-GB", "en-US"],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonical}#breadcrumb`,
      itemListElement: breadcrumb.itemListElement,
    },
    {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: g.seo.documentTitle,
      description: g.seo.description,
      inLanguage: IN_LANGUAGE[locale],
      isPartOf: { "@id": websiteId },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: logoUrl,
        contentUrl: logoUrl,
        width: grapheneOpenGraphImageBase.width,
        height: grapheneOpenGraphImageBase.height,
        caption: g.seo.ogImageAlt,
      },
      about: {
        "@type": "SoftwareApplication",
        name: "GrapheneOS",
        applicationCategory: "MobileApplication",
        operatingSystem: "Android Open Source Project",
        url: "https://grapheneos.org/",
      },
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["#graphene-main-heading", "#graphene-lead"],
      },
    },
    {
      "@type": "Service",
      "@id": `${canonical}#service`,
      name: g.title,
      description: g.seo.description,
      url: canonical,
      serviceType: "Mobile operating system installation support",
      provider: { "@id": organizationId },
      areaServed: {
        "@type": "Place",
        name: locale === "fr" ? "France" : locale === "en-GB" ? "United Kingdom" : "United States",
      },
      offers: {
        "@type": "Offer",
        url: canonical,
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${canonical}#faq`,
      mainEntity: g.faqSchema.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    },
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
