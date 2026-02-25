"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function LangAttribute() {
  const pathname = usePathname();

  useEffect(() => {
    const lang =
      pathname.startsWith("/en-gb")
        ? "en-GB"
        : pathname.startsWith("/en-us")
          ? "en-US"
          : "fr";
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = "fr";
    };
  }, [pathname]);

  return null;
}
