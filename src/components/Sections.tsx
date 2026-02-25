"use client";

import { Suspense } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslations } from "@/hooks/useTranslations";
import { ExpertiseCards } from "./ExpertiseCards";
import { SelectedWorks } from "./SelectedWorks";
import { FAQ } from "./FAQ";
import { WhatsAppCtaButton } from "./WhatsAppButton";
import { WhatsAppForm } from "./WhatsAppForm";

export function Sections() {
  const { t } = useTranslations();
  return (
    <>
      <ScrollReveal>
      <section
        id="expertise"
        className="w-full max-w-full overflow-x-clip px-4 py-16 sm:px-8 sm:py-20 md:px-16 md:py-24"
        aria-labelledby="expertise-title"
      >
        <ScrollReveal>
          <h2
            id="expertise-title"
            className="mb-6 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-2xl sm:text-4xl md:text-5xl">{t.sections.expertise}</span>
          </h2>
          <p className="mb-8 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:mb-12 sm:max-w-2xl sm:text-base md:mb-16 md:text-lg">
            {t.sections.expertiseDesc}
          </p>
        </ScrollReveal>
        <ExpertiseCards />
      </section>
      </ScrollReveal>

      <ScrollReveal delay={0.03}>
        <p className="px-4 py-8 text-center text-sm font-light italic tracking-[0.02em] text-[#f5f5f0]/50 sm:py-10 md:py-12">
          {t.sections.transition}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
      <SelectedWorks />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
      <FAQ />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
      <section
        id="contact"
        className="w-full max-w-full overflow-x-clip px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-28"
        aria-labelledby="contact-title"
      >
        <ScrollReveal>
          <h2
            id="contact-title"
            className="mb-8 font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-2xl sm:text-4xl md:text-5xl">{t.sections.contact}</span>
          </h2>
          <p className="mb-6 max-w-[95vw] text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/85 sm:max-w-2xl sm:text-base md:mb-8 md:text-lg">
            {t.sections.contactDesc}
          </p>
          <p className="mb-10 text-xs font-light tracking-[0.08em] text-[#f5f5f0]/60 sm:mb-12">
            {t.sections.performance}
          </p>
          <Suspense fallback={null}>
            <WhatsAppForm />
          </Suspense>
          <p className="mt-6 text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/40">
            {t.sections.or}
          </p>
          <p className="mt-2 text-center">
            <WhatsAppCtaButton />
          </p>
          <p className="mt-8 text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/40">
            {t.sections.response}
          </p>
        </ScrollReveal>
      </section>
      </ScrollReveal>
    </>
  );
}
