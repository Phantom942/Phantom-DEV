import type { ReactNode } from "react";
import { SetDocumentLang } from "@/components/SetDocumentLang";
import { TranslationsProvider } from "@/context/TranslationsContext";
import { enUs } from "@/data/translations/en-us";

export default function EnUsLayout({ children }: { children: ReactNode }) {
  return (
    <TranslationsProvider value={enUs}>
      <SetDocumentLang lang="en-US" />
      {children}
    </TranslationsProvider>
  );
}
