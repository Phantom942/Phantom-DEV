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

const title = "Premium custom web development — US & International";
const description =
  "PhantomDev creates custom websites that convert. E-commerce, SaaS, landing pages. Free quote within 24h. Lighthouse 90+ performance. US, North America, worldwide.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-us",
    languages: getHreflangAlternates("/en-us"),
  },
  title,
  description,
  openGraph: {
    url: "https://phantomdev.fr/en-us",
    locale: "en_US",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(`${title} | PhantomDev`, description),
};

export default function EnUSHome() {
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
          __html: JSON.stringify(buildFaqPageJsonLd("en-US")),
        }}
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
