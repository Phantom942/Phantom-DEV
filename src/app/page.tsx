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
  "Développement web sur-mesure — Next.js, SaaS & e-commerce premium";
const description =
  "PhantomDev : développement web sur-mesure en Next.js, React et TypeScript. Sites vitrines, e-commerce, applications SaaS et intégration IA. Lighthouse 90+ garanti · Devis gratuit sous 24h.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr",
    languages: getHreflangAlternates("/"),
  },
  title: { absolute: `${title} | PhantomDev` },
  description,
  keywords: [
    "développement web sur-mesure",
    "création site internet premium",
    "développeur Next.js",
    "application SaaS sur-mesure",
    "e-commerce Next.js",
    "site vitrine haute performance",
    "React TypeScript",
    "intégration IA web",
    "Core Web Vitals",
    "refonte site web performant",
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
