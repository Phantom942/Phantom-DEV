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

/** Étoiles filantes — chargées au idle ; masquées si réduction des mouvements. */
export function StealthShootingStarsLazy() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const enable = () => setEnabled(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(enable, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(enable, 1200);
    return () => clearTimeout(t);
  }, []);

  if (!enabled) return null;
  return <ShootingStarsCodePen />;
}
