"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "./ScrollReveal";
import { useTranslations } from "@/hooks/useTranslations";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const { t } = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="w-full max-w-full overflow-x-clip border-t border-[#f5f5f0]/5 px-4 py-12 sm:px-8 sm:py-16 md:px-16 md:py-20"
      aria-labelledby="faq-title"
    >
      <ScrollReveal>
        <h2
          id="faq-title"
          className="mb-8 font-extralight tracking-[0.2em] text-[#f5f5f0]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl">
            {t.faq.title}
          </span>
        </h2>
        <dl className="mx-auto max-w-2xl space-y-2">
          {t.faq.items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal key={index} delay={index * 0.04}>
                <div
                  className="overflow-hidden rounded-sm border border-[#f5f5f0]/10 bg-[#2c2f31]/40 transition-colors hover:border-[#f5f5f0]/15"
                  aria-expanded={isOpen}
                >
                  <dt>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-light tracking-[0.06em] text-[#f5f5f0] transition-colors hover:text-[#f5f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 focus-visible:ring-inset"
                      aria-controls={`faq-answer-${index}`}
                      id={`faq-question-${index}`}
                      aria-expanded={isOpen}
                    >
                      <span>{item.q}</span>
                      <ChevronDown
                        size={18}
                        className={`shrink-0 text-[#d4af37]/70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </button>
                  </dt>
                  <dd id={`faq-answer-${index}`} aria-labelledby={`faq-question-${index}`}>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="border-t border-[#f5f5f0]/5 px-5 py-4 text-sm leading-[1.7] tracking-[0.02em] text-[#f5f5f0]/75">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </dd>
                </div>
              </ScrollReveal>
            );
          })}
        </dl>
      </ScrollReveal>
    </section>
  );
}
