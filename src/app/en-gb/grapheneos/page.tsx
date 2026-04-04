import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { GrapheneOSPageContent } from "@/components/GrapheneOSPageContent";
import { GraphenePageJsonLd } from "@/components/GraphenePageJsonLd";
import { getGraphenePageMetadata } from "@/lib/graphene-metadata";
import { getBreadcrumbTrail } from "@/lib/breadcrumb";

export const metadata = getGraphenePageMetadata("en-GB");

export default function EnGBGrapheneOSPage() {
  const breadcrumbSchema = getBreadcrumbTrail([
    { path: "/en-gb/grapheneos", label: "GrapheneOS" },
  ]);

  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GraphenePageJsonLd locale="en-GB" />
      <CursorAndGlow />
      <Navbar />
      <GrapheneOSPageContent locale="en-GB" />
      <Footer />
    </div>
  );
}
