"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslations } from "@/hooks/useTranslations";
import { useLightMotion } from "@/hooks/useLightMotion";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const { t } = useTranslations();
  const lightMotion = useLightMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="w-full max-w-full overflow-x-clip border-t border-zinc-800/80 px-4 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto w-full max-w-7xl">
        <ScrollReveal>
          <h2
            id="faq-title"
            className="font-tech mb-8 text-center text-xl font-semibold uppercase tracking-[0.18em] text-zinc-100 sm:text-2xl md:text-3xl"
          >
            {t.faq.title}
          </h2>
          <dl className="mx-auto w-full max-w-2xl space-y-2">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div className="overflow-hidden rounded-sm border border-zinc-800 bg-zinc-900/50 transition-colors hover:border-zinc-700">
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex min-h-11 w-full touch-manipulation items-center justify-between gap-4 px-5 py-4 text-left text-sm font-light tracking-[0.06em] text-zinc-100 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-inset sm:min-h-0"
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-cyan-400/80 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </button>
                  </dt>
                  <dd id={`faq-answer-${index}`} aria-labelledby={`faq-question-${index}`}>
                    {isOpen &&
                      (lightMotion ? (
                        <p className="border-t border-zinc-800/80 px-5 py-4 text-base leading-relaxed tracking-normal text-zinc-300">
                          {item.a}
                        </p>
                      ) : (
                        <AnimatePresence initial={false}>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="border-t border-zinc-800/80 px-5 py-4 text-base leading-relaxed tracking-normal text-zinc-300">
                              {item.a}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      ))}
                  </dd>
                </div>
              </ScrollReveal>
            );
          })}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  );
}
