"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { ServicesList } from "@/components/ServicesList";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { useTranslations } from "@/hooks/useTranslations";

export function ServicesPageContent() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const sp = t.servicesPage;
  const prefix =
    pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 md:px-16">
      <Link
        href={`${prefix || ""}/#expertise`}
        className="mb-10 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-100"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        {t.contactForm.backToHome}
      </Link>

      <p className="mb-3 text-[10px] font-light uppercase tracking-[0.28em] text-[#22d3ee]/90">
        {sp.eyebrow}
      </p>
      <h1 className="font-tech mb-6 text-3xl font-semibold uppercase tracking-[0.14em] text-zinc-100 sm:text-4xl md:text-5xl">
        {sp.pageTitle}
      </h1>
      <p className="mb-4 max-w-3xl text-base leading-[1.85] tracking-[0.02em] text-zinc-300 sm:text-lg">
        {sp.introLead}
      </p>
      <p className="mb-8 max-w-3xl text-xs font-light leading-relaxed tracking-[0.06em] text-zinc-400 sm:text-sm">
        {sp.introSub}
      </p>

      <ul className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
        {sp.trustPoints.map((point) => (
          <li
            key={point}
            className="rounded-sm border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-[10px] font-light tracking-[0.08em] text-zinc-400 sm:text-xs"
          >
            {point}
          </li>
        ))}
      </ul>

      <ServicesList />

      <div className="stealth-card mt-20 rounded-lg px-6 py-10 sm:px-12 sm:py-12">
        <h2 className="font-tech mb-3 text-center text-xl font-semibold uppercase tracking-[0.12em] text-zinc-100 sm:text-2xl md:text-3xl">
          {sp.closingTitle}
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-[1.8] text-zinc-400">
          {sp.closingLead}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href={`${prefix || ""}/?type=vitrine#contact`}
            className="btn-stealth-secondary w-full sm:w-auto"
          >
            {sp.closingQuoteCta}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <a
            href={getWhatsAppDevisUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.12em] text-zinc-100 transition-all hover:bg-[#25D366]/20 sm:w-auto"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            {sp.closingWhatsAppCta}
          </a>
        </div>
      </div>
    </div>
  );
}
