"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const BASE = "https://phantomdev.fr";

export function HreflangLinks() {
  const pathname = usePathname();

  useEffect(() => {
    const frPath = pathname.replace(/^\/en-(gb|us)/, "") || "/";
    const enGbPath = pathname.startsWith("/en-gb") ? pathname : `/en-gb${frPath === "/" ? "" : frPath}`;
    const enUsPath = pathname.startsWith("/en-us") ? pathname : `/en-us${frPath === "/" ? "" : frPath}`;
    const alternates = [
      { hreflang: "fr", href: `${BASE}${frPath}` },
      { hreflang: "en-GB", href: `${BASE}${enGbPath}` },
      { hreflang: "en-US", href: `${BASE}${enUsPath}` },
      { hreflang: "x-default", href: `${BASE}${frPath}` },
    ];
    const ids: string[] = [];
    alternates.forEach(({ hreflang, href }) => {
      const id = `hreflang-${hreflang}`;
      ids.push(id);
      let el = document.getElementById(id) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.id = id;
        el.rel = "alternate";
        el.setAttribute("hreflang", hreflang);
        document.head.appendChild(el);
      }
      el.href = href;
    });
    return () => ids.forEach((id) => document.getElementById(id)?.remove());
  }, [pathname]);

  return null;
}
