import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { RealisationsPageContent } from "@/components/RealisationsPageContent";
import { creativeWorkSchema } from "@/data/projects";
import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Portfolio — Premium web projects | NADER ASSEL DEV WEB";
const description =
  "NADER ASSEL DEV WEB portfolio: landing pages, e-commerce, Next.js and React applications. Lighthouse 90+ performance, bespoke UI. UK, EU, worldwide.";
const ogTitle = "Portfolio | NADER ASSEL DEV WEB — Web development work";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-gb/realisations",
    languages: getHreflangAlternates("/en-gb/realisations"),
  },
  title,
  description,
  openGraph: {
    type: "website",
    title: ogTitle,
    description,
    url: "https://phantomdev.fr/en-gb/realisations",
    siteName: "NADER ASSEL DEV WEB",
    locale: "en_GB",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, description),
};

export default function EnGBRealisationsPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/en-gb/realisations", "Portfolio");

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="NADER ASSEL DEV WEB portfolio: web projects"
      >
        <RealisationsPageContent />
      </main>
      <Footer />
    </div>
  );
}
