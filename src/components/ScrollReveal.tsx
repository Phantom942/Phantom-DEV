"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { useLightMotion } from "@/hooks/useLightMotion";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const lightMotion = useLightMotion();
  const isInView = useInView(ref, {
    once,
    margin: lightMotion ? "0px" : "-60px 0px -60px 0px",
    amount: lightMotion ? 0.05 : 0.15,
  });

  const offsetY = lightMotion ? 0 : 28;
  const animateState = isInView
    ? { opacity: 1, y: 0 }
    : { opacity: lightMotion ? 1 : 0, y: offsetY };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: lightMotion ? 1 : 0, y: offsetY }}
      animate={animateState}
      transition={{
        duration: lightMotion ? 0 : 0.45,
        delay: lightMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
