"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const projects = [
  {
    id: "nexus",
    title: "Nexus Platform",
    description:
      "Plateforme SaaS pour équipes distribuées. Interface épurée, expérience fluide.",
    techs: ["Next.js", "Tailwind", "PostgreSQL"],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80",
    href: "#",
  },
  {
    id: "aurora",
    title: "Aurora AI",
    description:
      "Assistant intelligent et modèles de langage. Automatisation des workflows créatifs.",
    techs: ["Next.js", "Gemini API", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    href: "#",
  },
  {
    id: "velvet",
    title: "Velvet Studio",
    description:
      "Site vitrine premium. Animations subtiles, typographie raffinée.",
    techs: ["Next.js", "Framer Motion", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
    href: "#",
  },
] as const;

export function SelectedWorks() {
  return (
    <section
      id="selected-works"
      className="px-5 py-20 sm:px-8 sm:py-24 md:px-16 md:py-32"
      aria-labelledby="selected-works-title"
    >
      <ScrollReveal>
        <h2
          id="selected-works-title"
          className="mb-6 font-extralight tracking-[0.2em] text-[#f5f5f0]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          <span className="text-3xl sm:text-4xl md:text-5xl">Selected Works</span>
        </h2>
        <p className="mb-10 max-w-2xl text-base leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/85 sm:text-lg md:mb-20">
          {"L'excellence technique au service de l'élégance."}
        </p>
      </ScrollReveal>

      <ul className="grid grid-cols-1 grid-rows-auto gap-10 sm:gap-16 md:gap-24">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.12}>
            <li>
              <article className="group">
                <a
                  href={project.href}
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f0]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="relative mb-5 overflow-hidden sm:mb-6 md:mb-8">
                    <motion.div
                      className="aspect-[16/10] w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={project.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        aria-hidden
                      />
                    </motion.div>
                  </div>

                  <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-end md:justify-between md:gap-12">
                    <div>
                      <h3
                        className="mb-3 font-extralight tracking-[0.1em] text-[#f5f5f0] transition-colors duration-300 group-hover:text-[#f5f5f0]"
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                        }}
                      >
                        <span className="text-xl sm:text-2xl md:text-3xl">
                          {project.title}
                        </span>
                      </h3>
                      <p className="mb-4 max-w-xl text-sm leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/80 sm:text-base">
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
                      View Case Study
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
