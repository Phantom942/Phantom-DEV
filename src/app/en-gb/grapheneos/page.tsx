import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { GrapheneOSPageContent } from "@/components/GrapheneOSPageContent";
import { GraphenePageJsonLd } from "@/components/GraphenePageJsonLd";
import { getGraphenePageMetadata } from "@/lib/graphene-metadata";

export const metadata = getGraphenePageMetadata("en-GB");

export default function EnGBGrapheneOSPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <GraphenePageJsonLd locale="en-GB" />
      <CursorAndGlow />
      <Navbar />
      <GrapheneOSPageContent locale="en-GB" />
      <Footer />
    </div>
  );
}
