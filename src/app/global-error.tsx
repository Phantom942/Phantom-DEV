"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#000000] font-sans text-[#f5f5f0] antialiased">
        <main
          role="main"
          className="flex min-h-screen flex-col items-center justify-center px-4"
        >
          <p
            className="mb-4 font-extralight tracking-[0.2em] text-[#d4af37]/60"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            Erreur
          </p>
          <h1
            className="mb-6 text-center font-extralight tracking-[0.15em]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-2xl sm:text-4xl">Une erreur est survenue</span>
          </h1>
          <p className="mb-12 max-w-md text-center text-sm leading-[1.8] text-[#f5f5f0]/70">
            Nous nous excusons pour la gêne occasionnée. Vous pouvez réessayer ou
            retourner à l&apos;accueil.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-6 py-3 text-sm font-light tracking-[0.12em] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50"
            >
              <RefreshCw size={16} strokeWidth={1.5} />
              Réessayer
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 border border-[#f5f5f0]/30 px-6 py-3 text-sm font-light tracking-[0.12em] transition-all hover:border-[#f5f5f0]/60 hover:bg-[#f5f5f0]/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50"
            >
              <Home size={16} strokeWidth={1.5} />
              Accueil
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
