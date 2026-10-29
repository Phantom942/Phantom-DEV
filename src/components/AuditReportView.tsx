"use client";

import type { AuditReport } from "@/lib/audit/types";
import { AUDIT_PILLAR_IDS } from "@/data/audit";
import { useTranslations } from "@/hooks/useTranslations";

const statusColors = {
  good: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
  average: "text-amber-300 border-amber-500/30 bg-amber-500/10",
  poor: "text-red-400 border-red-500/30 bg-red-500/10",
};

const severityIcon = {
  critical: "text-red-400",
  warning: "text-amber-300",
  info: "text-zinc-400",
  ok: "text-emerald-400/90",
};

function pageScoreColor(score: number) {
  if (score >= 75) return "text-emerald-400";
  if (score >= 50) return "text-amber-300";
  return "text-red-400";
}

type AuditReportViewProps = {
  report: AuditReport;
};

export function AuditReportView({ report }: AuditReportViewProps) {
  const { t } = useTranslations();
  const r = t.auditPage.report;

  const crawlLabel =
    report.meta.crawlSource === "sitemap"
      ? r.crawlSitemap
      : report.meta.crawlSource === "internal"
        ? r.crawlInternal
        : r.crawlHomeOnly;

  return (
    <div className="space-y-10">
      <div className="stealth-card rounded-lg px-6 py-8 text-center sm:px-10">
        <p className="mb-2 text-xs uppercase tracking-[0.2em] text-zinc-500">{r.overall}</p>
        <p className="font-tech text-5xl font-semibold text-cyan-300">{report.overallScore}/100</p>
        <p className="mt-3 text-sm text-zinc-400">{report.url}</p>
        <p className="mt-1 text-[10px] text-zinc-600">
          {r.analyzedAt} {new Date(report.auditedAt).toLocaleString("fr-FR")}
        </p>
        {report.meta.pagesCrawled > 1 && (
          <p className="mt-3 text-xs text-cyan-400/80">
            {r.pagesScanned.replace("{count}", String(report.meta.pagesCrawled))} · {crawlLabel}
          </p>
        )}
      </div>

      {report.meta.pages.length > 1 && (
        <section className="stealth-card overflow-hidden rounded-lg">
          <div className="border-b border-zinc-800 px-5 py-4 sm:px-6">
            <h2 className="font-tech text-sm uppercase tracking-[0.12em] text-zinc-200">{r.pagesTitle}</h2>
            <p className="mt-1 text-xs text-zinc-500">{r.pagesLead}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-800/80 text-[10px] uppercase tracking-wider text-zinc-500">
                  <th className="px-5 py-3 font-medium sm:px-6">{r.colPage}</th>
                  <th className="px-3 py-3 font-medium">{r.colScore}</th>
                  <th className="px-3 py-3 font-medium">{r.colIssues}</th>
                </tr>
              </thead>
              <tbody>
                {report.meta.pages.map((page) => (
                  <tr key={page.url} className="border-b border-zinc-800/50 last:border-0">
                    <td className="px-5 py-3 sm:px-6">
                      <span className="font-medium text-zinc-200">{page.path}</span>
                      {page.title && (
                        <span className="mt-0.5 block truncate text-[11px] text-zinc-500">{page.title}</span>
                      )}
                    </td>
                    <td className={`px-3 py-3 font-tech font-semibold ${pageScoreColor(page.pageScore)}`}>
                      {page.pageScore}
                    </td>
                    <td className="px-3 py-3 text-zinc-400">
                      {page.issues.length ? page.issues.join(" · ") : r.pageOk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {AUDIT_PILLAR_IDS.map((id) => {
          const pillar = report.pillars.find((p) => p.id === id);
          if (!pillar) return null;
          const label = t.auditPage.pillars[id].title;
          return (
            <article
              key={id}
              className={`rounded-lg border px-5 py-4 ${statusColors[pillar.status]}`}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <h3 className="text-sm font-medium">{label}</h3>
                <span className="font-tech text-lg font-semibold">{pillar.score}</span>
              </div>
              <ul className="space-y-1.5" role="list">
                {pillar.issues
                  .filter((i) => i.severity !== "ok")
                  .slice(0, 5)
                  .map((issue) => (
                    <li key={issue.message} className={`text-xs leading-relaxed ${severityIcon[issue.severity]}`}>
                      {issue.message}
                    </li>
                  ))}
                {pillar.issues.every((i) => i.severity === "ok") &&
                  pillar.issues.slice(0, 2).map((issue) => (
                    <li key={issue.message} className="text-xs leading-relaxed text-emerald-400/90">
                      {issue.message}
                    </li>
                  ))}
              </ul>
            </article>
          );
        })}
      </div>

      <section className="stealth-card rounded-lg px-6 py-8 sm:px-10">
        <h2 className="font-tech mb-6 text-lg uppercase tracking-[0.12em] text-zinc-100">{r.planTitle}</h2>
        {report.actionPlan.p0.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-red-400">{r.p0}</h3>
            <ul className="space-y-1" role="list">
              {report.actionPlan.p0.map((item) => (
                <li key={item} className="text-sm text-zinc-300">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {report.actionPlan.p1.length > 0 && (
          <div className="mb-6">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-amber-300">{r.p1}</h3>
            <ul className="space-y-1" role="list">
              {report.actionPlan.p1.map((item) => (
                <li key={item} className="text-sm text-zinc-300">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        {report.actionPlan.p2.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">{r.p2}</h3>
            <ul className="space-y-1" role="list">
              {report.actionPlan.p2.slice(0, 8).map((item) => (
                <li key={item} className="text-sm text-zinc-400">
                  · {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {!report.meta.pagespeedAvailable && (
        <p className="text-center text-xs text-zinc-500">{r.pagespeedNote}</p>
      )}
    </div>
  );
}
