"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { projects } from "@/data/projects";

export function SelectedWorks() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section
      id="projets"
      className="w-full max-w-[100vw] overflow-x-hidden px-4 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20"
      aria-labelledby="realisations-title"
      aria-label="Réalisations PhantomDev : projets web, développement d'interfaces haute performance et e-commerce"
    >
      <ScrollReveal>
        <h2
          id="realisations-title"
          className="mb-4 font-extralight tracking-[0.2em] text-[#f5f5f0]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl">Réalisations</span>
        </h2>
        <p className="mb-8 text-xs leading-[1.6] tracking-[0.02em] text-[#f5f5f0]/75 sm:text-sm">
          {"L'excellence technique au service de l'élégance."}
        </p>
      </ScrollReveal>

      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.08}>
            <li>
              <article className="group">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f0]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  aria-label={`Voir le projet ${project.title}, ${project.description} — réalisation PhantomDev développement web`}
                >
                  <div className="relative mb-4">
                    <span className="absolute right-2 top-2 z-10 rounded-sm border border-[#d4af37]/40 bg-[#0a0a0a]/95 px-2 py-1 text-[9px] font-light tracking-wider text-[#d4af37] backdrop-blur-sm">
                      {"result" in project ? project.result : `Lighthouse ${"lighthouseScore" in project ? project.lighthouseScore : 95}%`}
                    </span>
                    <div
                      className={`relative flex aspect-[4/3] min-h-[120px] items-center justify-center overflow-hidden rounded-sm border px-6 py-8 transition-colors duration-300 group-hover:border-[#f5f5f0]/20 ${
                      "imageBg" in project && project.imageBg === "white"
                        ? "border-[#f5f5f0]/15 bg-white"
                        : "imageBg" in project && project.imageBg === "gray"
                          ? "border-[#f5f5f0]/15 bg-[#2A2A2A]"
                          : "border-[#f5f5f0]/10 bg-[#0a0a0a]"
                    }`}
                  >
                    <Image
                      src={project.image}
                      alt={`Logo ${project.title}, réalisation PhantomDev — ${project.description}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                      priority={index === 0}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <h3
                        className="font-extralight tracking-[0.08em] text-[#f5f5f0] transition-colors duration-300 group-hover:text-[#f5f5f0]"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                        }}
                      >
                        <span className="text-base sm:text-lg">{project.title}</span>
                      </h3>
                      <p className="mt-0.5 truncate text-xs text-[#f5f5f0]/60">
                        {project.description}
                      </p>
                      <p className="mt-2 text-[10px] font-light tracking-[0.06em] text-[#d4af37]/70">
                        {project.techs.join(" • ")}
                        {"lighthouseScore" in project && project.lighthouseScore
                          ? ` · Lighthouse ${project.lighthouseScore}/100`
                          : ""}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="shrink-0 text-[#f5f5f0]/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f5f5f0]"
                    />
                  </div>
                </a>
                {"details" in project && project.details && (
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setExpandedId(expandedId === project.id ? null : project.id);
                      }}
                      className="inline-flex items-center gap-1 text-[10px] font-light tracking-[0.08em] text-[#f5f5f0]/50 transition-colors hover:text-[#d4af37]/80"
                      aria-expanded={expandedId === project.id}
                    >
                      Détails techniques
                      {expandedId === project.id ? (
                        <ChevronUp size={12} strokeWidth={1.5} />
                      ) : (
                        <ChevronDown size={12} strokeWidth={1.5} />
                      )}
                    </button>
                    {expandedId === project.id && (
                      <div
                        className="mt-2 space-y-1 rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/60 px-3 py-2.5 text-[10px] font-light leading-[1.6] text-[#f5f5f0]/70"
                        role="region"
                        aria-label="Détails techniques du projet"
                      >
                        <p>
                          <span className="text-[#d4af37]/70">Enjeu :</span>{" "}
                          {project.details.enjeu}
                        </p>
                        <p>
                          <span className="text-[#d4af37]/70">Solution :</span>{" "}
                          {project.details.solution}
                        </p>
                        <p>
                          <span className="text-[#d4af37]/70">Gain :</span>{" "}
                          {project.details.gain}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </article>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
