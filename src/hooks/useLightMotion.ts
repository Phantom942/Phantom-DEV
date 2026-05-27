"use client";

import { useReducedMotion } from "framer-motion";
import { useIsNarrow } from "./useIsNarrow";

/** Animations légères : mobile, tactile, ou préférence utilisateur. */
export function useLightMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const narrow = useIsNarrow();
  return Boolean(prefersReduced) || narrow;
}
