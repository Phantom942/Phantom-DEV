"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Github } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { useTranslations } from "@/hooks/useTranslations";

export function Footer() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const prefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  return (
    <footer
      className="w-full max-w-full overflow-x-clip border-t border-[#f5f5f0]/10 px-4 py-12 sm:px-8 sm:py-16 md:px-16"
      role="contentinfo"
      aria-label="Pied de page PhantomDev : création de sites web, développement React et Node.js, contact et mentions légales"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 sm:flex-row sm:gap-12">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <p className="text-xs font-light tracking-[0.15em] text-[#f5f5f0]/60">
            {t.footer.tagline}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-8">
            <a
              href={getWhatsAppDevisUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-light tracking-[0.08em] text-[#f5f5f0]/80 transition-colors hover:text-[#f5f5f0]"
              aria-label="Contacter PhantomDev sur WhatsApp pour un devis projet web"
            >
              <MessageCircle size={16} strokeWidth={1.5} />
              {t.footer.privateLine}
            </a>
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
            </div>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-4xl text-center text-[10px] font-light tracking-[0.08em] text-[#f5f5f0]/50">
        {t.footer.based}
      </p>
      <div className="mx-auto mt-10 max-w-4xl border-t border-[#f5f5f0]/5 pt-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          <a
            href={`${prefix}/mentions-legales`}
            className="text-xs font-light tracking-[0.1em] text-[#f5f5f0]/40 transition-colors hover:text-[#f5f5f0]/70"
          >
            Mentions légales
          </a>
          <a
            href="https://phantomdev.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-light tracking-[0.15em] uppercase text-[#f5f5f0]/40 transition-opacity hover:text-[#f5f5f0]/70 hover:opacity-100"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            aria-label="Design et développement par PhantomDev, expertise en interfaces haute performance"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="shrink-0"
              aria-hidden
            >
              <path
                d="M16 4c-6 0-10 5-10 10 0 1.8.6 3.5 1.5 4.8v4.2l2.5-2.5 2 2.5 2-2.5 2.5 2.5v-4.2c.9-1.3 1.5-3 1.5-4.8 0-5-4-10-10-10z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="10.5" r="1.2" fill="currentColor" />
              <circle cx="21" cy="10.5" r="1.2" fill="currentColor" />
            </svg>
            {t.footer.designBy}
          </a>
          <p className="text-center text-xs font-light tracking-[0.1em] text-[#f5f5f0]/40">
            © {new Date().getFullYear()} PhantomDev. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
