"use client";

import Link from "next/link";
import { ScrollReveal } from "./ScrollReveal";
import { projects } from "@/data/projects";
import {
  ArrowLeft,
  Palette,
  Box,
  Brain,
  Check,
  Wrench,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const services = [
  {
    id: "conception",
    title: "Conception Web Premium",
    icon: Palette,
    price: "à partir de 4 500€",
    typeParam: "vitrine",
    description:
      "Un site qui reflète l'excellence de votre marque. Chaque interface est conçue pour captiver, guider et convertir.",
    benefits: [
      "Design sur-mesure, zéro template générique",
      "UX pensée pour la conversion et l'engagement",
      "Identité visuelle cohérente et raffinée",
      "Responsive parfait (Mobile-First, breakpoints optimisés)",
      "Animations subtiles (CSS, Framer Motion)",
    ],
    cta: "Idéal pour : marques premium, portfolios, sites vitrines.",
    projectRef: "phantom-art",
    projectLabel: null as string | null,
  },
  {
    id: "applications",
    title: "Applications Sur-Mesure",
    icon: Box,
    price: "à partir de 8 000€",
    typeParam: "application",
    badge: "Meilleur rapport qualité/prix" as const,
    description:
      "Des plateformes robustes, scalables et performantes. E-commerce, SaaS, outils métier : l'architecture s'adapte à vos besoins.",
    benefits: [
      "E-commerce avec panier, paiement, gestion des stocks",
      "Serverless Architecture (Vercel, AWS)",
      "APIs REST ou GraphQL pour vos intégrations",
      "Performance optimisée (Next.js, React Server Components)",
      "Déploiement et maintenance simplifiés",
    ],
    cta: "Idéal pour : startups, PME, projets à fort trafic.",
    projectRef: "redk-motors",
    projectLabel: null,
  },
  {
    id: "ia",
    title: "Intégration IA Stratégique",
    icon: Brain,
    price: "sur devis",
    typeParam: "autre",
    description:
      "L'intelligence artificielle au service de votre business. Chatbots, recommandations personnalisées, automatisation intelligente.",
    benefits: [
      "Chatbots et assistants conversationnels",
      "RAG (Retrieval-Augmented Generation)",
      "Systèmes de recommandation personnalisés",
      "Intégration d'APIs IA (OpenAI, Claude, etc.)",
      "Solutions sur-mesure adaptées à votre secteur",
    ],
    cta: "Idéal pour : entreprises innovantes, gains de productivité.",
    projectRef: null,
    projectLabel: "Nouveau",
  },
  {
    id: "maintenance",
    title: "Maintenance & Support",
    icon: Wrench,
    price: "dès 199 €/mois",
    typeParam: "maintenance",
    description:
      "Gardez votre site sécurisé, à jour et performant. Mises à jour techniques, sauvegardes et support réactif pour une sérénité au long cours.",
    benefits: [
      "Mises à jour de sécurité et dépendances",
      "Sauvegardes régulières et restauration si besoin",
      "Support par email (délai de réponse garanti)",
      "Petites évolutions incluses selon formule",
      "Surveillance et rapports de performance",
    ],
    cta: "Idéal pour : tous les sites livrés par PhantomDev, revenus récurrents prévisibles.",
    projectRef: null,
    projectLabel: null,
  },
] as const;

function getProjectByRef(ref: string) {
  return projects.find((p) => p.id === ref);
}

export function ServicesList() {
  return (
    <div className="space-y-16 md:space-y-24">
      {services.map((service, index) => {
        const Icon = service.icon;
        const project =
          service.projectRef && getProjectByRef(service.projectRef);
        const isEven = index % 2 === 1;

        return (
          <ScrollReveal key={service.id} delay={index * 0.08}>
            <section
              id={service.id}
              className="group/Service scroll-mt-24"
            >
              <div
                className={`relative overflow-hidden rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/30 px-6 py-8 transition-all duration-500 hover:border-[#d4af37]/25 hover:shadow-[0_0_40px_rgba(212,175,55,0.08)] sm:px-10 sm:py-12 md:flex md:items-start md:gap-12 md:px-12 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,175,55,0.02) 0%, transparent 50%)",
                }}
              >
                <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[#d4af37]/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover/Service:opacity-100" />
                <div
                  className={`relative flex flex-1 flex-col gap-6 ${
                    isEven ? "md:text-right md:items-end" : ""
                  }`}
                >
                  <div
                    className={`flex items-start gap-6 ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-[#f5f5f0]/20 bg-[#0a0a0a] transition-all duration-300 group-hover/Service:border-[#d4af37]/50 group-hover/Service:shadow-[0_0_24px_rgba(212,175,55,0.2)]">
                      <Icon
                        size={28}
                        strokeWidth={1.25}
                        className="text-[#d4af37]/90"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        <h2
                          className="font-extralight tracking-[0.1em] text-[#f5f5f0]"
                          style={{
                            fontFamily:
                              "var(--font-cormorant), Georgia, serif",
                          }}
                        >
                          <span className="text-2xl sm:text-3xl">
                            {service.title}
                          </span>
                        </h2>
                        {"badge" in service && service.badge && (
                          <span className="rounded-sm border border-[#d4af37]/50 bg-[#d4af37]/10 px-2 py-0.5 text-[10px] font-light tracking-wider text-[#d4af37]">
                            {service.badge}
                          </span>
                        )}
                        {service.projectLabel && (
                          <span className="rounded-sm border border-[#25D366]/40 bg-[#25D366]/10 px-2 py-0.5 text-[10px] font-light tracking-wider text-[#25D366]">
                            {service.projectLabel}
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-xs font-light tracking-[0.08em] text-[#d4af37]/80">
                        {service.price}
                      </p>
                      <p className="mb-8 max-w-2xl text-sm leading-[1.8] text-[#f5f5f0]/80 sm:text-base">
                        {service.description}
                      </p>
                      <ul
                        className={`mb-6 space-y-3 ${
                          isEven ? "md:ml-auto md:max-w-2xl" : ""
                        }`}
                      >
                        {service.benefits.map((benefit) => (
                          <li
                            key={benefit}
                            className={`flex items-start gap-3 text-sm text-[#f5f5f0]/85 ${
                              isEven ? "md:flex-row-reverse" : ""
                            }`}
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
                      {project && (
                        <p
                          className={`mt-6 flex items-center gap-2 text-xs tracking-[0.08em] text-[#f5f5f0]/50 ${
                            isEven ? "md:justify-end" : ""
                          }`}
                        >
                          <span>Utilisé pour :</span>
                          <Link
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[#d4af37]/80 transition-colors hover:text-[#d4af37]"
                            >
                            {project.title}
                            <ExternalLink size={12} strokeWidth={1.5} />
                          </Link>
                        </p>
                      )}
                      <Link
                        href={`/?type=${service.typeParam}#contact`}
                        className="mt-8 inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-6 py-3 text-xs font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
                      >
                        Demander un devis sur-mesure
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
