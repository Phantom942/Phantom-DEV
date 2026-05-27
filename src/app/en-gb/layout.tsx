import type { ReactNode } from "react";
import { SetDocumentLang } from "@/components/SetDocumentLang";
import { TranslationsProvider } from "@/context/TranslationsContext";
import { enGb } from "@/data/translations/en-gb";

export default function EnGbLayout({ children }: { children: ReactNode }) {
  return (
    <TranslationsProvider value={enGb}>
      <SetDocumentLang lang="en-GB" />
      {children}
    </TranslationsProvider>
  );
}
