"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Ghost, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "#selected-works", label: "Projets" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed left-0 right-0 top-0 z-50 flex w-full min-w-0 max-w-full flex-row items-center justify-between overflow-hidden border-b border-[#f5f5f0]/5 bg-[#000000] px-4 py-4 md:px-16 md:py-6"
        role="banner"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center gap-1.5 text-[#f5f5f0] transition-opacity hover:opacity-80 md:gap-2"
          aria-label="PhantomDev - Accueil"
          onClick={closeMobileMenu}
        >
          <Ghost className="h-4 w-4 shrink-0 md:h-6 md:w-6" strokeWidth={1.5} />
          <span className="shrink-0 text-xs font-light uppercase tracking-wide sm:text-sm md:text-base md:tracking-[0.15em] lg:text-lg lg:tracking-[0.2em]">
            <span className="sm:hidden">PHANTOM</span>
            <span className="hidden sm:inline">PhantomDev</span>
          </span>
        </Link>

        <nav
          className="hidden shrink-0 items-center gap-6 md:flex md:gap-12"
          role="navigation"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-light tracking-[0.15em] leading-tight text-[#f5f5f0]/85 transition-colors hover:text-[#f5f5f0]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md text-[#f5f5f0] transition-colors hover:bg-[#f5f5f0]/10 md:hidden"
          aria-label={mobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-14 z-40 overflow-hidden bg-[#0a0a0a] md:hidden"
          >
            <nav
              className="flex flex-col gap-0 border-t border-[#f5f5f0]/10 px-4 py-4"
              role="navigation"
              aria-label="Menu mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className="border-b border-[#f5f5f0]/5 py-4 text-base font-light tracking-[0.1em] text-[#f5f5f0]/90 transition-colors last:border-0 hover:text-[#f5f5f0]"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
