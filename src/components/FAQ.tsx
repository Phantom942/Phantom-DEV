"use client";

import { ScrollReveal } from "./ScrollReveal";
import { faqItems } from "@/data/faq";

export function FAQ() {
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
            Questions fréquentes
          </span>
        </h2>
        <dl className="mx-auto max-w-2xl space-y-6">
          {faqItems.map((item, index) => (
            <ScrollReveal key={index} delay={index * 0.05}>
              <div className="border-b border-[#f5f5f0]/5 pb-6 last:border-0">
                <dt className="mb-2 text-sm font-light tracking-[0.06em] text-[#f5f5f0]">
                  {item.question}
                </dt>
                <dd className="text-sm leading-[1.7] tracking-[0.02em] text-[#f5f5f0]/75">
                  {item.answer}
                </dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </ScrollReveal>
    </section>
  );
}
