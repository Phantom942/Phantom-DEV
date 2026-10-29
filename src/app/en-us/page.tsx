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
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Custom web development — Next.js, SaaS & premium e-commerce";
const description =
  "NADER ASSEL DEV WEB: bespoke web development with Next.js, React and TypeScript. Landing pages, e-commerce, SaaS apps and AI integration. Lighthouse 90+ guaranteed · Free quote within 24h · Remote worldwide.";

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
  twitter: twitterSummaryLarge(`${title} | NADER ASSEL DEV WEB`, description),
};

export default function EnUSHome() {
  return (
    <div
      className="relative min-h-screen min-h-[100dvh] w-full overflow-x-clip bg-transparent"
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
        aria-label="NADER ASSEL DEV WEB — Premium custom web development, React, Node.js, SaaS"
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
