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
    <div className="relative min-h-screen w-full bg-transparent">
      <CursorAndGlow />
      <Navbar />
      <main
        id="main"
        role="main"
        className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-24"
        aria-label={t.title}
      >
        <p className="font-tech mb-4 text-sm font-medium uppercase tracking-[0.28em] text-cyan-400/80">
          404
        </p>
        <h1 className="font-tech mb-6 text-center text-2xl font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-4xl md:text-5xl">
          {t.title}
        </h1>
        <p className="mb-12 max-w-md text-center text-sm leading-[1.8] tracking-[0.02em] text-zinc-400">
          {t.desc}
        </p>
        <Link
          href={homeHref}
          className="btn-stealth-secondary"
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
