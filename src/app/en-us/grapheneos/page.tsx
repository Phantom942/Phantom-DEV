import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { GrapheneOSPageContent } from "@/components/GrapheneOSPageContent";
import { GraphenePageJsonLd } from "@/components/GraphenePageJsonLd";
import { getGraphenePageMetadata } from "@/lib/graphene-metadata";
import { getBreadcrumbTrail } from "@/lib/breadcrumb";

export const metadata = getGraphenePageMetadata("en-US");

export default function EnUSGrapheneOSPage() {
  const breadcrumbSchema = getBreadcrumbTrail([
    { path: "/en-us/grapheneos", label: "GrapheneOS" },
  ]);

  return (
    <div className="relative min-h-screen w-full bg-[#353839]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <GraphenePageJsonLd locale="en-US" />
      <CursorAndGlow />
      <Navbar />
      <GrapheneOSPageContent locale="en-US" />
      <Footer />
    </div>
  );
}
