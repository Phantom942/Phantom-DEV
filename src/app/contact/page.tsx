import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { WhatsAppCtaButton } from "@/components/WhatsAppButton";
import { ArrowLeft } from "lucide-react";

import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { buildContactPageSchema } from "@/lib/contact-jsonld";
import { buildWebPageSchema } from "@/lib/webpage-jsonld";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Contact — Devis site internet gratuit sous 24h";
const description =
  "Contactez NADER DEV WEB sur WhatsApp : devis gratuit pour site vitrine, e-commerce, réservation en ligne ou automatisation. Réponse sous 24h, sans engagement.";
const ogTitle = "Contact | NADER DEV WEB — Devis site internet gratuit sous 24h";
const ogDesc =
  "Demandez un devis sur WhatsApp : site vitrine, RDV en ligne, automatisation garage ou CRM PME. Réponse sous 24h, sans engagement.";

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
    siteName: "NADER DEV WEB",
    locale: "fr_FR",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, ogDesc),
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbForPath("/contact", "Contact");
  const contactSchema = buildContactPageSchema("fr");
  const webPageSchema = buildWebPageSchema({
    path: "/contact",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
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
        aria-label="Page contact NADER DEV WEB : devis site vitrine, RDV en ligne, automatisation garage, CRM PME"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-16">
          <div className="mx-auto w-full max-w-2xl">
            <Link
              href="/#contact"
              className="mb-10 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-100"
              aria-label="Retour à l'accueil NADER DEV WEB, création de sites web"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Retour à l&apos;accueil
            </Link>

            <div className="stealth-card rounded-lg px-6 py-10 text-center sm:px-10 sm:py-12">
              <h1
                className="font-tech mb-6 text-3xl font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-4xl md:text-5xl"
              >
                Contact
              </h1>
              <p className="mb-4 text-sm leading-[1.8] tracking-[0.02em] text-zinc-300 sm:text-base md:text-lg">
                Un projet en tête ? Contactez-moi sur WhatsApp pour un devis gratuit
                sous 24h, sans engagement.
              </p>
              <p className="mb-10 text-xs font-light tracking-[0.08em] text-zinc-400">
                Site rapide et fluide garanti — livré prêt à recevoir du trafic et des clients.
              </p>

              <div className="flex flex-col items-center">
                <WhatsAppCtaButton />
              </div>
              <p className="mt-8 text-center text-xs font-light tracking-[0.08em] text-zinc-400">
                Réponse sous 24h · Sans engagement
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
