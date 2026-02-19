"use client";

import { motion } from "framer-motion";

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

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[100dvh] min-h-screen w-full max-w-[100vw] flex-col items-center justify-center overflow-hidden px-4 pt-24 sm:px-8 sm:pt-28 md:px-16"
      aria-labelledby="hero-title"
      style={{
        paddingTop: "max(6rem, calc(5rem + env(safe-area-inset-top)))",
      }}
    >
      <motion.h1
        id="hero-title"
        className="flex w-full max-w-[100%] flex-wrap justify-center gap-0.5 overflow-hidden px-1 font-extralight leading-[1.05] tracking-tight text-[#f5f5f0] sm:gap-1 sm:tracking-[0.08em] md:gap-2 md:tracking-[0.15em]"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {titleLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={letterVariants}
            className="font-extralight"
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(2rem, 10vw, 8rem)",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.h1>
      <motion.p
        variants={subtitleVariants}
        initial="hidden"
        animate="visible"
        className="mt-6 max-w-[90vw] px-2 text-center text-sm font-light leading-[1.8] tracking-wide text-[#f5f5f0]/90 sm:mt-8 sm:max-w-2xl sm:text-base md:mt-12 md:text-lg md:tracking-[0.05em]"
      >
        {"L'excellence numérique, à votre service."}
      </motion.p>
    </section>
  );
}
