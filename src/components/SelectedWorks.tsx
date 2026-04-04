"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { projects, type ProjectType } from "@/data/projects";
import { useTranslations } from "@/hooks/useTranslations";

const FILTERS: { value: ProjectType | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "filterAll" },
  { value: "vitrine", labelKey: "filterVitrine" },
  { value: "application", labelKey: "filterApplication" },
];

interface SelectedWorksProps {
  /** Ancre unique par page (accueil : #projets, page dédiée : #realisations). */
  sectionId?: string;
  /** Sur la page dédiée, le h1 est au-dessus : on masque le sous-titre de section. */
  showSectionHeading?: boolean;
}

export function SelectedWorks({
  sectionId = "projets",
  showSectionHeading = true,
}: SelectedWorksProps) {
  const { t } = useTranslations();
  const [filter, setFilter] = useState<ProjectType | "all">("all");

  const filteredProjects = useMemo(() => {
    const list =
      filter === "all"
        ? [...projects]
        : projects.filter((p) => p.type === filter);
    return list as (typeof projects)[number][];
  }, [filter]);

  const projectsLabel =
    "projects" in t ? t.projects : { filterAll: "Tous", filterVitrine: "Sites vitrines", filterApplication: "Applications" };

  return (
    <section
      id={sectionId}
      className={`w-full max-w-full overflow-x-clip bg-[#353839] px-4 sm:px-8 md:px-16 ${
        showSectionHeading
          ? "py-10 sm:py-12 md:py-16"
          : "pb-10 pt-0 sm:pb-12 sm:pt-0 md:pb-16 md:pt-0"
      }`}
      aria-labelledby={showSectionHeading ? "realisations-title" : undefined}
      aria-label={showSectionHeading ? undefined : t.sections.projectsSectionAria}
    >
      <div className="mx-auto w-full max-w-7xl">
        <ScrollReveal>
          {showSectionHeading && (
            <>
              <h2
                id="realisations-title"
                className="mb-4 text-center font-extralight tracking-[0.2em] text-[#f5f5f0] sm:text-left"
                style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
              >
                <span className="text-xl sm:text-2xl md:text-3xl">{t.sections.realisations}</span>
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-center text-sm leading-relaxed tracking-normal text-[#f5f5f0]/82 sm:mx-0 sm:max-w-none sm:text-left sm:text-base">
                {t.sections.realisationsDesc}
              </p>
            </>
          )}
          <div
            className="mb-8 flex flex-wrap justify-center gap-2 sm:justify-start"
            role="tablist"
            aria-label={t.sections.filterTablistAria}
          >
            {FILTERS.map((f) => (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={filter === f.value}
                onClick={() => setFilter(f.value)}
                className={`rounded-sm border px-4 py-2 text-xs font-light tracking-[0.08em] transition-colors ${
                  filter === f.value
                    ? "border-[#d4af37]/50 bg-[#d4af37]/10 text-[#f5f5f0]"
                    : "border-[#f5f5f0]/20 bg-transparent text-[#f5f5f0]/70 hover:border-[#f5f5f0]/40 hover:text-[#f5f5f0]"
                }`}
              >
                {projectsLabel[f.labelKey as keyof typeof projectsLabel]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ul className="grid w-full auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
          {filteredProjects.map((project, index) => (
            <ScrollReveal key={project.id} delay={index * 0.08} className="min-h-0 h-full">
              <li className="flex h-full min-h-0">
                <article
                  className="group flex h-full w-full min-h-0 flex-col transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full min-h-[26rem] flex-col overflow-hidden rounded-xl border border-[#f5f5f0]/[0.07] bg-[#16181a] shadow-[0_20px_50px_rgba(0,0,0,0.35)] outline-none transition-[border-color,box-shadow] duration-300 hover:border-[#f5f5f0]/12 hover:shadow-[0_26px_60px_rgba(0,0,0,0.42)] focus-visible:ring-2 focus-visible:ring-[#d4af37]/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#353839] sm:min-h-[28rem] lg:min-h-[30rem]"
                    aria-label={`Voir le projet ${project.title}, ${project.description} — réalisation PhantomDev développement web`}
                  >
                    {/* Aperçu : occupe tout l’espace restant (cartes alignées) — min-h élevé pour mieux voir le site */}
                    <div className="relative min-h-[14rem] w-full flex-1 basis-0 overflow-hidden bg-[#0a0b0c] sm:min-h-[16rem] lg:min-h-[18rem]">
                      <Image
                        src={project.mockupImage}
                        alt={`Aperçu du site ${project.title} — réalisation PhantomDev. ${project.description}`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                        priority={index === 0}
                      />
                      <div
                        className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#f5f5f0]/12 bg-[#16181a]/90 text-[#f5f5f0]/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      >
                        <ArrowUpRight size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    {/* Texte : hauteur naturelle (shrink-0) pour ne jamais rogner le contenu */}
                    <div className="flex shrink-0 flex-col bg-[#101214] px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                      <h3 className="text-[0.8125rem] font-bold uppercase leading-snug tracking-[0.14em] text-[#f5f5f0] sm:text-sm md:text-[0.9375rem]">
                        {project.title}
                      </h3>
                      <ul className="mt-2.5 flex flex-wrap gap-2 sm:mt-3" aria-label="Type de projet">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <span className="inline-block rounded-full bg-[#2c3035] px-3 py-1 text-[10px] font-medium tracking-wide text-[#f5f5f0]/88 sm:text-[11px]">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2.5 text-sm leading-relaxed text-[#f5f5f0]/82 sm:mt-3 sm:text-[0.9375rem]">
                        {project.description}
                      </p>
                      <p className="mt-3 text-[11px] font-light leading-normal tracking-wide text-[#f5f5f0]/50 sm:mt-3.5 sm:text-xs">
                        {project.details.gain}
                      </p>
                    </div>
                  </a>
                </article>
              </li>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
