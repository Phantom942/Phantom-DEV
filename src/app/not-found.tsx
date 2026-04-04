"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Home } from "lucide-react";

const notFoundText = {
  fr: {
    title: "Page introuvable",
    desc: "La page que vous recherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
  "en-GB": {
    title: "Page not found",
    desc: "The page you are looking for does not exist or has been moved.",
    back: "Back to home",
  },
  "en-US": {
    title: "Page not found",
    desc: "The page you are looking for does not exist or has been moved.",
    back: "Back to home",
  },
};

export default function NotFound() {
  const pathname = usePathname();
  const locale = pathname.startsWith("/en-us") ? "en-US" : pathname.startsWith("/en-gb") ? "en-GB" : "fr";
  const t = notFoundText[locale];
  const homeHref = locale === "fr" ? "/" : `/${locale === "en-US" ? "en-us" : "en-gb"}`;

  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-24"
        aria-label={t.title}
      >
        <p
          className="mb-4 font-extralight tracking-[0.2em] text-[#d4af37]/60"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          404
        </p>
        <h1
          className="mb-6 text-center font-extralight tracking-[0.15em] text-[#f5f5f0]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-2xl sm:text-4xl md:text-5xl">{t.title}</span>
        </h1>
        <p className="mb-12 max-w-md text-center text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/70">
          {t.desc}
        </p>
        <Link
          href={homeHref}
          className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50"
          aria-label={t.back}
        >
          <Home size={18} strokeWidth={1.5} />
          {t.back}
        </Link>
      </main>
      <Footer />
    </div>
  );
}
