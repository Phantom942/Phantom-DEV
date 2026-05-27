"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";

export function FloatingWhatsAppButton() {
  const label = "Demander un devis sur WhatsApp";

  return (
    <a
      href={getWhatsAppDevisUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/20 shadow-lg shadow-black/30 transition-all hover:scale-110 hover:bg-emerald-500/30 hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 md:h-16 md:w-16"
      style={{
        bottom: "max(1.5rem, env(safe-area-inset-bottom))",
        right: "max(1.5rem, env(safe-area-inset-right))",
      }}
      aria-label={label}
    >
      <MessageCircle size={24} className="text-emerald-400" strokeWidth={1.5} />
    </a>
  );
}
