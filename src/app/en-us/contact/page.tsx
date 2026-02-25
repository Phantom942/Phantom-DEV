import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { WhatsAppCtaButton } from "@/components/WhatsAppButton";
import { WhatsAppForm } from "@/components/WhatsAppForm";
import { ArrowLeft } from "lucide-react";
import { getHreflangAlternates } from "@/lib/hreflang";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-us/contact",
    languages: getHreflangAlternates("/en-us/contact"),
  },
  title: "Contact — Free quote via WhatsApp",
  description:
    "Contact PhantomDev on WhatsApp for your web project. Websites, e-commerce, custom applications. Response within 48h, no commitment.",
  openGraph: {
    type: "website",
    title: "Contact | PhantomDev — Free web development quote within 48h",
    description:
      "Request a quote for your web project: website, e-commerce, SaaS application. Response within 48h via WhatsApp, no commitment.",
    url: "https://phantomdev.fr/en-us/contact",
    siteName: "PhantomDev",
    locale: "en_US",
  },
};

export default function EnUSContactPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="PhantomDev contact page: request a quote for web development, websites and SaaS"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-8 md:px-16">
          <Link
            href="/en-us"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
            aria-label="Back to PhantomDev homepage"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to home
          </Link>

          <h1
            className="mb-6 font-extralight tracking-[0.15em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">Contact</span>
          </h1>
          <p className="mb-4 max-w-xl text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:text-base md:text-lg">
            Got a project in mind? Contact me on WhatsApp for a free quote within 48h, no commitment.
          </p>
          <p className="mb-10 text-xs font-light tracking-[0.08em] text-[#f5f5f0]/60">
            Performance guarantee: Lighthouse 90+ on all delivered sites.
          </p>

          <WhatsAppCtaButton />
          <div className="mt-12">
            <Suspense fallback={null}>
              <WhatsAppForm />
            </Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
