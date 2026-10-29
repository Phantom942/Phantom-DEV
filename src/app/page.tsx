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
  "Sites web et outils digitaux pour TPE, artisans et garages";
const description =
  "NADER ASSEL DEV WEB — développeur freelance. Sites vitrines, RDV en ligne et automatisation ciblée pour PME locales. Devis sous 24 h sur WhatsApp.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr",
    languages: getHreflangAlternates("/"),
  },
  title: { absolute: `${title} | NADER ASSEL DEV WEB` },
  description,
  keywords: [
    "création site internet",
    "site vitrine professionnel",
    "site web artisan",
    "site web garage automobile",
    "automatisation garage",
    "gain de temps artisan",
    "CRM PME local",
    "prise de rendez-vous en ligne",
    "boutique en ligne sur-mesure",
    "automatisation entreprise",
    "intelligence artificielle PME",
    "visibilité Google entreprise",
    "refonte site web",
    "NADER ASSEL DEV WEB",
  ],
  openGraph: {
    title: `${title} | NADER ASSEL DEV WEB`,
    description,
    url: "https://phantomdev.fr",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(`${title} | NADER ASSEL DEV WEB`, description),
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
        aria-label="Contenu principal : NADER ASSEL DEV WEB, sites web, automatisation garage, gain de temps artisan, CRM PME local, réservation en ligne"
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
