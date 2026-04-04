"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Palette, Box, Search, Brain, ArrowRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslations } from "@/hooks/useTranslations";

const cardIds = ["conception", "applications", "seo", "ia"] as const;
const icons = {
  conception: Palette,
  applications: Box,
  seo: Search,
  ia: Brain,
} as const;

export function ExpertiseCards() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const prefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";
  return (
    <div className="grid w-full max-w-full auto-rows-fr grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cardIds.map((id, index) => {
        const Icon = icons[id];
        const titleKey = id;
        const descKey = `${id}Desc` as
          | "conceptionDesc"
          | "applicationsDesc"
          | "seoDesc"
          | "iaDesc";
        const title = t.expertiseCards[titleKey];
        const desc = t.expertiseCards[descKey];
        return (
          <ScrollReveal key={id} delay={index * 0.1} className="min-h-0 h-full">
            <Link
              href={`${prefix || ""}/services#${id}`}
              className="flex h-full min-h-0 flex-col"
              aria-label={`${title} : ${desc}`}
            >
              <motion.article
                className="group relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-sm border border-[#f5f5f0]/10 bg-[#2c2f31]/50 px-5 py-8 backdrop-blur-[1px] transition-all duration-500 hover:border-[#f5f5f0]/25 hover:shadow-[0_0_50px_rgba(212,175,55,0.18)] sm:px-8 sm:py-12"
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
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <Icon
                    className="mb-6 shrink-0 text-[#f5f5f0]/70 transition-colors duration-300 group-hover:text-[#f5f5f0]"
                    size={28}
                    strokeWidth={1.25}
                  />
                  <h3 className="mb-3 shrink-0 text-sm font-medium tracking-normal text-[#f5f5f0] transition-colors duration-300 sm:text-base md:text-lg">
                    {title}
                  </h3>
                  <p className="mb-6 min-h-0 flex-1 text-sm leading-relaxed tracking-normal text-[#f5f5f0]/78 sm:text-base">
                    {desc}
                  </p>
                  <span className="mt-auto inline-flex shrink-0 items-center gap-1.5 text-xs font-light tracking-[0.1em] text-[#d4af37]/90 transition-all group-hover:gap-2">
                    {t.expertiseCards.learnMore}
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
