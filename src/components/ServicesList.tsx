"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollReveal } from "./ScrollReveal";
import { ServiceFilters } from "./ServiceFilters";
import { projects } from "@/data/projects";
import {
  filterServices,
  serviceConfigs,
  type ServiceFilterValue,
  type ServiceId,
} from "@/data/services";
import { useTranslations } from "@/hooks/useTranslations";
import { Check, ArrowRight, ExternalLink } from "lucide-react";

function getProjectByRef(ref: string) {
  return projects.find((p) => p.id === ref);
}

type ServiceCopy = {
  title: string;
  hook: string;
  description: string;
  benefits: readonly string[];
  cta: string;
  ctaButton: string;
  badge?: string;
  projectLabel?: string;
};

export function ServicesList() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const sl = t.servicesList;
  const sp = t.servicesPage;
  const [filter, setFilter] = useState<ServiceFilterValue>("all");
  const localePrefix = pathname.startsWith("/en-gb")
    ? "/en-gb"
    : pathname.startsWith("/en-us")
      ? "/en-us"
      : "";

  const filtered = useMemo(
    () => filterServices(filter, serviceConfigs),
    [filter]
  );

  return (
    <>
      <ServiceFilters value={filter} onChange={setFilter} />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-sm font-light tracking-[0.06em] text-zinc-500">
          {sp.filters.empty}
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {filtered.map((config, index) => {
            const Icon = config.icon;
            const s = sl[config.id as ServiceId] as ServiceCopy;
            const project = config.projectRef
              ? getProjectByRef(config.projectRef)
              : null;
            const badge = config.hasBadge ? s.badge : undefined;
            const projectLabel = config.hasProjectLabel
              ? s.projectLabel
              : undefined;

            return (
              <ScrollReveal key={config.id} delay={index * 0.05}>
                <li>
                  <article
                    id={config.id}
                    className="stealth-card group/service flex h-full scroll-mt-28 flex-col rounded-lg p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:p-8"
                  >
                    <div className="mb-5 flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-zinc-700 bg-zinc-900 transition-colors group-hover/service:border-cyan-500/50 group-hover/service:shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                        <Icon
                          size={24}
                          strokeWidth={1.25}
                          className="text-cyan-400/90"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <h2 className="font-tech text-lg font-semibold uppercase tracking-[0.08em] text-zinc-100 sm:text-xl">
                            {s.title}
                          </h2>
                          {badge && (
                            <span className="rounded-sm border border-cyan-500/50 bg-cyan-500/10 px-2 py-0.5 text-[10px] font-light tracking-wider text-cyan-400">
                              {badge}
                            </span>
                          )}
                          {projectLabel && (
                            <span className="rounded-sm border border-[#25D366]/40 bg-[#25D366]/10 px-2 py-0.5 text-[10px] font-light tracking-wider text-[#25D366]">
                              {projectLabel}
                            </span>
                          )}
                        </div>
                        <p className="text-sm font-light leading-snug text-zinc-200">
                          {s.hook}
                        </p>
                      </div>
                    </div>

                    <p className="mb-5 flex-1 text-sm leading-[1.75] text-zinc-400">
                      {s.description}
                    </p>

                    <ul className="mb-5 space-y-2 border-t border-zinc-800/80 pt-5">
                      {s.benefits.slice(0, 4).map((benefit) => (
                        <li
                          key={benefit}
                          className="flex items-start gap-2.5 text-xs text-zinc-300 sm:text-sm"
                        >
                          <Check
                            size={16}
                            strokeWidth={2}
                            className="mt-0.5 shrink-0 text-cyan-400/80"
                          />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <p className="mb-4 text-[10px] font-light tracking-[0.08em] text-zinc-500">
                      {s.cta}
                    </p>

                    {project && (
                      <p className="mb-4 flex items-center gap-2 text-[10px] tracking-[0.06em] text-zinc-500">
                        <span>{sl.usedFor}</span>
                        <Link
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400/80 transition-colors hover:text-cyan-400"
                        >
                          {project.title}
                          <ExternalLink size={12} strokeWidth={1.5} />
                        </Link>
                      </p>
                    )}

                    <Link
                      href={`${localePrefix || "/"}?type=${config.typeParam}#contact`}
                      className="mt-auto inline-flex w-full items-center justify-center gap-2 border border-cyan-500/40 bg-cyan-500/10 px-5 py-3 text-xs font-light tracking-[0.12em] text-zinc-100 transition-all hover:border-cyan-500/60 hover:bg-cyan-500/15 sm:w-auto"
                    >
                      {s.ctaButton}
                      <ArrowRight size={14} strokeWidth={1.5} />
                    </Link>
                    <p className="mt-2 text-center text-[10px] font-light tracking-[0.06em] text-zinc-600 sm:text-left">
                      {sp.cardReassurance}
                    </p>
                  </article>
                </li>
              </ScrollReveal>
            );
          })}
        </ul>
      )}
    </>
  );
}
