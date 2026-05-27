"use client";

import { useEffect, useState } from "react";

/** Téléphone / tablette étroite ou entrée tactile principale. */
export function useIsNarrow(): boolean {
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const mqWidth = window.matchMedia("(max-width: 767px)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");

    const update = () => setNarrow(mqWidth.matches || mqCoarse.matches);
    update();

    mqWidth.addEventListener("change", update);
    mqCoarse.addEventListener("change", update);
    return () => {
      mqWidth.removeEventListener("change", update);
      mqCoarse.removeEventListener("change", update);
    };
  }, []);

  return narrow;
}
