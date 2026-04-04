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

  const jumps = [
    { href: "#conception", label: sp.jumpConception },
    { href: "#applications", label: sp.jumpApplications },
    { href: "#seo", label: sp.jumpSeo },
    { href: "#ia", label: sp.jumpIa },
    { href: "#maintenance", label: sp.jumpMaintenance },
  ] as const;

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 md:px-16">
      <Link
        href={`${prefix || ""}/#expertise`}
        className="mb-10 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
      >
        <ArrowLeft size={16} strokeWidth={1.5} />
        {t.contactForm.backToHome}
      </Link>

      <p className="mb-3 text-[10px] font-light uppercase tracking-[0.28em] text-[#d4af37]/90">
        {sp.eyebrow}
      </p>
      <h1
        className="mb-6 font-extralight tracking-[0.12em] text-[#f5f5f0]"
        style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
      >
        <span className="text-3xl sm:text-4xl md:text-5xl">{sp.pageTitle}</span>
      </h1>
      <p className="mb-4 max-w-3xl text-base leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/88 sm:text-lg">
        {sp.introLead}
      </p>
      <p className="mb-8 max-w-3xl text-xs font-light leading-relaxed tracking-[0.06em] text-[#f5f5f0]/55 sm:text-sm">
        {sp.introSub}
      </p>

      <ul className="mb-6 flex flex-wrap gap-2 sm:mb-8 sm:gap-3">
        {sp.trustPoints.map((point) => (
          <li
            key={point}
            className="rounded-sm border border-[#f5f5f0]/12 bg-[#2c2f31]/50 px-3 py-2 text-[10px] font-light tracking-[0.08em] text-[#f5f5f0]/75 sm:text-xs"
          >
            {point}
          </li>
        ))}
      </ul>

      <nav
        className="mb-14 border-b border-[#f5f5f0]/10 pb-6"
        aria-label={sp.jumpNavAria}
      >
        <p className="mb-3 text-[10px] font-light uppercase tracking-[0.2em] text-[#f5f5f0]/45">
          {sp.exploreLabel}
        </p>
        <ul className="flex flex-wrap gap-2">
          {jumps.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="inline-block rounded-sm border border-[#d4af37]/25 bg-[#d4af37]/5 px-3 py-2 text-[10px] font-light tracking-[0.1em] text-[#f5f5f0]/90 transition-colors hover:border-[#d4af37]/45 hover:bg-[#d4af37]/10 sm:text-xs"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ServicesList />

      <div className="mt-20 rounded-sm border border-[#f5f5f0]/10 bg-gradient-to-br from-[#d4af37]/[0.06] via-[#2c2f31]/40 to-transparent px-6 py-10 sm:px-12 sm:py-12">
        <h2
          className="mb-3 text-center font-extralight tracking-[0.12em] text-[#f5f5f0]"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          <span className="text-xl sm:text-2xl md:text-3xl">{sp.closingTitle}</span>
        </h2>
        <p className="mx-auto mb-10 max-w-xl text-center text-sm leading-[1.8] text-[#f5f5f0]/70">
          {sp.closingLead}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href={`${prefix || ""}/?type=vitrine#contact`}
            className="inline-flex w-full items-center justify-center gap-2 border border-[#d4af37]/50 bg-[#d4af37]/10 px-8 py-4 text-sm font-light tracking-[0.12em] text-[#f5f5f0] transition-all hover:border-[#d4af37]/70 hover:bg-[#d4af37]/15 sm:w-auto"
          >
            {sp.closingQuoteCta}
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
          <a
            href={getWhatsAppDevisUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.12em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20 sm:w-auto"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            {sp.closingWhatsAppCta}
          </a>
        </div>
      </div>
    </div>
  );
}
