"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { AuditReportView } from "@/components/AuditReportView";
import { auditApiUrl } from "@/lib/audit/api-base";
import type { AuditReport } from "@/lib/audit/types";
import { useTranslations } from "@/hooks/useTranslations";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function AuditResultInner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const sessionId = searchParams.get("session_id");
  const { t } = useTranslations();
  const r = t.auditPage.result;

  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";

  const [report, setReport] = useState<AuditReport | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);

  const progressSteps = [r.stepFetch, r.stepCrawl, r.stepAnalyze, r.stepReport];

  useEffect(() => {
    if (!loading) return;
    const timer = setInterval(() => {
      setStepIndex((i) => (i + 1) % progressSteps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [loading, progressSteps.length]);

  useEffect(() => {
    if (!sessionId) {
      setError(r.noSession);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchCached(): Promise<AuditReport | null> {
      const cachedRes = await fetch(
        auditApiUrl(`/api/audit/report?session_id=${encodeURIComponent(sessionId!)}`)
      );
      if (!cachedRes.ok) return null;
      const data = await cachedRes.json();
      return data.report ?? null;
    }

    async function runAudit(): Promise<AuditReport> {
      const res = await fetch(auditApiUrl("/api/audit/run"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? r.failed);
      return data.report;
    }

    async function loadReport() {
      try {
        const cached = await fetchCached();
        if (cached && !cancelled) {
          setReport(cached);
          return;
        }

        let lastError: Error | null = null;
        for (let attempt = 0; attempt < 3; attempt++) {
          try {
            const result = await runAudit();
            if (!cancelled) setReport(result);
            return;
          } catch (e) {
            lastError = e instanceof Error ? e : new Error(r.failed);
            if (attempt < 2) await sleep(2000 * (attempt + 1));
          }
        }

        if (!cancelled) throw lastError ?? new Error(r.failed);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : r.failed);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void loadReport();
    return () => {
      cancelled = true;
    };
  }, [sessionId, r.failed, r.noSession]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <Loader2 size={32} className="animate-spin text-cyan-400" aria-hidden />
        <p className="mt-6 text-sm text-zinc-300">{r.running}</p>
        <p className="mt-2 text-xs text-cyan-400/80">{progressSteps[stepIndex]}</p>
        <p className="mt-4 text-xs text-zinc-600">{r.runningHint}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stealth-card mx-auto max-w-lg rounded-lg px-6 py-10 text-center">
        <p className="text-sm text-red-400">{error}</p>
        <p className="mt-4 text-xs leading-relaxed text-zinc-500">{r.failedHint}</p>
        {sessionId ? (
          <p className="mt-2 text-[10px] text-zinc-600">
            {r.sessionRef}: {sessionId.slice(0, 20)}…
          </p>
        ) : null}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="btn-stealth-secondary inline-flex"
            onClick={() => window.location.reload()}
          >
            {r.retry}
          </button>
          <Link href={`${localePrefix}/contact`} className="btn-stealth-primary inline-flex">
            {r.supportCta}
          </Link>
        </div>
        <Link href={`${localePrefix}/audit`} className="mt-4 inline-block text-xs text-zinc-500 underline">
          {r.back}
        </Link>
      </div>
    );
  }

  if (!report) return null;

  return (
    <div>
      <p className="mb-2 text-center text-sm text-emerald-400/90">{r.success}</p>
      {report.meta.expiresAt ? (
        <p className="mb-8 text-center text-[11px] text-zinc-500">
          {r.savedUntil.replace("{date}", new Date(report.meta.expiresAt).toLocaleDateString())}
        </p>
      ) : (
        <div className="mb-8" />
      )}
      <AuditReportView report={report} />
      <div className="mt-12 text-center">
        <Link href={`${localePrefix}/contact`} className="btn-stealth-primary inline-flex">
          {r.fixCta}
        </Link>
      </div>
    </div>
  );
}

export function AuditResultClient() {
  const { t } = useTranslations();
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-24">
          <Loader2 size={32} className="animate-spin text-cyan-400" />
        </div>
      }
    >
      <h1 className="font-tech mb-10 text-center text-2xl uppercase tracking-[0.12em] text-zinc-100 sm:text-3xl">
        {t.auditPage.result.title}
      </h1>
      <AuditResultInner />
    </Suspense>
  );
}
