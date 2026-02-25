"use client";

import { Suspense } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { ExpertiseCards } from "./ExpertiseCards";
import { SelectedWorks } from "./SelectedWorks";
import { WhatsAppCtaButton } from "./WhatsAppButton";
import { WhatsAppForm } from "./WhatsAppForm";

export function Sections() {
  return (
    <>
      <ScrollReveal>
      <section
        id="expertise"
        className="min-h-screen w-full max-w-[100vw] overflow-x-hidden px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-32"
        aria-labelledby="expertise-title"
      >
        <ScrollReveal>
          <h2
            id="expertise-title"
            className="mb-6 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-2xl sm:text-4xl md:text-5xl">Expertise</span>
          </h2>
          <p className="mb-8 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:mb-12 sm:max-w-2xl sm:text-base md:mb-16 md:text-lg">
            Architecture web premium, interfaces raffinées. Des solutions sur-mesure
            qui convertissent et renforcent votre image.
          </p>
        </ScrollReveal>
        <ExpertiseCards />
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
      <SelectedWorks />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
      <section
        id="contact"
        className="w-full max-w-[100vw] overflow-x-hidden px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-28"
        aria-labelledby="contact-title"
      >
        <ScrollReveal>
          <h2
            id="contact-title"
            className="mb-8 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-2xl sm:text-4xl md:text-5xl">Contact</span>
          </h2>
          <p className="mb-6 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:max-w-2xl sm:text-base md:mb-8 md:text-lg">
            Un projet en tête ? Contactez-moi sur WhatsApp pour un devis gratuit sous 48h, sans engagement.
          </p>
          <p className="mb-10 text-xs font-light tracking-[0.08em] text-[#f5f5f0]/60 sm:mb-12">
            Garantie performance : Lighthouse 90+ sur tous les sites livrés.
          </p>
          <Suspense fallback={null}>
            <WhatsAppForm />
          </Suspense>
          <p className="mt-6 text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/40">
            ou
          </p>
          <p className="mt-2 text-center">
            <WhatsAppCtaButton />
          </p>
          <p className="mt-8 text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/40">
            Réponse sous 48h · Sans engagement
          </p>
        </ScrollReveal>
      </section>
      </ScrollReveal>
    </>
  );
}
