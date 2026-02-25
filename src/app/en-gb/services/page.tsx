import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ServicesList } from "@/components/ServicesList";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";

import { getHreflangAlternates } from "@/lib/hreflang";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-gb/services",
    languages: getHreflangAlternates("/en-gb/services"),
  },
  title: "Services — PhantomDev",
  description: "PhantomDev: custom web development, e-commerce, SaaS. Next.js, React.",
  openGraph: { type: "website", url: "https://phantomdev.fr/en-gb/services" },
};

export default function EnGBServicesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-16">
          <Link
            href="/en-gb/#expertise"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to home
          </Link>
          <h1 className="mb-6 font-extralight tracking-[0.15em] text-[#f5f5f0]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            <span className="text-3xl sm:text-4xl md:text-5xl">Services</span>
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-[1.8] text-[#f5f5f0]/85 sm:text-base md:text-lg">
            Custom web solutions, from concept to production. Performance, elegance, measurable results.
          </p>
          <p className="mb-16 text-xs font-light tracking-[0.1em] text-[#f5f5f0]/60">
            Competitive rates. Personalised quote within 48h.
          </p>
          <ServicesList />
          <div className="mt-20 flex flex-col items-center gap-6 rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/30 px-6 py-10 sm:flex-row sm:justify-center sm:gap-8 sm:px-12 sm:py-12">
            <Link
              href="/en-gb/#contact"
              className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
            >
              Request a quote
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <a
              href={getWhatsAppDevisUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20"
            >
              <MessageCircle size={18} strokeWidth={1.5} />
              Contact on WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
