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

const title = "Réalisations — Portfolio sites web & apps Next.js";
const description =
  "Portfolio PhantomDev : sites vitrines, e-commerce et applications Next.js livrés en France et à l'international. Design sur-mesure, Lighthouse 90+.";
const ogTitle = "Réalisations | PhantomDev — Portfolio web premium";
const ogDesc =
  "Projets livrés : vitrines, apps et interfaces orientées conversion. Stack moderne, performances optimisées.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/realisations",
    languages: getHreflangAlternates("/realisations"),
  },
  title,
  description,
  keywords: [
    "portfolio développeur web",
    "réalisations site web",
    "Next.js",
    "PhantomDev",
    "sites vitrines",
    "applications web",
  ],
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDesc,
    url: "https://phantomdev.fr/realisations",
    siteName: "PhantomDev",
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
        aria-label="Réalisations PhantomDev : portfolio projets web"
      >
        <RealisationsPageContent />
      </main>
      <Footer />
    </div>
  );
}
