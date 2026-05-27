"use client";

import { useTranslations } from "@/hooks/useTranslations";

export function ProcessSection() {
  const { t } = useTranslations();

  const steps: { title: string; body: string }[] = Array.isArray(t.sections.processSteps)
    ? [...t.sections.processSteps]
    : [];

  if (steps.length === 0) return null;

  return (
    <section
      id="process"
      className="w-full max-w-full overflow-x-clip border-t border-zinc-800/80 bg-transparent px-4 py-16 sm:px-8 sm:py-20 md:px-16 md:py-24"
      aria-labelledby="process-title"
    >
      <div className="mx-auto w-full max-w-7xl">
        <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <h2 id="process-title" className="heading-display text-center">
            <span className="text-2xl sm:text-4xl md:text-5xl">{t.sections.processTitle}</span>
          </h2>
          <div className="stealth-divider mx-auto mt-8 max-w-xs" aria-hidden />
        </header>

        <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step, idx) => (
            <li
              key={`${step.title}-${idx}`}
              className="stealth-card relative rounded-lg px-6 py-7"
            >
              <div className="mb-4 inline-flex items-center gap-3">
                <span
                  className="font-tech inline-flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-400"
                  aria-hidden
                >
                  {(idx + 1).toString().padStart(2, "0")}
                </span>
                <h3 className="text-sm font-medium tracking-[0.1em] text-zinc-100 sm:text-base">
                  {step.title}
                </h3>
              </div>
              <p className="text-sm font-light leading-[1.8] tracking-normal text-zinc-400">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
