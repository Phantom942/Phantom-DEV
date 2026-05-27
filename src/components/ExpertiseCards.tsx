"use client";

import Link from "next/link";
import { useLightMotion } from "@/hooks/useLightMotion";
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
  const lightMotion = useLightMotion();
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
              <article
                className={`stealth-card group relative flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-sm px-5 py-8 sm:px-8 sm:py-12 ${lightMotion ? "" : "md:transition-transform md:duration-300 md:hover:-translate-y-0.5"}`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 30%, rgba(34, 211, 238, 0.08) 0%, rgba(34, 211, 238, 0.03) 45%, transparent 70%)",
                  }}
                  aria-hidden
                />
                <div className="relative flex min-h-0 flex-1 flex-col">
                  <Icon
                    className="mb-6 shrink-0 text-zinc-400 transition-colors duration-300 group-hover:text-cyan-400/90"
                    size={28}
                    strokeWidth={1.25}
                  />
                  <h3 className="mb-3 shrink-0 text-sm font-medium tracking-normal text-zinc-100 transition-colors duration-300 group-hover:text-white sm:text-base md:text-lg">
                    {title}
                  </h3>
                  <p className="mb-6 min-h-0 flex-1 text-sm leading-relaxed tracking-normal text-zinc-400 sm:text-base">
                    {desc}
                  </p>
                  <span className="font-tech mt-auto inline-flex shrink-0 items-center gap-1.5 text-xs font-medium tracking-[0.1em] text-cyan-400/90 transition-all group-hover:gap-2 group-hover:text-cyan-300">
                    {t.expertiseCards.learnMore}
                    <ArrowRight size={14} strokeWidth={1.5} />
                  </span>
                </div>
              </article>
            </Link>
          </ScrollReveal>
        );
      })}
    </div>
  );
}
