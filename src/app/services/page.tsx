import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { ArrowLeft, Palette, Box, Brain, Check } from "lucide-react";

export const metadata: Metadata = {
  alternates: { canonical: "https://phantomdev.fr/services" },
  title: "Services | PhantomDev — Création de sites web premium sur-mesure",
  description:
    "PhantomDev propose des services de création web : sites vitrines à partir de 4 500€, e-commerce à partir de 8 000€, applications sur-mesure, intégration IA. Tarifs marché FR/Europe. Devis gratuit sous 48h.",
  keywords: [
    "création site web",
    "développement web sur-mesure",
    "site vitrine",
    "e-commerce",
    "SaaS",
    "intégration IA",
    "Next.js",
    "PhantomDev",
  ],
  openGraph: {
    title: "Services | PhantomDev — Sites web premium sur-mesure",
    description:
      "Sites vitrines, e-commerce, applications SaaS, intégration IA. Devis gratuit.",
    url: "https://phantomdev.fr/services",
  },
};

const services = [
  {
    id: "conception",
    title: "Conception Web Premium",
    icon: Palette,
    price: "à partir de 4 500€",
    description:
      "Un site qui reflète l'excellence de votre marque. Chaque interface est conçue pour captiver, guider et convertir.",
    benefits: [
      "Design sur-mesure, zéro template générique",
      "UX pensée pour la conversion et l'engagement",
      "Identité visuelle cohérente et raffinée",
      "Responsive parfait sur tous les appareils",
      "Animations subtiles qui valorisent le contenu",
    ],
    cta: "Idéal pour : marques premium, portfolios, sites vitrines.",
  },
  {
    id: "applications",
    title: "Applications Sur-Mesure",
    icon: Box,
    price: "à partir de 8 000€",
    description:
      "Des plateformes robustes, scalables et performantes. E-commerce, SaaS, outils métier : l'architecture s'adapte à vos besoins.",
    benefits: [
      "E-commerce avec panier, paiement, gestion des stocks",
      "Plateformes SaaS et applications web complexes",
      "APIs REST ou GraphQL pour vos intégrations",
      "Performance optimisée (Next.js, React Server Components)",
      "Déploiement et maintenance simplifiés",
    ],
    cta: "Idéal pour : startups, PME, projets à fort trafic.",
  },
  {
    id: "ia",
    title: "Intégration IA Stratégique",
    icon: Brain,
    price: "sur devis",
    description:
      "L'intelligence artificielle au service de votre business. Chatbots, recommandations personnalisées, automatisation intelligente.",
    benefits: [
      "Chatbots et assistants conversationnels",
      "Systèmes de recommandation personnalisés",
      "Automatisation de processus métier",
      "Intégration d'APIs IA (OpenAI, Claude, etc.)",
      "Solutions sur-mesure adaptées à votre secteur",
    ],
    cta: "Idéal pour : entreprises innovantes, gains de productivité.",
  },
] as const;

export default function ServicesPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#000000]">
      <CursorAndGlow />
      <Navbar />
      <main role="main" className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-16">
          <Link
            href="/#expertise"
            className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
          >
            <ArrowLeft size={16} strokeWidth={1.5} />
            Retour à l&apos;accueil
          </Link>

          <h1
            className="mb-6 font-extralight tracking-[0.15em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">Services</span>
          </h1>
          <p className="mb-8 max-w-2xl text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:text-base md:text-lg">
            Des solutions web sur-mesure, de la conception à la mise en
            production. Performance, élégance et résultats mesurables.
          </p>
          <p className="mb-16 text-xs font-light tracking-[0.1em] text-[#f5f5f0]/60">
            Tarifs alignés marché FR / Europe. Devis personnalisé sous 48h.
          </p>

          <div className="space-y-24">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <section
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24 border-b border-[#f5f5f0]/10 pb-24 last:border-0"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-[#f5f5f0]/20 bg-[#0a0a0a]">
                      <Icon
                        size={24}
                        strokeWidth={1.25}
                        className="text-[#d4af37]/90"
                      />
                    </div>
                    <div>
                      <div className="mb-4 flex flex-wrap items-baseline justify-between gap-4">
                        <h2
                          className="font-extralight tracking-[0.1em] text-[#f5f5f0]"
                          style={{
                            fontFamily: "var(--font-cormorant), Georgia, serif",
                          }}
                        >
                          <span className="text-2xl sm:text-3xl">
                            {service.title}
                          </span>
                        </h2>
                        <span className="text-sm font-light tracking-[0.08em] text-[#d4af37]/90">
                          {service.price}
                        </span>
                      </div>
                      <p className="mb-8 max-w-2xl text-sm leading-[1.8] text-[#f5f5f0]/80 sm:text-base">
                        {service.description}
                      </p>
                      <ul className="mb-6 space-y-3">
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className="flex items-start gap-3 text-sm text-[#f5f5f0]/85"
                          >
                            <Check
                              size={18}
                              strokeWidth={2}
                              className="mt-0.5 shrink-0 text-[#d4af37]/80"
                            />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-xs font-light tracking-[0.1em] text-[#f5f5f0]/60">
                        {service.cta}
                      </p>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          <div className="mt-20 rounded-sm border border-[#d4af37]/30 bg-[#0a0a0a]/50 px-6 py-8 text-center sm:px-12 sm:py-10">
            <p className="mb-4 text-sm leading-[1.8] text-[#f5f5f0]/90">
              Un projet en tête ? Parlons-en. Devis gratuit sous 48h, sans engagement.
            </p>
            <p className="mb-6 text-xs font-light tracking-[0.08em] text-[#f5f5f0]/60">
              Garantie performance : Lighthouse 90+ | Tarifs alignés marché FR/Europe
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 border border-[#d4af37]/50 bg-[#d4af37]/10 px-8 py-3 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#d4af37]/20"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
