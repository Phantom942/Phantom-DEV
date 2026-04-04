import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { creativeWorkSchema } from "@/data/projects";
import { buildFaqPageJsonLd } from "@/lib/faq-jsonld";
import { getHreflangAlternates } from "@/lib/hreflang";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Création de sites web premium sur-mesure — International";
const description =
  "PhantomDev crée des sites web sur-mesure qui convertissent. E-commerce, SaaS, vitrines. Devis gratuit sous 48h. Performance Lighthouse 90+. France, Europe, monde.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr",
    languages: getHreflangAlternates("/"),
  },
  title,
  description,
  openGraph: {
    url: "https://phantomdev.fr",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(`${title} | PhantomDev`, description),
};

export default function Home() {
  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full overflow-x-clip bg-[#353839]"
      id="home"
    >
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
        <HeroSection />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
