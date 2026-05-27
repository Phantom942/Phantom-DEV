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
      <body className="relative min-h-screen overflow-x-clip bg-zinc-950 font-sans text-zinc-100 antialiased">
        <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
          <div className="stealth-ambient-halo absolute inset-0" />
          <div className="stealth-ambient-vignette absolute inset-0" />
        </div>
        <main
          role="main"
          className="flex min-h-screen flex-col items-center justify-center px-4"
        >
          <p className="font-tech mb-4 text-sm font-medium uppercase tracking-[0.28em] text-cyan-400/80">
            Erreur
          </p>
          <h1 className="font-tech mb-6 text-center text-2xl font-semibold uppercase tracking-[0.14em] sm:text-4xl">
            Une erreur est survenue
          </h1>
          <p className="mb-12 max-w-md text-center text-sm leading-[1.8] text-zinc-400">
            Nous nous excusons pour la gêne occasionnée. Vous pouvez réessayer ou
            retourner à l&apos;accueil.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={reset}
              className="btn-stealth-primary animate-none"
            >
              <RefreshCw size={16} strokeWidth={1.5} />
              Réessayer
            </button>
            <Link
              href="/"
              className="btn-stealth-secondary"
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
