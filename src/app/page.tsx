import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { creativeWorkSchema } from "@/data/projects";

export default function Home() {
  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden bg-[#000000]"
      id="home"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        role="main"
        className="w-full max-w-[100vw] overflow-x-hidden"
        aria-label="Contenu principal : PhantomDev, développement web sur-mesure, React, Node.js, SaaS, sites vitrines et e-commerce"
      >
        <HeroSection />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
