"use client";

import { ScrollReveal } from "./ScrollReveal";
import { useTranslations } from "@/hooks/useTranslations";
import { ExpertiseCards } from "./ExpertiseCards";
import { SelectedWorks } from "./SelectedWorks";
import { FAQ } from "./FAQ";
import { WhatsAppCtaButton } from "./WhatsAppButton";
import { ProcessSection } from "./ProcessSection";

export function Sections() {
  const { t } = useTranslations();
  return (
    <>
      <ScrollReveal>
        <section
          id="expertise"
          className="section-deferred w-full max-w-full overflow-x-clip bg-transparent px-4 py-16 sm:px-8 sm:py-20 md:px-16 md:py-24"
          aria-labelledby="expertise-title"
        >
          <div className="mx-auto w-full max-w-7xl">
            <h2 id="expertise-title" className="heading-display mb-6 text-center">
              <span className="text-2xl sm:text-4xl md:text-5xl">{t.sections.expertise}</span>
            </h2>
            <div className="stealth-divider mx-auto mb-8 max-w-xs sm:mb-10" aria-hidden />
            <p className="mx-auto mb-8 max-w-2xl text-center text-base leading-relaxed tracking-normal text-zinc-300 sm:mb-12 sm:max-w-3xl sm:text-lg md:mb-16 md:text-xl md:leading-relaxed">
              {t.sections.expertiseDesc}
            </p>
            <ExpertiseCards />
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal delay={0.03}>
        <p className="mx-auto max-w-7xl px-4 py-8 text-center text-sm font-light italic tracking-[0.02em] text-zinc-400 sm:py-10 md:py-12">
          {t.sections.transition}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <SelectedWorks />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <div className="w-full bg-transparent">
          <FAQ />
        </div>
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <ProcessSection />
      </ScrollReveal>

      <ScrollReveal delay={0.05}>
        <section
          id="contact"
          className="section-deferred w-full max-w-full overflow-x-clip border-t border-zinc-800/80 bg-transparent px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-28"
          aria-labelledby="contact-title"
        >
          <div className="mx-auto flex w-full max-w-7xl flex-col items-center">
            <h2 id="contact-title" className="heading-display mb-8 text-center">
              <span className="text-2xl sm:text-4xl md:text-5xl">{t.sections.contact}</span>
            </h2>
            <div className="stealth-divider mx-auto mb-8 max-w-xs" aria-hidden />
            <div className="stealth-card w-full max-w-2xl rounded-lg px-6 py-10 text-center sm:px-10 sm:py-12">
              <p className="mb-6 text-sm leading-[1.8] tracking-[0.02em] text-zinc-300 sm:text-base md:mb-8 md:text-lg">
                {t.sections.contactDesc}
              </p>
              <p className="mb-10 text-xs font-light tracking-[0.08em] text-zinc-400 sm:mb-12">
                {t.sections.performance}
              </p>
              <div className="flex flex-col items-center">
                <WhatsAppCtaButton />
              </div>
              <p className="mt-8 text-center text-xs font-light tracking-[0.08em] text-zinc-400">
                {t.sections.response}
              </p>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </>
  );
}
