import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { WhatsAppCtaButton } from "@/components/WhatsAppButton";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://phantomdev.fr/contact" },
  title: "Contact — Devis gratuit via WhatsApp",
  description:
    "Contactez PhantomDev sur WhatsApp pour votre projet web. Sites vitrines, e-commerce, applications sur-mesure. Réponse sous 48h, sans engagement.",
  openGraph: {
    title: "Contact — Devis via WhatsApp",
    description: "Devis gratuit sous 48h pour votre projet web. Contact WhatsApp.",
    url: "https://phantomdev.fr/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-8 md:px-16">
          <Link
            href="/#contact"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
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

          <WhatsAppCtaButton />
        </div>
      </main>
      <Footer />
    </div>
  );
}
