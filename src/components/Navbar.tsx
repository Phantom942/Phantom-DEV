"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Ghost, Menu, X } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslations } from "@/hooks/useTranslations";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslations();
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinksWithLocale = [
    { href: `${localePrefix || ""}/#expertise`, label: t.nav.expertise },
    { href: `${localePrefix || ""}/services`, label: t.nav.services },
    { href: `${localePrefix || ""}/grapheneos`, label: t.nav.grapheneOS },
    { href: `${localePrefix || ""}/#projets`, label: t.nav.projects },
    { href: `${localePrefix || ""}/#contact`, label: t.nav.contact },
  ];

  function navLinkAriaLabel(label: string): string {
    if (label === t.nav.grapheneOS) return t.nav.grapheneAria;
    if (label === t.nav.expertise) return t.nav.ariaExpertise;
    if (label === t.nav.services) return t.nav.ariaServices;
    if (label === t.nav.projects) return t.nav.ariaProjects;
    if (label === t.nav.contact) return t.nav.ariaContact;
    return label;
  }

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 flex w-full max-w-full flex-row items-center justify-between gap-2 overflow-x-clip border-b border-[#f5f5f0]/5 bg-[#353839] px-4 py-3 md:px-16 md:py-6"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        }}
        role="banner"
        aria-label={t.nav.bannerAria}
      >
        <Link
          href={localePrefix || "/"}
          className="flex min-w-0 shrink-0 items-center gap-1.5 overflow-hidden text-[#f5f5f0] transition-opacity hover:opacity-80"
          aria-label={t.nav.homeLogoAria}
          onClick={closeMobileMenu}
        >
          <Ghost
            className="h-4 w-4 shrink-0 md:h-5 md:w-5"
            strokeWidth={1.5}
          />
          <span className="truncate text-xs font-light uppercase tracking-wide md:text-base md:tracking-[0.15em] lg:text-lg lg:tracking-[0.2em]">
            PhantomDev
          </span>
        </Link>

        <nav
          className="hidden shrink-0 items-center gap-4 md:flex md:gap-12"
          role="navigation"
          aria-label={t.nav.mainNavAria}
        >
          <LanguageSelector variant="dropdown" />
          {navLinksWithLocale.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-light tracking-[0.15em] leading-tight text-[#f5f5f0]/85 transition-colors hover:text-[#f5f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#353839]"
              aria-label={navLinkAriaLabel(link.label)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppDevisUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-[#25D366]/60 bg-[#25D366]/10 px-4 py-2 text-xs font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:scale-[1.02] hover:bg-[#25D366]/20"
            aria-label={t.nav.whatsappQuoteAria}
          >
            {t.nav.freeQuote}
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#f5f5f0] transition-colors active:bg-[#f5f5f0]/10 md:hidden"
          aria-label={mobileMenuOpen ? t.nav.menuCloseAria : t.nav.menuOpenAria}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 z-40 overflow-hidden bg-[#2c2f31] md:hidden"
            style={{
              top: "calc(3rem + env(safe-area-inset-top))",
            }}
          >
            <nav
              className="flex flex-col border-t border-[#f5f5f0]/10 px-4 py-2"
              role="navigation"
              aria-label={t.nav.mobileNavAria}
            >
              <div className="border-b border-[#f5f5f0]/5 py-3">
                <LanguageSelector variant="inline" />
              </div>
              {navLinksWithLocale.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="border-b border-[#f5f5f0]/5 py-3 text-base font-light tracking-[0.1em] text-[#f5f5f0]/90 transition-colors last:border-0 active:text-[#f5f5f0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#d4af37]/50"
                  aria-label={navLinkAriaLabel(link.label)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={getWhatsAppDevisUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="mt-4 border border-[#25D366]/60 bg-[#25D366]/10 py-3 text-center text-base font-light tracking-[0.1em] text-[#f5f5f0] transition-colors"
                aria-label={t.nav.whatsappQuoteAria}
              >
                {t.nav.freeQuote}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
