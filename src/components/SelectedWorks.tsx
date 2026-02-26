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
                      project.id === "kraken-metals"
                        ? "border-[#f5f5f0]/15 bg-[#003548]"
                        : project.id === "redk-motors"
                          ? "border-[#f5f5f0]/15 bg-[#1a1a1a]"
                          : "imageBg" in project && project.imageBg === "white"
                            ? "border-[#f5f5f0]/15 bg-white"
                            : "imageBg" in project && project.imageBg === "gray"
                              ? "border-[#f5f5f0]/15 bg-[#2A2A2A]"
                              : "border-[#f5f5f0]/10 bg-[#0a0a0a]"
                    }`}
                  >
                    {project.id === "redk-motors" && (
                      <div className="absolute inset-0 overflow-hidden" aria-hidden>
                        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid slice">
                          <defs>
                            <filter id="smoke-blur" x="-50%" y="-50%" width="200%" height="200%">
                              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                              <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.5 0" result="smoke" />
                              <feBlend in="SourceGraphic" in2="smoke" mode="normal" />
                            </filter>
                            <filter id="smoke-soft">
                              <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
                            </filter>
                            <radialGradient id="smoke-grad-1" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="rgba(200,200,200,0.4)" />
                              <stop offset="50%" stopColor="rgba(180,180,180,0.15)" />
                              <stop offset="100%" stopColor="rgba(160,160,160,0)" />
                            </radialGradient>
                            <radialGradient id="smoke-grad-2" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="rgba(220,220,220,0.35)" />
                              <stop offset="60%" stopColor="rgba(200,200,200,0.1)" />
                              <stop offset="100%" stopColor="rgba(180,180,180,0)" />
                            </radialGradient>
                            <radialGradient id="smoke-grad-3" cx="50%" cy="50%" r="50%">
                              <stop offset="0%" stopColor="rgba(190,190,190,0.3)" />
                              <stop offset="70%" stopColor="rgba(170,170,170,0.08)" />
                              <stop offset="100%" stopColor="transparent" />
                            </radialGradient>
                          </defs>
                          {/* Fumée pneu - gradient radial + blur pour rendu réaliste */}
                          <g filter="url(#smoke-soft)">
                            <ellipse cx="130" cy="50" rx="35" ry="25" fill="url(#smoke-grad-1)" className="animate-smoke-1" />
                            <ellipse cx="150" cy="60" rx="30" ry="22" fill="url(#smoke-grad-2)" className="animate-smoke-2" />
                            <ellipse cx="165" cy="72" rx="28" ry="20" fill="url(#smoke-grad-3)" className="animate-smoke-3" />
                            <ellipse cx="110" cy="75" rx="25" ry="18" fill="url(#smoke-grad-2)" className="animate-smoke-4" />
                            <ellipse cx="75" cy="88" rx="22" ry="16" fill="url(#smoke-grad-3)" className="animate-smoke-4" style={{ animationDelay: "0.3s" }} />
                            <ellipse cx="145" cy="82" rx="20" ry="14" fill="url(#smoke-grad-1)" className="animate-smoke-1" style={{ animationDelay: "0.5s" }} />
                          </g>
                        </svg>
                      </div>
                    )}
                    {project.id === "kraken-metals" ? (
                      <div
                        className="relative flex items-center justify-center transition-transform duration-300 group-hover:scale-[1.03]"
                        aria-hidden
                      >
                        <span
                          className="text-center font-bold tracking-[0.2em] uppercase"
                          style={{
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontSize: "clamp(0.95rem, 2.8vw, 1.25rem)",
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
                    ) : project.id === "redk-motors" ? (
                      <div
                        className="relative z-10 flex items-center justify-center gap-1 transition-transform duration-300 group-hover:scale-[1.03]"
                        aria-hidden
                      >
                        <span
                          className="font-bold tracking-[0.12em] uppercase"
                          style={{
                            fontFamily: "Montserrat, system-ui, sans-serif",
                            fontSize: "clamp(0.85rem, 2.5vw, 1.15rem)",
                            lineHeight: 1.2,
                            color: "#d41e24",
                            textShadow: "0 0 5px rgba(212,30,36,1), 0 0 10px rgba(212,30,36,0.9), 0 0 15px rgba(212,30,36,0.8), 0 0 20px rgba(212,30,36,0.7), 0 0 30px rgba(212,30,36,0.6), 0 0 40px rgba(212,30,36,0.5), 0 0 60px rgba(212,30,36,0.4)",
                            animation: "neon-pulse-red 2s ease-in-out infinite alternate",
                          }}
                        >
                          RED-K
                        </span>
                        <span
                          className="font-bold tracking-[0.12em] uppercase text-white"
                          style={{
                            fontFamily: "Montserrat, system-ui, sans-serif",
                            fontSize: "clamp(0.85rem, 2.5vw, 1.15rem)",
                            lineHeight: 1.2,
                          }}
                        >
                          MOTORS
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
