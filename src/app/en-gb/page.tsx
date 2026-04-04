import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Sections } from "@/components/Sections";
import { Footer } from "@/components/Footer";
import { creativeWorkSchema } from "@/data/projects";
import { getHreflangAlternates } from "@/lib/hreflang";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Premium custom web development — UK & International";
const description =
  "PhantomDev creates custom websites that convert. E-commerce, SaaS, landing pages. Free quote within 48h. Lighthouse 90+ performance. UK, Europe, worldwide.";

export const metadata: Metadata = {
  alternates: { languages: getHreflangAlternates("/en-gb") },
  title,
  description,
  openGraph: {
    url: "https://phantomdev.fr/en-gb",
    locale: "en_GB",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(`${title} | PhantomDev`, description),
};

export default function EnGBHome() {
  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full overflow-x-clip bg-[#353839]"
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
