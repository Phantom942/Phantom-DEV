"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { MessageCircle, Github } from "lucide-react";
import { getWhatsAppDisplayHuman } from "@/data/contact";
import { useWhatsAppDevisUrl } from "@/hooks/useWhatsAppDevisUrl";
import { useTranslations } from "@/hooks/useTranslations";
import { PhantomLogo } from "./PhantomLogo";

function FooterInner() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const prefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";
  const whatsappUrl = useWhatsAppDevisUrl();

  return (
    <footer
      className="w-full max-w-full overflow-x-clip border-t border-zinc-800 px-4 py-12 sm:px-8 sm:py-16 md:px-16"
      role="contentinfo"
      aria-label={t.footer.contentinfoAria}
    >
      <div className="stealth-card mx-auto mb-12 flex max-w-4xl flex-col items-center justify-center rounded-lg px-6 py-8 text-center sm:mb-16 sm:px-10 sm:py-12">
        <p className="mb-4 text-sm font-light tracking-[0.08em] text-zinc-200 sm:text-base">
          {t.footer.ctaTitle}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-stealth-primary md:animate-cyber-cyan-pulse"
          aria-label={t.footer.ctaButton}
        >
          <MessageCircle size={18} strokeWidth={1.5} />
          {t.footer.ctaButton}
        </a>
      </div>
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-8 sm:flex-row sm:gap-12">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <p className="text-sm font-light tracking-[0.06em] text-zinc-300">
            {t.footer.tagline}
          </p>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-10 sm:gap-y-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-light tracking-normal text-zinc-300 transition-colors hover:text-zinc-100"
              aria-label={`${t.footer.mainLineAria} (${getWhatsAppDisplayHuman()})`}
            >
              <MessageCircle size={16} strokeWidth={1.5} className="shrink-0 text-zinc-300" />
              {t.footer.mainLine}
            </a>
            <div className="flex items-center gap-6">
              <a
                href="https://github.com/Phantom942"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 transition-colors hover:text-zinc-100"
                aria-label="GitHub"
              >
                <Github size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-4xl text-center text-xs font-light leading-relaxed tracking-normal text-zinc-300">
        {t.footer.based}
      </p>
      <nav
        className="mx-auto mt-8 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4"
        aria-label={t.nav.mainNavAria}
      >
        <Link
          href={`${prefix || ""}/services`}
          className="text-xs font-light tracking-[0.08em] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          {t.nav.services}
        </Link>
        <Link
          href={`${prefix || ""}/realisations`}
          className="text-xs font-light tracking-[0.08em] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          {t.nav.projects}
        </Link>
        <Link
          href={`${prefix || ""}/grapheneos`}
          className="text-xs font-light tracking-[0.08em] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          {t.nav.grapheneOS}
        </Link>
        <Link
          href={`${prefix || ""}/contact`}
          className="text-xs font-light tracking-[0.08em] text-zinc-400 transition-colors hover:text-zinc-200"
        >
          {t.nav.contact}
        </Link>
      </nav>
      <div className="mx-auto mt-10 max-w-4xl border-t border-zinc-800/80 pt-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
          <Link
            href={`${prefix || ""}/mentions-legales`}
            className="text-xs font-light tracking-[0.1em] text-zinc-300 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
          >
            Mentions légales
          </Link>
          <Link
            href={prefix || "/"}
            className="inline-flex items-center gap-2 text-xs font-light tracking-[0.15em] uppercase text-zinc-300 transition-colors hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
            style={{ fontFamily: "var(--font-source-sans), sans-serif" }}
            aria-label="Design et développement par PhantomDev, expertise en interfaces haute performance"
          >
            <PhantomLogo className="h-5 w-5" />
            {t.footer.designBy}
          </Link>
          <p className="text-center text-xs font-light tracking-[0.1em] text-zinc-300">
            © {new Date().getFullYear()} PhantomDev. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}

export function Footer() {
  return (
    <Suspense fallback={null}>
      <FooterInner />
    </Suspense>
  );
}
