"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Mail } from "lucide-react";

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
  return (
    <section
      className="relative flex min-h-[100dvh] min-h-screen w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-8 sm:pt-28 md:px-16"
      aria-labelledby="hero-title"
      style={{
        paddingTop: "max(6rem, calc(5rem + env(safe-area-inset-top)))",
      }}
    >
      <h1 id="hero-title" className="sr-only">
        PhantomDev — Création de sites web premium sur-mesure
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
        Sites web sur-mesure qui convertissent. E-commerce, vitrines,
        applications premium. Performance & design au service de votre marque.
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
        >
          Voir mes réalisations
          <ArrowDown size={16} className="rotate-[-90deg]" strokeWidth={1.5} />
        </Link>
        <Link
          href="#contact"
          className="flex items-center gap-2 border border-[#d4af37]/50 bg-[#d4af37]/10 px-6 py-3 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#d4af37]/20"
        >
          Demander un devis
          <Mail size={16} strokeWidth={1.5} />
        </Link>
      </motion.div>
    </section>
  );
}
