"use client";

import { useTranslations } from "@/hooks/useTranslations";

export function SkipToContent() {
  const { t } = useTranslations();
  const label = "skipToContent" in t ? (t as { skipToContent: string }).skipToContent : "Aller au contenu principal";

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-[#d4af37] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-black focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:ring-offset-2 focus:ring-offset-black"
    >
      {label}
    </a>
  );
}
