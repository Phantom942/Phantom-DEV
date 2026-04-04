import type { Metadata } from "next";
import type { Locale } from "@/i18n";
import { translations } from "@/data/translations";
import { getHreflangAlternates } from "@/lib/hreflang";
import {
  SITE_URL,
  grapheneOpenGraphImageBase,
  twitterSummaryLarge,
} from "@/lib/social-metadata";

const PATH_BY_LOCALE: Record<Locale, string> = {
  fr: "/grapheneos",
  "en-GB": "/en-gb/grapheneos",
  "en-US": "/en-us/grapheneos",
};

const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  "en-GB": "en_GB",
  "en-US": "en_US",
};

export function getGraphenePageMetadata(locale: Locale): Metadata {
  const path = PATH_BY_LOCALE[locale];
  const canonical = `${SITE_URL}${path}`;
  const g = translations[locale].graphenePage;
  const { seo } = g;
  const ogImageUrl = `${SITE_URL}${grapheneOpenGraphImageBase.url}`;

  return {
    alternates: {
      canonical,
      languages: getHreflangAlternates(path),
    },
    title: seo.documentTitle,
    description: seo.description,
    keywords: [...seo.keywords],
    authors: [{ name: "PhantomDev", url: SITE_URL }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      title: seo.ogTitle,
      description: seo.ogDescription,
      url: canonical,
      siteName: "PhantomDev",
      locale: OG_LOCALE[locale],
      images: [
        {
          ...grapheneOpenGraphImageBase,
          alt: seo.ogImageAlt,
        },
      ],
    },
    twitter: twitterSummaryLarge(seo.ogTitle, seo.ogDescription, ogImageUrl),
  };
}
