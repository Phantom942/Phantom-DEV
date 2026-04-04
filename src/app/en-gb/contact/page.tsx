import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { WhatsAppCtaButton } from "@/components/WhatsAppButton";
import { ArrowLeft } from "lucide-react";
import { getHreflangAlternates } from "@/lib/hreflang";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Contact — Free quote via WhatsApp";
const description =
  "Contact PhantomDev on WhatsApp for your web project. Websites, e-commerce, custom applications. Response within 48h, no commitment.";
const ogTitle = "Contact | PhantomDev — Free web development quote within 48h";
const ogDesc =
  "Request a quote for your web project: website, e-commerce, SaaS application. Response within 48h via WhatsApp, no commitment.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-gb/contact",
    languages: getHreflangAlternates("/en-gb/contact"),
  },
  title,
  description,
  openGraph: {
    type: "website",
    title: ogTitle,
    description: ogDesc,
    url: "https://phantomdev.fr/en-gb/contact",
    siteName: "PhantomDev",
    locale: "en_GB",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(ogTitle, ogDesc),
};

export default function EnGBContactPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="PhantomDev contact page: request a quote for web development, websites and SaaS"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-8 md:px-16">
          <Link
            href="/en-gb"
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

          <div className="flex flex-col items-center">
            <WhatsAppCtaButton />
          </div>
          <p className="mt-8 text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/40">
            Response within 48h · No commitment
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
