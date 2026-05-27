"use client";

import { useTranslations } from "@/hooks/useTranslations";

export function ProcessSection() {
  const { t } = useTranslations();

  const steps =
    "processSteps" in t.sections && Array.isArray(t.sections.processSteps)
      ? t.sections.processSteps
      : [];

  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      className="w-full max-w-full overflow-x-clip border-t border-[#f5f5f0]/5 bg-[#323538] px-4 py-16 sm:px-8 sm:py-20 md:px-16 md:py-24"
      aria-labelledby="process-title"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2
            id="process-title"
            className="text-center font-extralight tracking-[0.2em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-2xl sm:text-4xl md:text-5xl">{t.sections.processTitle}</span>
          </h2>
        </header>

        <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step, idx) => (
            <li
              key={`${step.title}-${idx}`}
              className="relative rounded-lg border border-[#f5f5f0]/10 bg-[#2c2f31]/35 px-6 py-7"
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 font-mono text-xs font-medium text-[#d4af37]"
                  aria-hidden
                >
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-sm font-light tracking-[0.12em] text-[#f5f5f0] sm:text-base">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm font-light leading-[1.8] tracking-normal text-[#f5f5f0]/80">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
