import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main
        role="main"
        className="flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-24"
        aria-label="Page non trouvée"
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
          <span className="text-2xl sm:text-4xl md:text-5xl">
            Page introuvable
          </span>
        </h1>
        <p className="mb-12 max-w-md text-center text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/70">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
          aria-label="Retour à l'accueil PhantomDev"
        >
          <Home size={18} strokeWidth={1.5} />
          Retour à l&apos;accueil
        </Link>
      </main>
      <Footer />
    </div>
  );
}
