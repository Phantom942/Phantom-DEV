"use client";

import { useTranslations } from "@/hooks/useTranslations";

export function SkipToContent() {
  const { t } = useTranslations();
  const label = "skipToContent" in t ? (t as { skipToContent: string }).skipToContent : "Aller au contenu principal";

  return (
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-emerald-500 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-zinc-950 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
    >
      {label}
    </a>
  );
}
