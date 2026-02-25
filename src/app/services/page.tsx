import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ServicesList } from "@/components/ServicesList";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/services",
    languages: getHreflangAlternates("/services"),
  },
  title: "Services et tarifs — Sites vitrines, e-commerce, SaaS",
  description:
    "Tarifs création de sites web : vitrines dès 4 500€, e-commerce dès 8 000€, maintenance dès 199€/mois. Devis gratuit sous 48h.",
  keywords: [
    "création site web",
    "développement web sur-mesure",
    "site vitrine",
    "e-commerce",
    "SaaS",
    "intégration IA",
    "Next.js",
    "PhantomDev",
  ],
  openGraph: {
    type: "website",
    title: "Services | PhantomDev — Tarifs sites vitrines, e-commerce, SaaS",
    description:
      "Tarifs création web : vitrines dès 4 500€, e-commerce dès 8 000€. Devis gratuit sous 48h.",
    url: "https://phantomdev.fr/services",
    siteName: "PhantomDev",
    locale: "fr_FR",
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/services", "Services");

  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Page services PhantomDev : développement web, React, Node.js, SaaS, sites vitrines et e-commerce"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-16">
          <Link
            href="/#expertise"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
            aria-label="Retour à l'accueil PhantomDev, expertise développement web"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>

          <h1
            className="mb-6 font-extralight tracking-[0.15em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">Services</span>
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:text-base md:text-lg">
            Des solutions web sur-mesure, de la conception à la mise en
            production. Performance, élégance et résultats mesurables.
          </p>
          <p className="mb-16 text-xs font-light tracking-[0.1em] text-[#f5f5f0]/60">
            Tarifs alignés marché FR / Europe. Devis personnalisé sous 48h.
          </p>

          <ServicesList />

          <div className="mt-20 flex flex-col items-center gap-6 rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/30 px-6 py-10 sm:flex-row sm:justify-center sm:gap-8 sm:px-12 sm:py-12">
            <Link
              href="/?type=vitrine#contact"
              className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Demander un devis sur-mesure
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <a
              href={getWhatsAppDevisUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20"
              aria-label="Contacter PhantomDev sur WhatsApp pour un devis développement web ou SaaS"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
