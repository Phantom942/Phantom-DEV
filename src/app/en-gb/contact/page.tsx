import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { WhatsAppCtaButton } from "@/components/WhatsAppButton";
import { ArrowLeft } from "lucide-react";
import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbForPath } from "@/lib/breadcrumb";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Contact — Free quote via WhatsApp";
const description =
  "Contact PhantomDev on WhatsApp for your web project. Websites, e-commerce, custom applications. Response within 24h, no commitment.";
const ogTitle = "Contact | PhantomDev — Free web development quote within 24h";
const ogDesc =
  "Request a quote for your web project: website, e-commerce, SaaS application. Response within 24h via WhatsApp, no commitment.";

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
  const breadcrumbSchema = getBreadcrumbForPath("/en-gb/contact", "Contact");

  return (
    <div className="relative min-h-screen w-full bg-transparent">
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
        aria-label="PhantomDev contact page: request a quote for web development, websites and SaaS"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-8 md:px-16">
          <div className="mx-auto w-full max-w-2xl">
            <Link
              href="/en-gb"
              className="mb-10 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-100"
              aria-label="Back to PhantomDev homepage"
            >
              <ArrowLeft size={16} strokeWidth={1.5} />
              Back to home
            </Link>

            <div className="stealth-card rounded-lg px-6 py-10 text-center sm:px-10 sm:py-12">
              <h1
                className="font-tech mb-6 text-3xl font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-4xl md:text-5xl"
              >
                Contact
              </h1>
              <p className="mb-4 text-sm leading-[1.8] tracking-[0.02em] text-zinc-300 sm:text-base md:text-lg">
                Got a project in mind? Contact me on WhatsApp for a free quote within 24h, no commitment.
              </p>
              <p className="mb-10 text-xs font-light tracking-[0.08em] text-zinc-400">
                Performance guarantee: Lighthouse 90+ on all delivered sites.
              </p>

              <div className="flex flex-col items-center">
                <WhatsAppCtaButton />
              </div>
              <p className="mt-8 text-center text-xs font-light tracking-[0.08em] text-zinc-400">
                Response within 24h · No commitment
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
