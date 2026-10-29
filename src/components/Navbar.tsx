"use client";

import { Suspense, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { m, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useWhatsAppDevisUrl } from "@/hooks/useWhatsAppDevisUrl";
import { LanguageSelector } from "./LanguageSelector";
import { PhantomBrand } from "./PhantomBrand";
import { useTranslations } from "@/hooks/useTranslations";

function NavbarInner() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappUrl = useWhatsAppDevisUrl();
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useTranslations();
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinksWithLocale = [
    {
      href: `${localePrefix || ""}/#expertise`,
      label: t.nav.expertise,
      match: (p: string) => {
        const home = localePrefix || "/";
        return p === home;
      },
    },
    { href: `${localePrefix || ""}/services`, label: t.nav.services, match: (p: string) => p.includes("/services") },
    { href: `${localePrefix || ""}/audit`, label: t.nav.audit, match: (p: string) => p.includes("/audit") },
    { href: `${localePrefix || ""}/grapheneos`, label: t.nav.grapheneOS, match: (p: string) => p.includes("/grapheneos") },
    { href: `${localePrefix || ""}/realisations`, label: t.nav.projects, match: (p: string) => p.includes("/realisations") },
    { href: `${localePrefix || ""}/#contact`, label: t.nav.contact, match: () => false },
  ];

  function navLinkAriaLabel(label: string): string {
    if (label === t.nav.grapheneOS) return t.nav.grapheneAria;
    if (label === t.nav.expertise) return t.nav.ariaExpertise;
    if (label === t.nav.services) return t.nav.ariaServices;
    if (label === t.nav.audit) return t.nav.ariaAudit;
    if (label === t.nav.projects) return t.nav.ariaProjects;
    if (label === t.nav.contact) return t.nav.ariaContact;
    return label;
  }

  function isActive(match: (p: string) => boolean): boolean {
    return match(pathname);
  }

  return (
    <>
      <header
        className={`navbar-stealth fixed left-0 right-0 top-0 z-50 w-full max-w-full overflow-x-clip px-4 py-3 md:px-16 md:py-4 ${scrolled ? "navbar-scrolled" : ""}`}
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        }}
        role="banner"
        aria-label={t.nav.bannerAria}
      >
        <div className="navbar-aurora" aria-hidden>
          <span className="navbar-aurora__sheet navbar-aurora__sheet--a" />
          <span className="navbar-aurora__sheet navbar-aurora__sheet--b" />
          <span className="navbar-aurora__sheet navbar-aurora__sheet--c" />
        </div>

        <div className="navbar-stealth-inner flex w-full flex-row items-center justify-between gap-2">
          <Link
            href={localePrefix || "/"}
            className="text-white transition-opacity hover:opacity-90"
            aria-label={t.nav.homeLogoAria}
            onClick={closeMobileMenu}
          >
            <PhantomBrand priority />
          </Link>

          <nav
            className="hidden shrink-0 items-center gap-6 md:flex lg:gap-10"
            role="navigation"
            aria-label={t.nav.mainNavAria}
          >
            <LanguageSelector variant="dropdown" />
            {navLinksWithLocale.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-stealth whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                data-active={isActive(link.match)}
                aria-label={navLinkAriaLabel(link.label)}
                aria-current={isActive(link.match) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-stealth-primary btn-stealth-primary-compact animate-none hover:shadow-[0_0_20px_rgba(34,211,238,0.35)]"
              aria-label={t.nav.whatsappQuoteAria}
            >
              {t.nav.freeQuote}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-md text-zinc-300 transition-colors hover:bg-zinc-800/40 md:hidden"
            aria-label={mobileMenuOpen ? t.nav.menuCloseAria : t.nav.menuOpenAria}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <m.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm md:hidden"
              aria-label={t.nav.menuCloseAria}
              onClick={closeMobileMenu}
            />
            <m.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="navbar-mobile-panel fixed inset-x-0 z-50 overflow-hidden border-b shadow-2xl md:hidden"
              style={{
                top: "calc(3.25rem + env(safe-area-inset-top))",
              }}
            >
              <nav
                className="flex max-h-[min(70dvh,520px)] flex-col overflow-y-auto border-t border-zinc-800 px-4 py-3"
                role="navigation"
                aria-label={t.nav.mobileNavAria}
              >
                <div className="border-b border-zinc-800/80 py-3">
                  <LanguageSelector variant="inline" />
                </div>
                {navLinksWithLocale.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="font-tech border-b border-zinc-800/80 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-zinc-400 transition-colors last:border-0 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-cyan-500/40"
                    aria-label={navLinkAriaLabel(link.label)}
                  >
                    {link.label}
                  </Link>
                ))}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="btn-stealth-primary mt-5 w-full animate-none"
                  aria-label={t.nav.whatsappQuoteAria}
                >
                  {t.nav.freeQuote}
                </a>
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function Navbar() {
  return (
    <Suspense fallback={null}>
      <NavbarInner />
    </Suspense>
  );
}
