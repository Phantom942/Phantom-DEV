"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { projects } from "@/data/projects";
import { useTranslations } from "@/hooks/useTranslations";

export function SelectedWorks() {
  const { t } = useTranslations();
  return (
    <section
      id="projets"
      className="w-full max-w-full overflow-x-clip px-4 py-10 sm:px-8 sm:py-12 md:px-16 md:py-16"
      aria-labelledby="realisations-title"
      aria-label="Réalisations PhantomDev : projets web, développement d'interfaces haute performance et e-commerce"
    >
      <ScrollReveal>
        <h2
          id="realisations-title"
          className="mb-4 font-extralight tracking-[0.2em] text-[#f5f5f0]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl">{t.sections.realisations}</span>
        </h2>
        <p className="mb-8 text-xs leading-[1.6] tracking-[0.02em] text-[#f5f5f0]/75 sm:text-sm">
          {t.sections.realisationsDesc}
        </p>
      </ScrollReveal>

      <ul className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
                  <div
                    className={`relative mb-4 flex aspect-[4/3] min-h-[120px] items-center justify-center overflow-hidden rounded-sm border px-6 py-8 transition-colors duration-300 group-hover:border-[#f5f5f0]/20 ${
                      "imageBg" in project && project.imageBg === "white"
                        ? "border-[#f5f5f0]/15 bg-white"
                        : "imageBg" in project && project.imageBg === "gray"
                          ? "border-[#f5f5f0]/15 bg-[#2A2A2A]"
                          : "border-[#f5f5f0]/10 bg-[#0a0a0a]"
                    }`}
                  >
                    {project.id === "kraken-metals" ? (
                      <div
                        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]"
                        aria-hidden
                      >
                        <span
                          className="text-center font-bold tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontSize: "clamp(0.7rem, 2.2vw, 0.95rem)",
                            lineHeight: 1.3,
                            background: "linear-gradient(110deg, #ffffff 0%, #e8e8e8 20%, #c0c0c0 40%, #909090 50%, #c0c0c0 60%, #e8e8e8 80%, #ffffff 100%)",
                            backgroundSize: "200% 100%",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            textShadow: "0 1px 2px rgba(0,0,0,0.4)",
                            animation: "metallic-shimmer 5s ease-in-out infinite",
                          }}
                        >
                          KRAKEN
                          <br />
                          METALS
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={project.image}
                        alt={`Logo ${project.title}, réalisation PhantomDev — ${project.description}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.03]"
                        priority={index === 0}
                      />
                    )}
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
                    </div>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.5}
                      className="shrink-0 text-[#f5f5f0]/70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f5f5f0]"
                    />
                  </div>
                </a>
              </article>
            </li>
          </ScrollReveal>
        ))}
      </ul>
    </section>
  );
}
