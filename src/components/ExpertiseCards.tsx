"use client";

import { motion } from "framer-motion";
import { Palette, Box, Brain } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const cards = [
  {
    id: "conception",
    title: "Conception Web Premium",
    icon: Palette,
  },
  {
    id: "applications",
    title: "Applications Sur-Mesure",
    icon: Box,
  },
  {
    id: "ia",
    title: "Intégration IA Stratégique",
    icon: Brain,
  },
] as const;

export function ExpertiseCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <ScrollReveal key={card.id} delay={index * 0.1}>
            <motion.article
              className="group relative overflow-hidden rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/50 px-6 py-10 backdrop-blur-[1px] transition-all duration-500 hover:border-[#f5f5f0]/25 hover:shadow-[0_0_50px_rgba(212,175,55,0.18)] sm:px-8 sm:py-12"
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
                <h3 className="text-sm font-light tracking-[0.08em] text-[#f5f5f0] transition-colors duration-300 group-hover:text-[#f5f5f0] sm:text-base">
                  {card.title}
                </h3>
              </div>
            </motion.article>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
