"use client";

import { ScrollReveal } from "./ScrollReveal";
import { ExpertiseCards } from "./ExpertiseCards";
import { SelectedWorks } from "./SelectedWorks";

export function Sections() {
  return (
    <>
      <section
        id="expertise"
        className="min-h-screen px-8 py-32 md:px-16"
        aria-labelledby="expertise-title"
      >
        <ScrollReveal>
          <h2
            id="expertise-title"
            className="mb-6 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span className="text-4xl md:text-5xl">Expertise</span>
          </h2>
          <p className="mb-16 max-w-2xl text-lg leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/85">
            Architecture web, interfaces raffinées. Des solutions qui font la
            différence.
          </p>
        </ScrollReveal>
        <ExpertiseCards />
      </section>

      <SelectedWorks />

      <section
        id="projets"
        className="min-h-screen px-8 py-32 md:px-16"
        aria-labelledby="projets-title"
      >
        <ScrollReveal>
          <h2
            id="projets-title"
            className="mb-16 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span className="text-4xl md:text-5xl">Projets</span>
          </h2>
          <p className="max-w-2xl text-lg leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/85">
            Réalisations à venir.
          </p>
        </ScrollReveal>
      </section>

      <section
        id="contact"
        className="min-h-screen px-8 py-32 md:px-16"
        aria-labelledby="contact-title"
      >
        <ScrollReveal>
          <h2
            id="contact-title"
            className="mb-16 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            <span className="text-4xl md:text-5xl">Contact</span>
          </h2>
          <p className="max-w-2xl text-lg leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/85">
            Discutons de votre projet.
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}
