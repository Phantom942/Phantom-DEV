"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Ghost } from "lucide-react";

const navLinks = [
  { href: "#expertise", label: "Expertise" },
  { href: "#selected-works", label: "Projets" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-8 sm:py-6 md:px-16"
      role="banner"
    >
      <Link
        href="/"
        className="flex items-center gap-1.5 text-[#f5f5f0] transition-opacity hover:opacity-80 sm:gap-2"
        aria-label="PhantomDev - Accueil"
      >
        <Ghost className="h-6 w-6" strokeWidth={1.5} />
        <span className="text-xs font-light tracking-[0.15em] uppercase leading-tight sm:text-sm sm:tracking-[0.2em]">
          PhantomDev
        </span>
      </Link>
      <nav
        className="flex items-center gap-6 sm:gap-10 md:gap-12"
        role="navigation"
        aria-label="Navigation principale"
      >
        {navLinks.map((link, index) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <Link
              href={link.href}
              className="text-xs font-light tracking-[0.1em] leading-tight text-[#f5f5f0]/85 transition-colors hover:text-[#f5f5f0] sm:text-sm sm:tracking-[0.15em]"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>
    </motion.header>
  );
}
