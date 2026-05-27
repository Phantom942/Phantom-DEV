"use client";

import { Gauge } from "lucide-react";
import { projects } from "@/data/projects";
import { useTranslations } from "@/hooks/useTranslations";

/** Bandeau preuve — scores Lighthouse réels (sans compteur « X projets »). */
export function TrustProofBar() {
  const { t } = useTranslations();
  const tp = t.trustProof;

  const scores = [
    ...new Set(projects.map((p) => p.lighthouseScore).filter((s) => s > 0)),
  ].sort((a, b) => b - a);

  if (scores.length === 0) return null;

  return (
    <section
      className="w-full border-y border-zinc-800/80 bg-zinc-900/30 px-4 py-6 sm:px-8 md:px-16"
      aria-label={tp.aria}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-8">
        <p className="font-tech flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-zinc-300">
          <Gauge size={16} className="text-cyan-400/90" strokeWidth={1.5} aria-hidden />
          {tp.label}
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-3" role="list">
          {scores.map((score) => (
            <li key={score} role="listitem">
              <span className="rounded-md border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 font-tech text-xs font-semibold tracking-wide text-cyan-300">
                Lighthouse {score}+
              </span>
            </li>
          ))}
        </ul>
        <p className="max-w-md text-center text-xs font-light leading-relaxed text-zinc-400 sm:text-left">
          {tp.hint}
        </p>
      </div>
    </section>
  );
}
