"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";

interface WhatsAppButtonProps {
  children: React.ReactNode;
  className?: string;
  message?: string;
}

export function WhatsAppButton({
  children,
  className,
  message,
}: WhatsAppButtonProps) {
  return (
    <a
      href={getWhatsAppDevisUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Contacter PhantomDev sur WhatsApp pour un devis projet web, développement React ou Node.js"
    >
      {children}
    </a>
  );
}

export function WhatsAppCtaButton({
  message,
  className,
}: {
  message?: string;
  className?: string;
}) {
  return (
    <WhatsAppButton
      message={message}
      className={
        className ||
        "inline-flex items-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      }
    >
      <MessageCircle size={20} strokeWidth={1.5} />
      Contacter sur WhatsApp
    </WhatsAppButton>
  );
}
