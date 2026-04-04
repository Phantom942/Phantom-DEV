import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { GrapheneOSPageContent } from "@/components/GrapheneOSPageContent";
import { GraphenePageJsonLd } from "@/components/GraphenePageJsonLd";
import { getGraphenePageMetadata } from "@/lib/graphene-metadata";

export const metadata = getGraphenePageMetadata("fr");

export default function GrapheneOSPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <GraphenePageJsonLd locale="fr" />
      <CursorAndGlow />
      <Navbar />
      <GrapheneOSPageContent locale="fr" />
      <Footer />
    </div>
  );
}
