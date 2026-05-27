"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CustomCursor = dynamic(
  () =>
    import("@/components/CustomCursor").then((m) => ({ default: m.CustomCursor })),
  { ssr: false }
);

const MouseGlow = dynamic(
  () =>
    import("@/components/MouseGlow").then((m) => ({ default: m.MouseGlow })),
  { ssr: false }
);

/** Curseur + halo souris — desktop uniquement (inutile sur téléphone). */
export function CursorAndGlow() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!coarse && !narrow && !reduced) {
      setEnabled(true);
    }
  }, []);

  if (!enabled) return null;

  return (
    <>
      <CustomCursor />
      <MouseGlow />
    </>
  );
}
