import type { ReactNode } from "react";
import { SetDocumentLang } from "@/components/SetDocumentLang";

export default function EnGbLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SetDocumentLang lang="en-GB" />
      {children}
    </>
  );
}
