"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Ghost, Menu, X } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { LanguageSelector } from "./LanguageSelector";

const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "/services", label: "Services" },
  { href: "#projets", label: "Projets" },
  { href: "/#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinksWithLocale = [
    { href: `${localePrefix}/#expertise`, label: "Expertise" },
    { href: `${localePrefix}/services`, label: "Services" },
    { href: `${localePrefix}/#projets`, label: "Projets" },
    { href: `${localePrefix}/#contact`, label: "Contact" },
  ];

  return (
    <>
      <header
        className="fixed left-0 right-0 top-0 z-50 flex w-full max-w-full flex-row items-center justify-between gap-2 overflow-hidden border-b border-[#f5f5f0]/5 bg-[#000000] px-4 py-3 md:px-16 md:py-6"
        style={{
          paddingTop: "max(0.75rem, env(safe-area-inset-top))",
        }}
        role="banner"
        aria-label="En-tête : PhantomDev, création de sites web, développement React et Node.js, SaaS sur-mesure"
      >
        <Link
          href={localePrefix || "/"}
          className="flex min-w-0 shrink-0 items-center gap-1.5 overflow-hidden text-[#f5f5f0] transition-opacity hover:opacity-80"
          aria-label="PhantomDev, accueil — Création de sites web premium et développement sur-mesure"
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
          aria-label="Navigation principale : Expertise développement web, Services, Projets, Contact et devis"
        >
          <LanguageSelector />
          {navLinksWithLocale.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm font-light tracking-[0.15em] leading-tight text-[#f5f5f0]/85 transition-colors hover:text-[#f5f5f0]"
              aria-label={link.label === "Expertise" ? "Expertise en développement d'interfaces haute performance" : link.label === "Services" ? "Services : sites vitrines, e-commerce, SaaS" : link.label === "Projets" ? "Réalisations et projets web" : "Contact et devis"}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={getWhatsAppDevisUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#25D366]/60 bg-[#25D366]/10 px-4 py-2 text-xs font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20"
            aria-label="Demander un devis gratuit sur WhatsApp pour votre projet web"
          >
            Devis gratuit
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-[#f5f5f0] transition-colors active:bg-[#f5f5f0]/10 md:hidden"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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
            className="fixed inset-x-0 z-40 overflow-hidden bg-[#0a0a0a] md:hidden"
            style={{
              top: "calc(3rem + env(safe-area-inset-top))",
            }}
          >
            <nav
              className="flex flex-col border-t border-[#f5f5f0]/10 px-4 py-2"
              role="navigation"
              aria-label="Menu mobile"
            >
              <div className="flex justify-center border-b border-[#f5f5f0]/5 py-3">
                <LanguageSelector />
              </div>
              {navLinksWithLocale.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="border-b border-[#f5f5f0]/5 py-3 text-base font-light tracking-[0.1em] text-[#f5f5f0]/90 transition-colors last:border-0 active:text-[#f5f5f0]"
                  aria-label={link.label === "Expertise" ? "Expertise en développement d'interfaces haute performance" : link.label === "Services" ? "Services : sites vitrines, e-commerce, SaaS" : link.label === "Projets" ? "Réalisations et projets web" : "Contact et devis"}
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
                aria-label="Demander un devis gratuit sur WhatsApp"
              >
                Devis gratuit
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
