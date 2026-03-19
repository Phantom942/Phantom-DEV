import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { creativeWorkSchema } from "@/data/projects";
import { getHreflangAlternates } from "@/lib/hreflang";

export const metadata: Metadata = {
  alternates: { languages: getHreflangAlternates("/en-gb") },
  title: "Premium custom web development — UK & International",
  description:
    "PhantomDev creates custom websites that convert. E-commerce, SaaS, landing pages. Free quote within 48h. Lighthouse 90+ performance. UK, Europe, worldwide.",
  openGraph: {
    url: "https://phantomdev.fr/en-gb",
    locale: "en_GB",
  },
};

export default function EnGBHome() {
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
        aria-label="PhantomDev — Premium custom web development, React, Node.js, SaaS"
      >
        <HeroSection />
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
