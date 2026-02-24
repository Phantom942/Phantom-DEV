"use client";

import { ScrollReveal } from "./ScrollReveal";
import { testimonials } from "@/data/testimonials";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  return (
    <section
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-[#f5f5f0]/5 px-4 py-16 sm:px-8 sm:py-24 md:px-16 md:py-32"
      aria-labelledby="testimonials-title"
    >
      <ScrollReveal>
        <h2
          id="testimonials-title"
          className="mb-4 text-center font-extralight tracking-[0.2em] text-[#f5f5f0]/70"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-lg sm:text-xl md:text-2xl">
            Témoignages
          </span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-xs font-light tracking-[0.08em] text-[#f5f5f0]/50 sm:text-sm">
          Retours de clients ayant fait confiance à PhantomDev pour leur présence web
        </p>
      </ScrollReveal>
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((t, index) => (
          <ScrollReveal key={t.id} delay={index * 0.1}>
            <blockquote className="relative rounded-sm border border-[#f5f5f0]/10 bg-[#0a0a0a]/50 px-6 py-8 sm:px-8 sm:py-10">
              <Quote
                size={28}
                className="absolute right-4 top-4 text-[#d4af37]/20"
                strokeWidth={1}
                aria-hidden
              />
              <p className="mb-6 text-sm leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/90 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </p>
              <footer className="border-t border-[#f5f5f0]/10 pt-4">
                <p className="text-xs font-light tracking-[0.08em] text-[#f5f5f0]">
                  {t.author}
                </p>
                <p className="mt-0.5 text-xs font-light tracking-[0.06em] text-[#f5f5f0]/60">
                  {t.role} — {t.result}
                </p>
              </footer>
            </blockquote>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
