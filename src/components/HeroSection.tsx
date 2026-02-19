"use client";

import { motion } from "framer-motion";

const titleLetters = "PHANTOM".split("");

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  }),
};

const letterVariants = {
  hidden: {
    opacity: 0,
    y: 80,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const subtitleVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-screen max-w-full flex-col items-center justify-center overflow-x-hidden px-4 pt-24 sm:px-8 md:px-16"
      aria-labelledby="hero-title"
    >
      <motion.h1
        id="hero-title"
        className="flex flex-nowrap justify-center gap-0.5 font-extralight leading-[1.1] tracking-[0.08em] text-[#f5f5f0] sm:gap-1 sm:tracking-[0.12em] md:gap-2 md:tracking-[0.2em]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {titleLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={letterVariants}
            className="font-extralight text-[11vw] tracking-[0.05em] sm:text-7xl sm:tracking-[0.1em] md:text-9xl md:tracking-[0.15em]"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="mt-8 max-w-2xl px-2 text-center text-sm font-light leading-[1.85] tracking-[0.06em] text-[#f5f5f0]/90 sm:mt-10 sm:text-base sm:tracking-[0.08em] md:mt-12 md:text-lg md:leading-[1.9] md:tracking-[0.1em]"
      >
        {"L'excellence numérique, à votre service."}
      </motion.p>
    </section>
  );
}
