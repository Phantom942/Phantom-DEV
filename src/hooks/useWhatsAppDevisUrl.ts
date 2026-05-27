"use client";

import { useMemo } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { getWhatsAppMessage } from "@/lib/whatsapp-messages";
import type { Locale } from "@/i18n";

function localeFromPath(pathname: string): Locale {
  if (pathname.startsWith("/en-us")) return "en-US";
  if (pathname.startsWith("/en-gb")) return "en-GB";
  return "fr";
}

/** URL WhatsApp avec message pré-rempli selon la locale et `?type=` (ou type passé en prop). */
export function useWhatsAppDevisUrl(explicitType?: string | null): string {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const locale = localeFromPath(pathname);
  const type = explicitType ?? searchParams.get("type");

  return useMemo(
    () => getWhatsAppDevisUrl(getWhatsAppMessage(locale, type)),
    [locale, type]
  );
}
