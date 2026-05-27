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

/** Étoiles filantes — chargées après hydratation ; masquées si réduction des mouvements. */
export function StealthShootingStarsLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;
  return <ShootingStarsCodePen />;
}
