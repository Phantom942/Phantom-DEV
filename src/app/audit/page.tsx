import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { AuditPageContent } from "@/components/AuditPageContent";
import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { buildAuditServiceSchema } from "@/lib/audit-jsonld";
import { buildWebPageSchema } from "@/lib/webpage-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Audit site internet — diagnostic automatique 39 €";
const description =
  "Audit site web instantané : entrez votre URL, payez 39 €, recevez le diagnostic complet (SEO, vitesse, technique, plan d'action).";
const ogTitle = "Audit site internet | PhantomDev — 39 €";
const ogDesc =
  "Audit automatique après paiement — 8 axes analysés + plan d'action, résultat immédiat.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/audit",
    languages: getHreflangAlternates("/audit"),
  },
  title,
  description,
  keywords: [
    "audit site internet",
    "audit SEO",
    "diagnostic site web",
    "analyse site internet",
    "audit performance site",
    "audit référencement",
    "PhantomDev",
  ],
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDesc,
    url: "https://phantomdev.fr/audit",
    siteName: "PhantomDev",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, ogDesc),
};

export default function AuditPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/audit", "Audit site");
  const serviceSchema = buildAuditServiceSchema("fr");
  const webPageSchema = buildWebPageSchema({
    path: "/audit",
    name: title,
    description,
  });

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Audit site internet PhantomDev — diagnostic technique, SEO, performance et plan d'action"
      >
        <Suspense fallback={null}>
          <AuditPageContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
