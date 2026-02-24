"use client";

import Link from "next/link";
import { Mail, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="w-full max-w-[100vw] overflow-x-hidden border-t border-[#f5f5f0]/10 px-4 py-12 sm:px-8 sm:py-16 md:px-16"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 sm:flex-row sm:gap-12">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <p className="text-xs font-light tracking-[0.15em] text-[#f5f5f0]/60">
            PhantomDev — Création de sites web premium
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="mailto:contact@phantomdev.fr"
              className="flex items-center gap-2 text-sm font-light tracking-[0.08em] text-[#f5f5f0]/80 transition-colors hover:text-[#f5f5f0]"
              aria-label="Envoyer un email"
            >
              <Mail size={16} strokeWidth={1.5} />
              contact@phantomdev.fr
            </a>
            <Link
              href="/contact"
              className="text-sm font-light tracking-[0.08em] text-[#f5f5f0]/80 transition-colors hover:text-[#f5f5f0]"
            >
              Demander un devis
            </Link>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Phantom942"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f5f0]/60 transition-colors hover:text-[#f5f5f0]"
                aria-label="GitHub"
              >
                <Github size={20} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.linkedin.com/in/phantomdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f5f5f0]/60 transition-colors hover:text-[#f5f5f0]"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-4xl border-t border-[#f5f5f0]/5 pt-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-8">
          <a
            href="/mentions-legales"
            className="text-xs font-light tracking-[0.1em] text-[#f5f5f0]/40 transition-colors hover:text-[#f5f5f0]/70"
          >
            Mentions légales
          </a>
          <p className="text-center text-xs font-light tracking-[0.1em] text-[#f5f5f0]/40">
            © {new Date().getFullYear()} PhantomDev. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
