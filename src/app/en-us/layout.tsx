import type { ReactNode } from "react";
import { SetDocumentLang } from "@/components/SetDocumentLang";

export default function EnUsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SetDocumentLang lang="en-US" />
      {children}
    </>
  );
}
