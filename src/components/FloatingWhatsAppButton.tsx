"use client";

import { Suspense } from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { useWhatsAppDevisUrl } from "@/hooks/useWhatsAppDevisUrl";

const floatingBtnClass =
  "fixed z-50 flex h-14 w-14 touch-manipulation items-center justify-center rounded-full border border-cyan-500/50 bg-cyan-500/15 shadow-lg shadow-black/30 transition-colors hover:border-cyan-400/70 hover:bg-cyan-500/25 md:h-16 md:w-16 md:transition-all md:hover:scale-110 md:hover:shadow-[0_0_24px_rgba(34,211,238,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950";

function FloatingWhatsAppInner() {
  const href = useWhatsAppDevisUrl();
  const label = "Demander un devis sur WhatsApp";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={floatingBtnClass}
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.5rem, env(safe-area-inset-right))",
      }}
      aria-label={label}
    >
      <MessageCircle size={24} className="text-zinc-100" strokeWidth={1.5} />
    </a>
  );
}

function FloatingWhatsAppFallback() {
  return (
    <a
      href={getWhatsAppDevisUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className={floatingBtnClass}
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.5rem, env(safe-area-inset-right))",
      }}
      aria-label="WhatsApp"
    >
      <MessageCircle size={24} className="text-zinc-100" strokeWidth={1.5} />
    </a>
  );
}

export function FloatingWhatsAppButton() {
  return (
    <Suspense fallback={<FloatingWhatsAppFallback />}>
      <FloatingWhatsAppInner />
    </Suspense>
  );
}
