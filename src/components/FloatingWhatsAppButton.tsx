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
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full border border-[#25D366]/50 bg-[#25D366]/20 shadow-lg shadow-black/30 transition-all hover:scale-110 hover:bg-[#25D366]/30 hover:shadow-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#353839] md:bottom-8 md:right-8 md:h-16 md:w-16"
      aria-label={label}
    >
      <MessageCircle size={24} className="text-[#25D366]" strokeWidth={1.5} />
    </a>
  );
}
