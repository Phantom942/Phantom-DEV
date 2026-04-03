import type { Metadata } from "next";
import { PreviewRealisationMockups } from "@/components/PreviewRealisationMockups";

export const metadata: Metadata = {
  title: "Prévisualisation — Réalisations + mockups",
  description: "Aperçu interne : cartes portfolio avec logo et mockup site.",
  robots: { index: false, follow: false },
};

export default function PreviewRealisationMockupsPage() {
  return <PreviewRealisationMockups />;
}
