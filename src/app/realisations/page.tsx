import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { RealisationsPageContent } from "@/components/RealisationsPageContent";
import { creativeWorkSchema } from "@/data/projects";
import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { buildWebPageSchema } from "@/lib/webpage-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Résultats clients — Sites web & RDV en ligne";
const description =
  "Études de cas NADER DEV WEB : garages, artisans et PME. Plus de rendez-vous, moins d'appels, plus de devis qualifiés grâce à des sites sur-mesure.";
const ogTitle = "Résultats clients | NADER DEV WEB — Garages, artisans, PME";
const ogDesc =
  "Études de cas NADER DEV WEB : plus de RDV, moins d'appels, plus de devis qualifiés. Garages, artisans et PME locales.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/realisations",
    languages: getHreflangAlternates("/realisations"),
  },
  title,
  description,
  keywords: [
    "résultats site web",
    "site web garage",
    "site web artisan",
    "prise de rendez-vous en ligne",
    "automatisation garage",
    "études de cas PME",
    "NADER DEV WEB",
  ],
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDesc,
    url: "https://phantomdev.fr/realisations",
    siteName: "NADER DEV WEB",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, ogDesc),
};

export default function RealisationsPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/realisations", "Réalisations");
  const webPageSchema = buildWebPageSchema({
    path: "/realisations",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Résultats clients NADER DEV WEB : garages, artisans, PME, RDV en ligne"
      >
        <RealisationsPageContent />
      </main>
      <Footer />
    </div>
  );
}
