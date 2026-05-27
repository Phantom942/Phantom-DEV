"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getLocaleFromPath } from "@/i18n";
import { useTranslationPack } from "@/context/TranslationsContext";

export function useTranslations() {
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const t = useTranslationPack();

  return { t, locale };
}
