"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, MessageCircle } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { useTranslations } from "@/hooks/useTranslations";

const titleLetters = "PHANTOM".split("");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: () => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const pricingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.95,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroSection() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  return (
    <section
      className="relative flex min-h-[100dvh] min-h-screen w-full max-w-full flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-8 sm:pt-28 md:px-16"
      aria-labelledby="hero-title"
      style={{
        paddingTop: "max(6rem, calc(5rem + env(safe-area-inset-top)))",
      }}
    >
      <h1 id="hero-title" className="sr-only">
        {t.hero.title}
      </h1>
      <motion.div
        className="flex w-full max-w-[100%] flex-wrap justify-center gap-0.5 overflow-hidden px-1 font-extralight leading-[1.05] tracking-tight text-[#f5f5f0] sm:gap-1 sm:tracking-[0.08em] md:gap-2 md:tracking-[0.15em]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        aria-hidden
      >
        {titleLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={letterVariants}
            className="font-extralight"
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2rem, 10vw, 8rem)",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
      <motion.p
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 max-w-[90vw] px-2 text-center text-sm font-light leading-[1.8] tracking-wide text-[#f5f5f0]/90 sm:mt-8 sm:max-w-2xl sm:text-base md:mt-12 md:text-lg md:tracking-[0.05em]"
      >
        {t.hero.subtitle}
      </motion.p>
      <motion.p
        variants={pricingVariants}
        initial="hidden"
        animate="visible"
        className="mt-3 text-center text-xs font-light tracking-[0.12em] text-[#f5f5f0]/70 sm:text-sm"
      >
        <Link
          href={localePrefix ? `${localePrefix}/services` : "/services"}
          className="inline-block underline decoration-[#d4af37]/40 underline-offset-2 transition-colors hover:text-[#f5f5f0]/90 hover:decoration-[#d4af37]/70"
          aria-label={t.hero.seeServices}
        >
          {t.hero.seeServices}
        </Link>
      </motion.p>
      <motion.div
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
        className="mt-10 flex flex-col items-center gap-4 sm:mt-12 sm:flex-row sm:gap-6"
      >
        <Link
          href="#projets"
          className="flex items-center gap-2 border border-[#f5f5f0]/30 bg-transparent px-6 py-3 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:border-[#f5f5f0]/60 hover:bg-[#f5f5f0]/5"
          aria-label={t.hero.seeProjects}
        >
          {t.hero.seeProjects}
          <ArrowDown size={16} className="rotate-[-90deg]" strokeWidth={1.5} />
        </Link>
        <a
          href={getWhatsAppDevisUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-6 py-3 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20"
          aria-label={t.hero.requestQuote}
        >
          {t.hero.requestQuote}
          <MessageCircle size={16} strokeWidth={1.5} />
        </a>
      </motion.div>
      <motion.div
        variants={ctaVariants}
        initial="hidden"
        animate="visible"
        className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] font-light tracking-[0.1em] text-[#f5f5f0]/60 sm:gap-x-12 sm:text-xs"
      >
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>⚡</span> {t.hero.badge1}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>🔒</span> {t.hero.badge2}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span aria-hidden>🤝</span> {t.hero.badge3}
        </span>
      </motion.div>
    </section>
  );
}
