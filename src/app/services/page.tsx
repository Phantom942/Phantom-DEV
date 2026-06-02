import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ServicesPageContent } from "@/components/ServicesPageContent";

import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { buildServicesItemListSchema } from "@/lib/services-jsonld";
import { buildWebPageSchema } from "@/lib/webpage-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Services — Sites web, e-commerce & automatisation PME";
const description =
  "Offres PhantomDev : site vitrine, boutique en ligne, prise de RDV, visibilité Google, automatisation et IA. Devis clair sous 24h pour TPE, PME et artisans.";
const ogTitle = "Services | PhantomDev — Site vitrine, RDV en ligne & automatisation PME";
const ogDesc =
  "Offres PhantomDev : site vitrine, boutique en ligne, prise de RDV, visibilité Google, automatisation garage et CRM PME. Devis clair sous 24h.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/services",
    languages: getHreflangAlternates("/services"),
  },
  title,
  description,
  keywords: [
    "site vitrine professionnel",
    "site web artisan",
    "site web garage",
    "automatisation garage",
    "gain de temps artisan",
    "CRM PME local",
    "prise de rendez-vous en ligne",
    "boutique en ligne",
    "visibilité Google entreprise",
    "automatisation PME",
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
  const servicesSchema = buildServicesItemListSchema("fr");
  const webPageSchema = buildWebPageSchema({
    path: "/services",
    name: title,
    description,
  });

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Page services PhantomDev : site vitrine, RDV en ligne, automatisation garage, CRM PME, visibilité Google"
      >
        <Suspense fallback={null}>
          <ServicesPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
