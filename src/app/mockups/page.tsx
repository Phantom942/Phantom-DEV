import type { Metadata } from "next";
import { SiteMockupsPreview } from "@/components/SiteMockupsPreview";

export const metadata: Metadata = {
  title: "Mockups — aperçu sites",
  description: "Page interne pour visualiser les mockups des réalisations.",
  robots: { index: false, follow: false },
};

export default function MockupsPage() {
  return <SiteMockupsPreview />;
}
