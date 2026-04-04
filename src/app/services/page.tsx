import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ServicesPageContent } from "@/components/ServicesPageContent";

import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Services — Sites vitrines, e-commerce, SaaS | PhantomDev";
const description =
  "Création de sites web sur-mesure : vitrines premium, e-commerce, applications et maintenance. Devis gratuit sous 48h. France, Europe, international.";
const ogTitle = "Services | PhantomDev — Développement web sur-mesure";
const ogDesc =
  "Offres PhantomDev : conception web, e-commerce, SaaS, intégration IA, maintenance. Devis clair sous 48h.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/services",
    languages: getHreflangAlternates("/services"),
  },
  title,
  description,
  keywords: [
    "création site web",
    "développement web sur-mesure",
    "site vitrine",
    "e-commerce",
    "SaaS",
    "SEO",
    "référencement naturel",
    "intégration IA",
    "Next.js",
    "PhantomDev",
  ],
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDesc,
    url: "https://phantomdev.fr/services",
    siteName: "PhantomDev",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, ogDesc),
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/services", "Services");

  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Page services PhantomDev : développement web, React, Node.js, SaaS, SEO, sites vitrines et e-commerce"
      >
        <ServicesPageContent />
      </main>
      <Footer />
    </div>
  );
}
