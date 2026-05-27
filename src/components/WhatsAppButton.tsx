"use client";

import { MessageCircle } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";

interface WhatsAppButtonProps {
  children: React.ReactNode;
  className?: string;
  message?: string;
  href?: string;
}

export function WhatsAppButton({
  children,
  className,
  message,
  href,
}: WhatsAppButtonProps) {
  const link = href ?? getWhatsAppDevisUrl(message);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label="Contacter PhantomDev sur WhatsApp pour un devis projet web"
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
    <WhatsAppButton message={message} className={className ?? "btn-stealth-whatsapp"}>
      <MessageCircle size={20} strokeWidth={1.5} />
      Contacter sur WhatsApp
    </WhatsAppButton>
  );
}
