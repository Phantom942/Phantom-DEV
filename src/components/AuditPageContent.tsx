"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowLeft,
  Gauge,
  Search,
  LayoutGrid,
  MousePointerClick,
  ShieldCheck,
  TrendingUp,
  Users,
  Radar,
  ListChecks,
  Clock,
} from "lucide-react";
import { AUDIT_PILLAR_IDS, AUDIT_PRICE_EUR } from "@/data/audit";
import { AuditFlow } from "@/components/AuditFlow";
import { useTranslations } from "@/hooks/useTranslations";

const pillarIcons = {
  technical: Gauge,
  seo: Search,
  structure: LayoutGrid,
  conversion: MousePointerClick,
  compliance: ShieldCheck,
  popularity: TrendingUp,
  competitors: Users,
  discoverability: Radar,
  actionPlan: ListChecks,
} as const;

export function AuditPageContent() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const ap = t.auditPage;
  const prefix =
    pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  const pillars = AUDIT_PILLAR_IDS.map((id) => ({
    id,
    ...ap.pillars[id],
    Icon: pillarIcons[id],
  }));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 md:px-16">
      <Link
        href={`${prefix || ""}/`}
        className="mb-10 inline-flex items-center gap-2 text-sm font-light tracking-[0.1em] text-zinc-400 transition-colors hover:text-zinc-100"
      >
        <ArrowLeft size={16} strokeWidth={1.5} aria-hidden />
        {t.contactForm.backToHome}
      </Link>

      <p className="mb-3 text-[10px] font-light uppercase tracking-[0.28em] text-cyan-400/90">
        {ap.eyebrow}
      </p>
      <h1 className="font-tech mb-4 text-3xl font-semibold uppercase tracking-[0.12em] text-zinc-100 sm:text-4xl md:text-5xl">
        {ap.pageTitle}
      </h1>
      <p className="mb-3 max-w-3xl text-base leading-[1.85] text-zinc-300 sm:text-lg">{ap.introLead}</p>
      <p className="mb-8 max-w-3xl text-sm leading-relaxed text-zinc-400">{ap.introSub}</p>

      <div className="mb-12 flex flex-wrap items-center gap-3">
        <span className="rounded-md border border-cyan-500/40 bg-cyan-500/10 px-4 py-2 font-tech text-lg font-semibold text-cyan-300">
          {AUDIT_PRICE_EUR} €
        </span>
        <span className="flex items-center gap-2 text-xs text-zinc-400">
          <Clock size={14} className="text-cyan-400/80" aria-hidden />
          {ap.delivery}
        </span>
        <span className="flex items-center gap-2 text-xs text-zinc-400">
          <ShieldCheck size={14} className="text-cyan-400/80" aria-hidden />
          {ap.humanReview}
        </span>
      </div>

      <section aria-labelledby="audit-process-title" className="mb-16">
        <h2 id="audit-process-title" className="font-tech mb-6 text-lg uppercase tracking-[0.14em] text-zinc-200">
          {ap.processTitle}
        </h2>
        <ol className="grid gap-4 sm:grid-cols-3">
          {ap.processSteps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-5 py-6"
            >
              <span className="font-tech mb-2 block text-[10px] uppercase tracking-[0.2em] text-cyan-400/90">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mb-2 text-sm font-medium text-zinc-100">{step.title}</h3>
              <p className="text-xs leading-relaxed text-zinc-400">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="audit-pillars-title" className="mb-16">
        <h2 id="audit-pillars-title" className="font-tech mb-2 text-lg uppercase tracking-[0.14em] text-zinc-200">
          {ap.pillarsTitle}
        </h2>
        <p className="mb-8 max-w-2xl text-sm text-zinc-400">{ap.pillarsLead}</p>
        <ul className="grid gap-4 sm:grid-cols-2">
          {pillars.map(({ id, title, summary, checks, Icon }) => (
            <li
              key={id}
              className="rounded-lg border border-zinc-800/90 bg-zinc-950/50 p-5 transition-colors hover:border-zinc-700"
            >
              <div className="mb-3 flex items-start gap-3">
                <Icon size={18} className="mt-0.5 shrink-0 text-cyan-400/90" strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="text-sm font-medium text-zinc-100">{title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{summary}</p>
                </div>
              </div>
              <ul className="ml-7 space-y-1 border-t border-zinc-800/80 pt-3" role="list">
                {checks.map((c) => (
                  <li
                    key={c}
                    className="text-[11px] leading-relaxed text-zinc-500 before:mr-1.5 before:text-cyan-500/60 before:content-['·']"
                  >
                    {c}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="audit-honesty-title"
        className="mb-16 rounded-lg border border-cyan-500/15 bg-cyan-500/5 px-5 py-6 sm:px-8"
      >
        <div className="flex gap-3">
          <ShieldCheck size={20} className="shrink-0 text-cyan-400/90" strokeWidth={1.5} aria-hidden />
          <div>
            <h2 id="audit-honesty-title" className="mb-2 text-sm font-medium text-cyan-100/90">
              {ap.honestyTitle}
            </h2>
            <p className="text-xs leading-relaxed text-zinc-400">{ap.honestyBody}</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="audit-deliverable-title" className="mb-16">
        <h2 id="audit-deliverable-title" className="font-tech mb-4 text-lg uppercase tracking-[0.14em] text-zinc-200">
          {ap.deliverableTitle}
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2" role="list">
          {ap.deliverables.map((item) => (
            <li
              key={item}
              className="rounded-md border border-zinc-800 bg-zinc-900/30 px-4 py-3 text-xs text-zinc-300"
            >
              {item}
            </li>
          ))}
        </ul>
      </section>

      <AuditFlow />
    </div>
  );
}
