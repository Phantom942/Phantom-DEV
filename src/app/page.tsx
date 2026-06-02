import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Suspense } from "react";
import { HeroSection } from "@/components/HeroSection";
import { TrustProofBar } from "@/components/TrustProofBar";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { creativeWorkSchema } from "@/data/projects";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { getHreflangAlternates } from "@/lib/hreflang";
import { buildWebPageSchema } from "@/lib/webpage-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title =
  "Sites web & outils digitaux qui vous amènent des clients";
const description =
  "PhantomDev : sites vitrines, e-commerce, réservation en ligne et automatisation pour TPE et PME. Plus de clients, moins de paperasse. Devis gratuit sous 24h sur WhatsApp.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr",
    languages: getHreflangAlternates("/"),
  },
  title: { absolute: `${title} | PhantomDev` },
  description,
  keywords: [
    "création site internet",
    "site vitrine professionnel",
    "site web artisan",
    "site web garage automobile",
    "prise de rendez-vous en ligne",
    "boutique en ligne sur-mesure",
    "automatisation entreprise",
    "intelligence artificielle PME",
    "visibilité Google entreprise",
    "refonte site web",
    "PhantomDev",
  ],
  openGraph: {
    title: `${title} | PhantomDev`,
    description,
    url: "https://phantomdev.fr",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(`${title} | PhantomDev`, description),
};

export default function Home() {
  const webPageSchema = buildWebPageSchema({
    path: "/",
    name: title,
    description,
  });

  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full overflow-x-clip bg-transparent"
      id="home"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd("fr")),
        }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full overflow-x-clip"
        aria-label="Contenu principal : PhantomDev, développement web sur-mesure, React, Node.js, SaaS, sites vitrines et e-commerce"
      >
        <Suspense fallback={null}>
          <HeroSection />
        </Suspense>
        <TrustProofBar />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
