"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { projects } from "@/data/projects";
import { useTranslations } from "@/hooks/useTranslations";
import {
  Palette,
  Box,
  Brain,
  Check,
  Wrench,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

const serviceConfigs = [
  { id: "conception" as const, icon: Palette, typeParam: "vitrine", projectRef: "phantom-art" as const, projectLabel: null as string | null },
  { id: "applications" as const, icon: Box, typeParam: "application", projectRef: "redk-motors" as const, projectLabel: null as string | null },
  { id: "ia" as const, icon: Brain, typeParam: "autre", projectRef: null as string | null, projectLabelKey: "projectLabel" as const },
  { id: "maintenance" as const, icon: Wrench, typeParam: "maintenance", projectRef: null as string | null, projectLabel: null as string | null },
] as const;

function getProjectByRef(ref: string) {
  return projects.find((p) => p.id === ref);
}

export function ServicesList() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const sl = t.servicesList;
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  return (
    <div className="space-y-16 md:space-y-24">
      {serviceConfigs.map((config, index) => {
        const Icon = config.icon;
        const s = sl[config.id];
        const project = config.projectRef ? getProjectByRef(config.projectRef) : null;
        const projectLabel = "projectLabelKey" in config ? (s as { projectLabel?: string }).projectLabel : config.projectLabel;
        const badge = "badge" in s ? (s as { badge?: string }).badge : undefined;
        const isEven = index % 2 === 1;

        return (
          <ScrollReveal key={config.id} delay={index * 0.08}>
            <section
              id={config.id}
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
                            {s.title}
                          </span>
                        </h2>
                        {badge && (
                          <span className="rounded-sm border border-[#d4af37]/50 bg-[#d4af37]/10 px-2 py-0.5 text-[10px] font-light tracking-wider text-[#d4af37]">
                            {badge}
                          </span>
                        )}
                        {projectLabel && (
                          <span className="rounded-sm border border-[#25D366]/40 bg-[#25D366]/10 px-2 py-0.5 text-[10px] font-light tracking-wider text-[#25D366]">
                            {projectLabel}
                          </span>
                        )}
                      </div>
                      <p className="mb-4 text-xs font-light tracking-[0.08em] text-[#d4af37]/80">
                        {s.price}
                      </p>
                      <p className="mb-8 max-w-2xl text-sm leading-[1.8] text-[#f5f5f0]/80 sm:text-base">
                        {s.description}
                      </p>
                      <ul
                        className={`mb-6 space-y-3 ${
                          isEven ? "md:ml-auto md:max-w-2xl" : ""
                        }`}
                      >
                        {s.benefits.map((benefit) => (
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
                        {s.cta}
                      </p>
                      {project && (
                        <p
                          className={`mt-6 flex items-center gap-2 text-xs tracking-[0.08em] text-[#f5f5f0]/50 ${
                            isEven ? "md:justify-end" : ""
                          }`}
                        >
                          <span>{sl.usedFor}</span>
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
                        href={`${localePrefix || "/"}?type=${config.typeParam}#contact`}
                        className="mt-8 inline-flex items-center gap-2 border border-[#d4af37]/40 bg-[#d4af37]/5 px-6 py-3 text-xs font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/60 hover:bg-[#d4af37]/10"
                      >
                        {s.ctaButton}
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
