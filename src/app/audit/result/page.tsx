import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CursorAndGlow } from "@/components/CursorAndGlow";
import { AuditResultClient } from "@/components/AuditResultClient";

export const metadata: Metadata = {
  title: "Résultat audit site | PhantomDev",
  robots: { index: false, follow: false },
};

export default function AuditResultPage() {
  return (
    <div className="relative min-h-screen w-full bg-transparent">
      <CursorAndGlow />
      <Navbar />
      <main id="main" className="mx-auto w-full max-w-5xl px-4 pt-24 pb-16 sm:pt-32 sm:pb-24">
        <Suspense fallback={null}>
          <AuditResultClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
