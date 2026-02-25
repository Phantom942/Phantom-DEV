"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { getLocaleFromPath } from "@/i18n";
import { translations } from "@/data/translations";

export function useTranslations() {
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const t = useMemo(() => translations[locale], [locale]);

  return { t, locale };
}
