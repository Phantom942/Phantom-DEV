"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { TranslationPack } from "@/data/translations/index";

const TranslationsContext = createContext<TranslationPack | null>(null);

export function TranslationsProvider({
  value,
  children,
}: {
  value: TranslationPack;
  children: ReactNode;
}) {
  return (
    <TranslationsContext.Provider value={value}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslationPack(): TranslationPack {
  const pack = useContext(TranslationsContext);
  if (!pack) {
    throw new Error("TranslationsProvider manquant dans l’arbre React.");
  }
  return pack;
}
