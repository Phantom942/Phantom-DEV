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

        <ul className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.08}>
            <li className="h-full">
              <article className="group flex h-full flex-col transition-transform duration-300 hover:-translate-y-1">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col overflow-hidden rounded-lg border border-[#f5f5f0]/10 bg-[#2c2f31]/55 shadow-[0_20px_48px_rgba(0,0,0,0.28)] outline-none transition-[border-color,box-shadow] duration-300 hover:border-[#f5f5f0]/16 hover:shadow-[0_28px_64px_rgba(0,0,0,0.38)] focus-visible:ring-2 focus-visible:ring-[#d4af37]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#353839]"
                  aria-label={`Voir le projet ${project.title}, ${project.description} — réalisation PhantomDev développement web`}
                >
                  <div className="relative aspect-video w-full shrink-0 overflow-hidden bg-[#1a1b1c]">
                    <Image
                      src={project.mockupImage}
                      alt={`Aperçu du site ${project.title} — réalisation PhantomDev. ${project.description}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                      priority={index === 0}
                    />
                    <div
                      className="pointer-events-none absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-md border border-[#f5f5f0]/15 bg-[#353839]/85 text-[#f5f5f0]/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    >
                      <ArrowUpRight size={18} strokeWidth={1.5} />
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-medium tracking-normal text-[#f5f5f0] sm:text-xl">
                      {project.title}
                    </h3>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Type de projet">
                      {project.tags.map((tag) => (
                        <li key={tag}>
                          <span className="inline-block rounded-md border border-[#f5f5f0]/14 bg-[#353839] px-3 py-1.5 text-xs font-normal tracking-normal text-[#f5f5f0]/88">
                            {tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 flex-1 text-base leading-relaxed tracking-normal text-[#f5f5f0]/78">
                      {project.description}
                    </p>
                    <p className="mt-4 border-t border-[#f5f5f0]/10 pt-4 text-sm font-normal leading-snug tracking-normal text-[#e8e4d9]/90">
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
