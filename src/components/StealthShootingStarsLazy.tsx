"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const ShootingStarsCodePen = dynamic(
  () =>
    import("./ShootingStarsCodePen").then((m) => ({
      default: m.ShootingStarsCodePen,
    })),
  { ssr: false }
);

/** Étoiles filantes — désactivées sur téléphone (perf + batterie). */
export function StealthShootingStarsLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!narrow && !coarse && !reduced) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;
  return <ShootingStarsCodePen />;
}
