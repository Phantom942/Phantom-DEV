import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { AuditPageContent } from "@/components/AuditPageContent";
import { getHreflangAlternates } from "@/lib/hreflang";
import { buildAuditServiceSchema } from "@/lib/audit-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Website audit — instant diagnostic €39";
const description =
  "PhantomDev website audit: instant automated diagnostic after payment — technical, SEO, conversion, multi-page crawl and action plan. €39.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-gb/audit",
    languages: getHreflangAlternates("/en-gb/audit"),
  },
  title,
  description,
  openGraph: {
    title: "Website audit | PhantomDev",
    description,
    url: "https://phantomdev.fr/en-gb/audit",
    locale: "en_GB",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge("Website audit | PhantomDev", description),
};

export default function AuditPageEnGb() {
  const serviceSchema = buildAuditServiceSchema("en");

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main id="main" role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <Suspense fallback={null}>
          <AuditPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
