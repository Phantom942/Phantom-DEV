import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://phantomdev.fr/mentions-legales" },
  title: "Mentions légales",
  description:
    "Mentions légales de PhantomDev — Création de sites web premium sur-mesure.",
  robots: "index, follow",
  openGraph: {
    type: "website",
    title: "Mentions légales | PhantomDev",
    url: "https://phantomdev.fr/mentions-legales",
    siteName: "PhantomDev",
    locale: "fr_FR",
  },
};

export default function MentionsLegalesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main
        role="main"
        className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
        aria-label="Mentions légales PhantomDev, création de sites web"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-8 md:px-16">
          <Link
            href="/"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
            aria-label="Retour à l'accueil PhantomDev"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>

          <h1
            className="mb-8 font-extralight tracking-[0.15em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-3xl sm:text-4xl">Mentions légales</span>
          </h1>

          <div className="space-y-8 text-sm leading-[1.9] text-[#f5f5f0]/85">
            <section>
              <h2 className="mb-3 font-light tracking-[0.08em] text-[#f5f5f0]">
                1. Éditeur du site
              </h2>
              <p>
                Le site phantomdev.fr est édité par PhantomDev. Pour toute
                question concernant ce site ou les services proposés, vous pouvez
                nous contacter à l&apos;adresse : contact@phantomdev.fr
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-light tracking-[0.08em] text-[#f5f5f0]">
                2. Hébergement
              </h2>
              <p>
                Ce site est hébergé par GitHub, Inc., 88 Colin P Kelly Jr St,
                San Francisco, CA 94107, États-Unis. Pages :{" "}
                <a
                  href="https://pages.github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#d4af37]/90 underline decoration-[#d4af37]/40 transition-colors hover:decoration-[#d4af37]/80"
                >
                  pages.github.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-light tracking-[0.08em] text-[#f5f5f0]">
                3. Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu de ce site (textes, images, design,
                code) est protégé par le droit d&apos;auteur. Toute reproduction
                ou utilisation non autorisée est interdite.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-light tracking-[0.08em] text-[#f5f5f0]">
                4. Données personnelles
              </h2>
              <p>
                Les données personnelles collectées via WhatsApp ou par email
                sont utilisées uniquement pour répondre à vos demandes et ne sont
                pas partagées avec des tiers. Vous disposez d&apos;un droit
                d&apos;accès, de rectification et de suppression de vos données
                en nous contactant via WhatsApp ou à contact@phantomdev.fr.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-light tracking-[0.08em] text-[#f5f5f0]">
                5. Cookies
              </h2>
              <p>
                Ce site utilise uniquement les cookies techniques nécessaires à
                son fonctionnement. Aucun cookie publicitaire ou de suivi tiers
                n&apos;est utilisé par défaut.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-light tracking-[0.08em] text-[#f5f5f0]">
                6. Limitation de responsabilité
              </h2>
              <p>
                PhantomDev s&apos;efforce d&apos;assurer l&apos;exactitude des
                informations publiées sur ce site. Toutefois, PhantomDev ne peut
                être tenu responsable des erreurs, omissions ou des dommages
                résultant de l&apos;utilisation des informations fournies.
              </p>
            </section>

            <p className="pt-4 text-xs text-[#f5f5f0]/50">
              Dernière mise à jour : février 2026
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
