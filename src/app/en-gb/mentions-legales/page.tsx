import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://phantomdev.fr/en-gb/mentions-legales" },
  title: "Legal notice | PhantomDev",
  robots: "index, follow",
};

export default function EnGBMentionsLegalesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-8 md:px-16">
          <Link
            href="/en-gb"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Back to home
          </Link>
          <h1 className="mb-8 font-extralight tracking-[0.15em] text-[#f5f5f0]" style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}>
            Legal notice
          </h1>
          <p className="text-sm leading-[1.8] text-[#f5f5f0]/80">
            PhantomDev — Premium custom web development. Based in France. International services.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
