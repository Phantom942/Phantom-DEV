"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { projects } from "@/data/projects";

export function TrustSection() {
  return (
    <section
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-[#f5f5f0]/5 px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-32"
      aria-labelledby="trust-title"
    >
      <ScrollReveal>
        <h2
          id="trust-title"
          className="mb-4 text-center font-extralight tracking-[0.2em] text-[#f5f5f0]/70"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-lg sm:text-xl md:text-2xl">
            Ils nous font confiance
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/50 sm:text-sm">
          Des marques exigeantes qui ont choisi PhantomDev pour leur présence
          digitale
        </p>
      </ScrollReveal>
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-12 sm:gap-16 md:gap-24">
        {projects.map((project, index) => (
          <ScrollReveal key={project.id} delay={index * 0.08}>
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grayscale transition-all duration-300 hover:grayscale-0 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5f5f0]/30 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label={`Voir ${project.title}`}
            >
              <div className="relative h-12 w-32 sm:h-14 sm:w-36 md:h-16 md:w-40">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 128px, 160px"
                  className="object-contain opacity-70 transition-opacity duration-300 hover:opacity-100"
                />
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
