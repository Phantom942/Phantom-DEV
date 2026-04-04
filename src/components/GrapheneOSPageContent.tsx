import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Shield } from "lucide-react";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { translations } from "@/data/translations";
import type { Locale } from "@/i18n";

const localePrefix: Record<Locale, string> = {
  fr: "",
  "en-GB": "/en-gb",
  "en-US": "/en-us",
};

const PHONE_ROTATIONS = ["-rotate-6", "rotate-0", "rotate-6"] as const;

export function GrapheneOSPageContent({ locale }: { locale: Locale }) {
  const t = translations[locale];
  const g = t.graphenePage;
  const prefix = localePrefix[locale];

  return (
    <main
      id="main"
      role="main"
      className="w-full pt-24 pb-16 sm:pt-32 sm:pb-24"
      aria-label={g.mainAria}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-8 md:px-16">
        <Link
          href={`${prefix || ""}/#expertise`}
          className="mb-12 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-[#f5f5f0]/70 transition-colors hover:text-[#f5f5f0]"
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          {g.backHome}
        </Link>

        <div className="mb-8 flex items-center gap-3 text-[#d4af37]/80">
          <Shield className="h-8 w-8 shrink-0" strokeWidth={1.25} aria-hidden />
          <h1
            id="graphene-main-heading"
            className="font-extralight tracking-[0.12em] text-[#f5f5f0]"
            style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
          >
            <span className="text-3xl sm:text-4xl md:text-5xl">{g.title}</span>
          </h1>
        </div>

        <p
          id="graphene-lead"
          className="mb-6 max-w-2xl text-base leading-[1.8] tracking-[0.02em] text-[#f5f5f0]/90 sm:text-lg"
        >
          {g.tagline}
        </p>
        <p className="mb-8 max-w-2xl text-sm leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/75 sm:text-base">
          {g.intro}
        </p>

        <p className="mb-12">
          <a
            href="https://grapheneos.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-light tracking-[0.08em] text-[#d4af37]/85 underline decoration-[#d4af37]/40 underline-offset-4 transition-colors hover:text-[#d4af37] hover:decoration-[#d4af37]/70"
          >
            {g.officialLinkLabel}
          </a>
        </p>

        <section
          id="graphene-visuels"
          className="mb-16"
          aria-labelledby="graphene-visual-heading"
        >
          <h2
            id="graphene-visual-heading"
            className="mb-8 text-center text-xs font-light uppercase tracking-[0.25em] text-[#f5f5f0]/70"
          >
            {g.visualSectionHeading}
          </h2>
          <div
            className="flex flex-wrap items-end justify-center gap-8 pb-4 sm:gap-12"
            aria-label={g.visualSectionAria}
          >
            {PHONE_ROTATIONS.map((rotation, index) => (
              <div
                key={rotation}
                className={`flex shrink-0 ${rotation} transition-transform hover:scale-[1.02]`}
              >
                <figure className="m-0">
                  <div className="relative aspect-[9/19] w-[min(32vw,9.5rem)] rounded-[1.85rem] border-2 border-[#f5f5f0]/18 bg-gradient-to-b from-[#222] to-[#0d0d0d] p-[5px] shadow-[0_20px_50px_rgba(0,0,0,0.55)] sm:w-[10.5rem]">
                    <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.5rem] bg-[#ecece6] px-3 py-6">
                      <Image
                        src="/graphene/grapheneos-logo.png"
                        alt={g.phoneScreenAlt}
                        width={120}
                        height={120}
                        className="object-contain"
                        sizes="(max-width: 640px) 28vw, 120px"
                        priority={index === 0}
                      />
                    </div>
                    <span
                      className="absolute bottom-2.5 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#1a1a1a]/35"
                      aria-hidden
                    />
                  </div>
                </figure>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[10px] font-light leading-relaxed tracking-[0.06em] text-[#f5f5f0]/45 sm:text-xs">
            {g.logoCredit}
          </p>
        </section>

        <ul className="mb-16 space-y-10 border-y border-[#f5f5f0]/10 py-12">
          {g.pillars.map((pillar) => (
            <li key={pillar.title}>
              <h2 className="mb-2 text-sm font-light uppercase tracking-[0.2em] text-[#d4af37]/90">
                {pillar.title}
              </h2>
              <p className="max-w-2xl text-sm leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/80 sm:text-base">
                {pillar.body}
              </p>
            </li>
          ))}
        </ul>

        <section className="mb-14" aria-labelledby="graphene-devices-heading">
          <h2
            id="graphene-devices-heading"
            className="mb-3 text-sm font-light uppercase tracking-[0.2em] text-[#f5f5f0]/90"
          >
            {g.devicesTitle}
          </h2>
          <p className="max-w-2xl text-sm leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/75 sm:text-base">
            {g.devicesBody}
          </p>
        </section>

        <section className="mb-14" aria-labelledby="graphene-process-heading">
          <h2
            id="graphene-process-heading"
            className="mb-4 text-sm font-light uppercase tracking-[0.2em] text-[#f5f5f0]/90"
          >
            {g.processTitle}
          </h2>
          <ol className="list-decimal space-y-3 pl-5 text-sm leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/80 sm:text-base">
            {g.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section
          className="mb-14 border-t border-[#f5f5f0]/10 pt-12"
          aria-labelledby="graphene-faq-heading"
          id="faq-graphene"
        >
          <h2
            id="graphene-faq-heading"
            className="mb-8 text-sm font-light uppercase tracking-[0.2em] text-[#f5f5f0]/90"
          >
            {g.faqSectionTitle}
          </h2>
          <dl className="space-y-8">
            {g.faqSchema.map((item) => (
              <div key={item.q}>
                <dt className="mb-2 text-sm font-normal tracking-[0.04em] text-[#f5f5f0]">
                  {item.q}
                </dt>
                <dd className="m-0 text-sm leading-[1.85] tracking-[0.02em] text-[#f5f5f0]/75">
                  {item.a}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <p className="mb-12 text-xs leading-relaxed tracking-[0.03em] text-[#f5f5f0]/45">
          {g.disclaimer}
        </p>

        <div className="flex flex-col items-stretch gap-4 rounded-sm border border-[#f5f5f0]/10 bg-[#2c2f31]/30 px-6 py-10 sm:flex-row sm:items-center sm:justify-center sm:gap-6 sm:px-10">
          <a
            href={getWhatsAppDevisUrl(g.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.12em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20"
          >
            <MessageCircle size={18} strokeWidth={1.5} />
            {g.ctaWhatsApp}
          </a>
        </div>
      </div>
    </main>
  );
}
