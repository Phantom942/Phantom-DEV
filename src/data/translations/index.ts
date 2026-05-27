import { fr } from "./fr";
import { enGb } from "./en-gb";
import { enUs } from "./en-us";
import type { Locale } from "@/i18n";

export type TranslationPack = typeof fr | typeof enGb | typeof enUs;

export const translations: Record<Locale, TranslationPack> = {
  fr,
  "en-GB": enGb,
  "en-US": enUs,
};

export type TranslationKey = keyof TranslationPack;
