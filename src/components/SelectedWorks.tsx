"use client";

import { useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { ProjectMockupImage } from "./ProjectMockupImage";
import { projects, type ProjectType } from "@/data/projects";
import { useTranslations } from "@/hooks/useTranslations";

const FILTERS: { value: ProjectType | "all"; labelKey: string }[] = [
  { value: "all", labelKey: "filterAll" },
  { value: "vitrine", labelKey: "filterVitrine" },
  { value: "application", labelKey: "filterApplication" },
];

const CASE_KEYS = ["defi", "solution", "result"] as const;

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

  const { caseStudyLabels: caseLabels, filterAll, filterVitrine, filterApplication } = t.projects;
  const filterLabels: Record<(typeof FILTERS)[number]["labelKey"], string> = {
    filterAll,
    filterVitrine,
    filterApplication,
  };

  return (
    <section
      id={sectionId}
      className={`w-full max-w-full overflow-x-clip bg-transparent px-4 sm:px-8 md:px-16 ${
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
                className="font-tech mb-4 text-center text-xl font-semibold uppercase tracking-[0.18em] text-zinc-100 sm:text-left sm:text-2xl md:text-3xl"
              >
                {t.sections.realisations}
              </h2>
              <p className="mx-auto mb-6 max-w-2xl text-center text-sm leading-relaxed tracking-normal text-zinc-300 sm:mx-0 sm:max-w-none sm:text-left sm:text-base">
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
                    ? "border-cyan-500/50 bg-cyan-500/10 text-zinc-100"
                    : "border-zinc-700 bg-transparent text-zinc-400 hover:border-zinc-600 hover:text-zinc-100"
                }`}
              >
                {filterLabels[f.labelKey]}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ul className="grid w-full auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 xl:grid-cols-3 xl:gap-8">
          {filteredProjects.map((project, index) => (
            <li key={project.id} className="flex h-full min-h-0">
              <ScrollReveal delay={index * 0.08} className="flex h-full min-h-0 w-full">
                <article
                  className="group flex h-full w-full min-h-0 flex-col transition-transform duration-300 hover:-translate-y-0.5"
                  style={{ fontFamily: "var(--font-source-sans), system-ui, sans-serif" }}
                >
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="stealth-card flex h-full min-h-[26rem] flex-col overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] outline-none transition-[border-color,box-shadow,transform] duration-300 hover:shadow-[0_26px_60px_rgba(0,0,0,0.42)] focus-visible:ring-2 focus-visible:ring-cyan-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 sm:min-h-[28rem] lg:min-h-[30rem]"
                    aria-label={`Voir le projet ${project.title}, ${project.description} — résultat client NADER DEV WEB`}
                  >
                    {/* Aperçu : occupe tout l’espace restant (cartes alignées) — min-h élevé pour mieux voir le site */}
                    <div className="relative min-h-[14rem] w-full flex-1 basis-0 overflow-hidden bg-zinc-950 sm:min-h-[16rem] lg:min-h-[18rem]">
                      <ProjectMockupImage
                        src={project.mockupImage}
                        alt={`Aperçu du site ${project.title} — réalisation NADER DEV WEB. ${project.description}`}
                        priority={index === 0}
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div
                        className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border border-zinc-800 bg-zinc-900/90 text-zinc-200 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                        aria-hidden
                      >
                        <ArrowUpRight size={18} strokeWidth={1.5} />
                      </div>
                    </div>
                    {/* Texte : hauteur naturelle (shrink-0) pour ne jamais rogner le contenu */}
                    <div className="flex shrink-0 flex-col bg-zinc-900/80 px-5 pb-5 pt-4 sm:px-6 sm:pb-6 sm:pt-5">
                      <h3 className="text-[0.8125rem] font-bold uppercase leading-snug tracking-[0.14em] text-zinc-100 sm:text-sm md:text-[0.9375rem]">
                        {project.title}
                      </h3>
                      <ul className="mt-2.5 flex flex-wrap gap-2 sm:mt-3" aria-label="Type de projet">
                        {project.tags.map((tag) => (
                          <li key={tag}>
                            <span className="inline-block rounded-full bg-zinc-800 px-3 py-1 text-[10px] font-medium tracking-wide text-zinc-300 sm:text-[11px]">
                              {tag}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <p className="mt-2.5 text-sm leading-relaxed text-zinc-400 sm:mt-3 sm:text-[0.9375rem]">
                        {project.description}
                      </p>
                      <ul
                        className="mt-3 space-y-2 border-t border-zinc-800 pt-3 sm:mt-3.5 sm:space-y-2.5 sm:pt-3.5"
                        aria-label={`Étude de cas ${project.title}`}
                      >
                        {CASE_KEYS.map((key) => (
                          <li key={key} className="flex gap-2.5 text-[11px] leading-snug sm:text-xs sm:leading-relaxed">
                            <span
                              className="shrink-0 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-cyan-400/90 sm:text-[11px]"
                              aria-hidden
                            >
                              {caseLabels[key]}
                            </span>
                            <span className="min-w-0 text-zinc-300">{project.caseStudy[key]}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </a>
                </article>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
