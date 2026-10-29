import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ServicesPageContent } from "@/components/ServicesPageContent";

import { getHreflangAlternates } from "@/lib/hreflang";
import { buildServicesItemListSchema } from "@/lib/services-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Services — NADER ASSEL DEV WEB";
const description = "NADER ASSEL DEV WEB: custom web development, e-commerce, SaaS. Next.js, React.";
const ogTitle = "Services | NADER ASSEL DEV WEB — US";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-us/services",
    languages: getHreflangAlternates("/en-us/services"),
  },
  title,
  description,
  openGraph: {
    type: "website",
    title: ogTitle,
    description,
    url: "https://phantomdev.fr/en-us/services",
    siteName: "NADER ASSEL DEV WEB",
    locale: "en_US",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, description),
};

export default function EnUSServicesPage() {
  const servicesSchema = buildServicesItemListSchema("en-US");

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main id="main" role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <Suspense fallback={null}>
          <ServicesPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
