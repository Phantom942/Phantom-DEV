"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { projects } from "@/data/projects";

export function SelectedWorks() {
  return (
    <section
      id="projets"
      className="w-full max-w-[100vw] overflow-x-hidden px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-32"
      aria-labelledby="realisations-title"
    >
      <ScrollReveal>
        <h2
          id="realisations-title"
          className="mb-6 font-extralight tracking-[0.2em] text-[#f5f5f0]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-2xl sm:text-4xl md:text-5xl">Réalisations</span>
        </h2>
        <p className="mb-8 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:mb-10 sm:max-w-2xl sm:text-base md:mb-20 md:text-lg">
          {"L'excellence technique au service de l'élégance."}
        </p>
      </ScrollReveal>

      <ul className="grid w-full max-w-[100vw] grid-cols-1 gap-8 sm:gap-16 md:gap-24">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.12}>
            <li>
              <article className="group">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f0]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="relative mb-6 flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a] px-8 py-12 sm:mb-8 sm:px-12 sm:py-16">
                    <Image
                      src={project.image}
                      alt={`${project.title} - logo`}
                      fill
                      sizes="(max-width: 768px) 100vw, 80vw"
                      className="object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02]"
                      priority={index === 0}
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden
                    />
                  </div>
                  <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
                    <div>
                      <h3
                        className="mb-3 font-extralight tracking-[0.1em] text-[#f5f5f0] transition-colors duration-300 group-hover:text-[#f5f5f0]"
                        style={{
                          fontFamily: "var(--font-cormorant), Georgia, serif",
                        }}
                      >
                        <span className="text-lg sm:text-2xl md:text-3xl">
                          {project.title}
                        </span>
                      </h3>
                      <p className="mb-3 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/80 sm:max-w-xl sm:text-base">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        {project.techs.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs font-light tracking-[0.15em] uppercase text-[#f5f5f0]/60"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="mt-4 flex items-center gap-2 text-sm font-light tracking-[0.15em] text-[#f5f5f0]/90 transition-colors duration-300 group-hover:text-[#f5f5f0] md:mt-0">
                      Voir le site
                      <ArrowUpRight
                        size={16}
                        strokeWidth={1.5}
                        className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
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
