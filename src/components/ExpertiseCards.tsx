"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Palette, Box, Brain, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const cards = [
  {
    id: "conception",
    title: "Conception Web Premium",
    description:
      "Interfaces raffinées, UX pensée pour la conversion. Design sur-mesure qui renforce votre image de marque.",
    icon: Palette,
    href: "/services#conception",
  },
  {
    id: "applications",
    title: "Applications Sur-Mesure",
    description:
      "E-commerce, SaaS, plateformes métier. Architecture solide, scalabilité et performances optimisées.",
    icon: Box,
    href: "/services#applications",
  },
  {
    id: "ia",
    title: "Intégration IA Stratégique",
    description:
      "Chatbots, recommandations, automatisation. L'intelligence artificielle au service de vos processus.",
    icon: Brain,
    href: "/services#ia",
  },
] as const;

export function ExpertiseCards() {
  return (
    <div className="grid w-full max-w-[100vw] grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <ScrollReveal key={card.id} delay={index * 0.1}>
            <Link href={card.href} className="block">
              <motion.article
                className="group relative min-w-0 overflow-hidden rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/50 px-5 py-8 backdrop-blur-[1px] transition-all duration-500 hover:border-[#f5f5f0]/25 hover:shadow-[0_0_50px_rgba(212,175,55,0.18)] sm:px-8 sm:py-12"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.3 }}
              >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.04) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative">
                <Icon
                  className="mb-6 text-[#f5f5f0]/70 transition-colors duration-300 group-hover:text-[#f5f5f0]"
                  size={28}
                  strokeWidth={1.25}
                />
                <h3 className="mb-3 text-xs font-light tracking-[0.06em] text-[#f5f5f0] transition-colors duration-300 group-hover:text-[#f5f5f0] sm:text-sm md:text-base md:tracking-[0.08em]">
                  {card.title}
                </h3>
                <p className="mb-6 text-xs leading-[1.6] text-[#f5f5f0]/65 sm:text-sm">
                  {card.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs font-light tracking-[0.1em] text-[#d4af37]/90 transition-all group-hover:gap-2">
                  En savoir plus
                  <ArrowRight size={14} strokeWidth={1.5} />
                </span>
              </div>
            </motion.article>
            </Link>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
