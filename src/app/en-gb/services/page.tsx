import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ServicesPageContent } from "@/components/ServicesPageContent";

import { getHreflangAlternates } from "@/lib/hreflang";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Services — PhantomDev";
const description = "PhantomDev: custom web development, e-commerce, SaaS. Next.js, React.";
const ogTitle = "Services | PhantomDev — UK";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-gb/services",
    languages: getHreflangAlternates("/en-gb/services"),
  },
  title,
  description,
  openGraph: {
    type: "website",
    title: ogTitle,
    description,
    url: "https://phantomdev.fr/en-gb/services",
    siteName: "PhantomDev",
    locale: "en_GB",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, description),
};

export default function EnGBServicesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <CursorAndGlow />
      <Navbar />
      <main id="main" role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <ServicesPageContent />
      </main>
      <Footer />
    </div>
  );
}
