import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { creativeWorkSchema } from "@/data/projects";
import { getHreflangAlternates } from "@/lib/hreflang";

export const metadata: Metadata = {
  alternates: { languages: getHreflangAlternates("/") },
  title: "Création de sites web premium sur-mesure — International",
  description:
    "PhantomDev crée des sites web sur-mesure qui convertissent. E-commerce, SaaS, vitrines. Devis gratuit sous 48h. Performance Lighthouse 90+. France, Europe, monde.",
  openGraph: {
    url: "https://phantomdev.fr",
    locale: "fr_FR",
  },
};

export default function Home() {
  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full overflow-x-clip bg-[#000000]"
      id="home"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
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
