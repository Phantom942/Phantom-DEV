"use client";

import { m } from "framer-motion";
import { useLightMotion } from "@/hooks/useLightMotion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowRight, MessageCircle, Zap, Shield, Truck, Handshake, ChevronDown } from "lucide-react";
import { PhantomBrand } from "@/components/PhantomBrand";
import { useWhatsAppDevisUrl } from "@/hooks/useWhatsAppDevisUrl";
import { useTranslations } from "@/hooks/useTranslations";

const brandVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      delay: 0.25,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const hookVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.55,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const pricingVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 0.95,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: 1.1,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const badgeIcons = [
  { Icon: Zap, className: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]" },
  { Icon: Shield, className: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.55)]" },
  { Icon: Truck, className: "text-cyan-300/90 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" },
  { Icon: Handshake, className: "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" },
] as const;

export function HeroSection() {
  const { t } = useTranslations();
  const pathname = usePathname();
  const lightMotion = useLightMotion();
  const instant = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";
  const badgeLabels = [t.hero.badge1, t.hero.badge2, t.hero.badge3, t.hero.badge4];
  const whatsappUrl = useWhatsAppDevisUrl();

  return (
    <section
      className="relative flex min-h-[100dvh] min-h-screen w-full max-w-full flex-col items-center justify-center overflow-hidden bg-transparent px-4 pt-24 sm:px-8 sm:pt-28 md:px-16"
      aria-labelledby="hero-title"
      style={{
        paddingTop: "max(6rem, calc(5rem + env(safe-area-inset-top)))",
        paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
      }}
    >
      <h1 id="hero-title" className="sr-only">
        {t.hero.title}
      </h1>

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
        <m.div
          variants={lightMotion ? instant : brandVariants}
          initial="hidden"
          animate="visible"
          className="flex justify-center"
          aria-hidden
        >
          <PhantomBrand size="hero" priority />
        </m.div>

        <m.p
          variants={lightMotion ? instant : hookVariants}
          initial="hidden"
          animate="visible"
          className="font-tech mt-8 text-xs font-medium uppercase tracking-[0.28em] text-cyan-400/90 sm:mt-10 sm:text-sm sm:tracking-[0.32em]"
        >
          {t.hero.hook}
        </m.p>

        <m.p
          variants={lightMotion ? instant : subtitleVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 max-w-[90vw] px-2 text-sm font-light leading-[1.75] tracking-wide text-zinc-300 sm:mt-5 sm:max-w-2xl sm:text-base md:text-lg"
        >
          {t.hero.subtitle}
        </m.p>

        <m.p
          variants={lightMotion ? instant : pricingVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 text-xs font-light tracking-[0.12em] text-zinc-400 sm:text-sm"
        >
          <Link
            href={localePrefix ? `${localePrefix}/services` : "/services"}
            className="inline-flex items-center gap-1 underline decoration-cyan-500/30 underline-offset-4 transition-colors hover:text-zinc-200 hover:decoration-cyan-400/60"
            aria-label={t.hero.seeServices}
          >
            {t.hero.seeServices}
            <ArrowRight size={12} strokeWidth={1.5} aria-hidden />
          </Link>
        </m.p>

        <m.div
          variants={lightMotion ? instant : ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-10 flex w-full max-w-md flex-col-reverse items-stretch gap-3 sm:mt-12 sm:max-w-lg sm:flex-row sm:items-center sm:justify-center sm:gap-4 touch-manipulation"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-stealth-primary w-full sm:w-auto md:animate-cyber-cyan-pulse"
            aria-label={t.hero.requestQuote}
          >
            {t.hero.requestQuote}
            <MessageCircle size={16} strokeWidth={1.5} />
          </a>
          <Link
            href={`${localePrefix}/realisations`}
            className="btn-stealth-secondary w-full sm:w-auto"
            aria-label={t.hero.seeProjects}
          >
            {t.hero.seeProjects}
            <ArrowDown size={16} className="rotate-[-90deg]" strokeWidth={1.5} />
          </Link>
        </m.div>

        <m.ul
          variants={lightMotion ? instant : ctaVariants}
          initial="hidden"
          animate="visible"
          className="mt-12 grid w-full max-w-2xl grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:max-w-3xl lg:grid-cols-4 lg:gap-3"
          role="list"
        >
          {badgeLabels.map((label, i) => {
            const { Icon, className } = badgeIcons[i];
            return (
              <li key={label} role="listitem" className="flex justify-center">
                <span className="stealth-badge w-full justify-center sm:w-auto">
                  <Icon size={14} className={className} strokeWidth={1.5} aria-hidden />
                  {label}
                </span>
              </li>
            );
          })}
        </m.ul>
      </div>

      <a
        href={`${localePrefix || ""}/#expertise`}
        className="absolute left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-zinc-400 transition-colors hover:text-zinc-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        style={{ bottom: "max(5.5rem, calc(3.5rem + env(safe-area-inset-bottom)))" }}
        aria-label="Descendre vers l'expertise"
      >
        <span className="font-tech text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <ChevronDown size={20} strokeWidth={1.25} className="hidden motion-safe:animate-bounce sm:block" aria-hidden />
      </a>
    </section>
  );
}
