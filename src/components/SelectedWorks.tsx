"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";

const projects = [
  {
    id: "phantom-art",
    title: "Phantom Art",
    description:
      "E-commerce de luxe dédié à l'art numérique. Expérience utilisateur immersive avec un focus sur le minimalisme et la haute performance.",
    techs: ["Next.js", "E-commerce", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
    href: "https://www.phantomart.fr/",
  },
  {
    id: "redk-motors",
    title: "REDK Motors",
    description:
      "Plateforme vitrine pour spécialiste automobile. Design agressif et élégant pour la mise en valeur de véhicules de prestige.",
    techs: ["React", "Framer Motion", "Auto-Focus"],
    image:
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200&q=80",
    href: "https://redk-motors.me/",
  },
  {
    id: "moove-city",
    title: "Moove City",
    description:
      "Solution de mobilité urbaine. Interface dynamique axée sur la conversion et la clarté des services de transport.",
    techs: ["UX/UI", "Next.js", "Mobile-First"],
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=1200&q=80",
    href: "https://www.moovecity.fr/",
  },
] as const;

export function SelectedWorks() {
  return (
    <section
      id="selected-works"
      className="w-full max-w-[100vw] overflow-x-hidden px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-32"
      aria-labelledby="selected-works-title"
    >
      <ScrollReveal>
        <h2
          id="selected-works-title"
          className="mb-6 font-extralight tracking-[0.2em] text-[#f5f5f0]"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          <span className="text-2xl sm:text-4xl md:text-5xl">Selected Works</span>
        </h2>
        <p className="mb-8 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:mb-10 sm:max-w-2xl sm:text-base md:mb-20 md:text-lg">
          {"L'excellence technique au service de l'élégance."}
        </p>
      </ScrollReveal>

      <ul className="grid w-full max-w-[100vw] grid-cols-1 gap-8 sm:gap-16 md:gap-24">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.12}>
            <li className="min-w-0 w-full">
              <article className="group">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f0]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <div className="relative mb-4 w-full max-w-[100%] overflow-hidden sm:mb-6 md:mb-8">
                    <motion.div
                      className="aspect-[16/10] w-full"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Image
                        src={project.image}
                        alt={`${project.title} - visuel du projet`}
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
