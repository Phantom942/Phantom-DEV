import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { WhatsAppCtaButton } from "@/components/WhatsAppButton";
import { WhatsAppForm } from "@/components/WhatsAppForm";
import { ArrowLeft } from "lucide-react";
import { Suspense } from "react";

import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Contact — Devis gratuit sous 48h | International";
const description =
  "Demandez votre devis gratuit. Contact WhatsApp direct. Réponse sous 48h, sans engagement. France, Europe, international.";
const ogTitle = "Contact | PhantomDev — Devis développement web sous 48h";
const ogDesc =
  "Demandez un devis pour votre projet web : site vitrine, e-commerce, application SaaS. Réponse sous 48h via WhatsApp, sans engagement.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/contact",
    languages: getHreflangAlternates("/contact"),
  },
  title,
  description,
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDesc,
    url: "https://phantomdev.fr/contact",
    siteName: "PhantomDev",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, ogDesc),
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/contact", "Contact");

  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Page contact PhantomDev : demande de devis développement web, sites vitrines et SaaS"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-8 md:px-16">
          <Link
            href="/#contact"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
            aria-label="Retour à l'accueil PhantomDev, création de sites web"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>

          <h1
            className="mb-6 font-extralight tracking-[0.15em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">Contact</span>
          </h1>
          <p className="mb-4 max-w-xl text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:text-base md:text-lg">
            Un projet en tête ? Contactez-moi sur WhatsApp pour un devis gratuit
            sous 48h, sans engagement.
          </p>
          <p className="mb-10 text-xs font-light tracking-[0.08em] text-[#f5f5f0]/60">
            Garantie performance : Lighthouse 90+ sur tous les sites livrés.
          </p>

          <Suspense fallback={null}>
            <WhatsAppForm />
          </Suspense>
          <p className="mt-6 text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/40">
            ou
          </p>
          <p className="mt-2 text-center">
            <WhatsAppCtaButton />
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
