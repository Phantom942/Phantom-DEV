"use client";

import { useEffect, useState } from "react";

function prefersLightMotion(): boolean {
  if (typeof window === "undefined") return true;
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  );
}

/** Animations légères : mobile, tactile, ou préférence utilisateur. Démarre léger (LCP). */
export function useLightMotion(): boolean {
  const [lightMotion, setLightMotion] = useState(true);

  useEffect(() => {
    const mqs = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(pointer: coarse)"),
    ];
    const update = () => setLightMotion(prefersLightMotion());
    update();
    mqs.forEach((mq) => mq.addEventListener("change", update));
    return () => mqs.forEach((mq) => mq.removeEventListener("change", update));
  }, []);

  return lightMotion;
}
