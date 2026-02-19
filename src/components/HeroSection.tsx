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
      className="relative flex min-h-screen flex-col items-center justify-center px-8 pt-24 md:px-16"
      aria-labelledby="hero-title"
    >
      <motion.h1
        id="hero-title"
        className="flex flex-wrap justify-center gap-1 font-extralight leading-[1.1] tracking-[0.2em] text-[#f5f5f0] md:gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {titleLetters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            variants={letterVariants}
            className="font-extralight tracking-[0.2em] text-7xl md:text-8xl lg:text-9xl xl:text-[10rem]"
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
        className="mt-12 max-w-2xl text-center text-base font-light leading-[1.85] tracking-[0.08em] text-[#f5f5f0]/90 md:text-lg md:leading-[1.9] md:tracking-[0.1em]"
      >
        L'excellence numérique, à votre service.
      </motion.p>
    </section>
  );
}
