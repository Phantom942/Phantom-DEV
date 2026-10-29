import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ArrowLeft } from "lucide-react";

import { getHreflangAlternates } from "@/lib/hreflang";
import { getBreadcrumbTrail } from "@/lib/breadcrumb";
import { defaultOpenGraphImages, twitterSummaryLarge } from "@/lib/social-metadata";

const title = "Legal notice | NADER ASSEL DEV WEB";
const description = "Legal information for NADER ASSEL DEV WEB — premium custom web development.";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://phantomdev.fr/en-gb/mentions-legales",
    languages: getHreflangAlternates("/en-gb/mentions-legales"),
  },
  title,
  description,
  robots: "index, follow",
  openGraph: {
    type: "website",
    title,
    description,
    url: "https://phantomdev.fr/en-gb/mentions-legales",
    siteName: "NADER ASSEL DEV WEB",
    locale: "en_GB",
    images: defaultOpenGraphImages,
  },
  twitter: twitterSummaryLarge(title, description),
};

export default function EnGBMentionsLegalesPage() {
  const breadcrumbSchema = getBreadcrumbTrail([
    { path: "/en-gb/mentions-legales", label: "Legal notice" },
  ]);

  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CursorAndGlow />
      <Navbar />
      <main id="main" role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 md:px-16">
          <Link
            href="/en-gb"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-100"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to home
          </Link>
          <h1 className="font-tech mb-8 text-3xl font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-4xl">
            Legal notice
          </h1>
          <p className="text-sm leading-[1.8] text-zinc-400">
            NADER ASSEL DEV WEB — Premium custom web development. Based in France. International services.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
