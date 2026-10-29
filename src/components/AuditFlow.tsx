"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { AUDIT_PRICE_EUR } from "@/data/audit";
import { auditApiUrl } from "@/lib/audit/api-base";
import { normalizeSiteUrl } from "@/lib/audit/normalize-url";
import { useTranslations } from "@/hooks/useTranslations";

export function AuditFlow() {
  const pathname = usePathname();
  const { t } = useTranslations();
  const f = t.auditPage.form;
  const localePrefix = pathname.startsWith("/en-gb") ? "/en-gb" : pathname.startsWith("/en-us") ? "/en-us" : "";
  const legalPrefix = localePrefix || "";

  const [siteUrl, setSiteUrl] = useState("");
  const [competitors, setCompetitors] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const urlPreview = normalizeSiteUrl(siteUrl);

  async function handlePayAndAudit() {
    setError("");
    const url = normalizeSiteUrl(siteUrl);
    if (!url) {
      setError(f.errors.invalidUrl);
      return;
    }
    if (!acceptTerms) {
      setError(f.errors.termsRequired);
      return;
    }

    const competitorList = competitors
      .split(/[\n,;]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    setLoading(true);
    try {
      const res = await fetch(auditApiUrl("/api/audit/checkout"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url,
          competitors: competitorList,
          localePrefix,
          acceptTerms: true,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.checkoutUrl) {
        throw new Error(data.error ?? f.errors.checkoutFailed);
      }
      window.location.href = data.checkoutUrl;
    } catch (e) {
      setError(e instanceof Error ? e.message : f.errors.checkoutFailed);
      setLoading(false);
    }
  }

  return (
    <div className="stealth-card rounded-lg px-6 py-8 sm:px-10 sm:py-10" id="commander">
      <h2 className="font-tech mb-2 text-center text-xl font-semibold uppercase tracking-[0.12em] text-zinc-100 sm:text-2xl">
        {f.title}
      </h2>
      <p className="mx-auto mb-8 max-w-lg text-center text-sm leading-relaxed text-zinc-400">{f.lead}</p>

      <div className="mx-auto max-w-xl space-y-4">
        <div>
          <label htmlFor="audit-url" className="mb-1.5 block text-xs tracking-wide text-zinc-400">
            {f.fields.siteUrl} *
          </label>
          <input
            id="audit-url"
            type="url"
            inputMode="url"
            autoComplete="url"
            placeholder="https://votre-site.fr"
            value={siteUrl}
            onChange={(e) => setSiteUrl(e.target.value)}
            className="w-full rounded-md border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
          />
          {urlPreview ? (
            <p className="mt-1 text-[10px] text-cyan-400/80">
              {f.urlOk}: {urlPreview}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="audit-competitors" className="mb-1.5 block text-xs tracking-wide text-zinc-400">
            {f.fields.competitors}
          </label>
          <textarea
            id="audit-competitors"
            rows={2}
            placeholder={f.fields.competitorsPlaceholder}
            value={competitors}
            onChange={(e) => setCompetitors(e.target.value)}
            className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-cyan-500/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/30"
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-md border border-zinc-800/80 bg-zinc-950/40 px-4 py-3">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-600 bg-zinc-900 text-cyan-500 focus:ring-cyan-500/40"
          />
          <span className="text-xs leading-relaxed text-zinc-400">
            {f.termsPrefix}{" "}
            <Link
              href={`${legalPrefix}/mentions-legales#audit-cgv`}
              className="text-cyan-400/90 underline decoration-cyan-500/30 hover:decoration-cyan-400/70"
            >
              {f.termsLink}
            </Link>
            {f.termsSuffix}
          </span>
        </label>

        {error ? (
          <p className="text-center text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <p className="text-center text-xs text-zinc-500">
          {f.priceTtc.replace("{price}", String(AUDIT_PRICE_EUR))} · {f.instantNote}
        </p>

        <button
          type="button"
          onClick={handlePayAndAudit}
          disabled={loading || !acceptTerms}
          className="btn-stealth-primary mx-auto flex w-full max-w-md items-center justify-center gap-2 disabled:opacity-60 sm:w-auto"
        >
          {loading ? <Loader2 size={18} className="animate-spin" aria-hidden /> : <CreditCard size={18} strokeWidth={1.5} aria-hidden />}
          {loading ? f.processing : f.payAndRunCta}
        </button>

        <p className="text-center text-[10px] leading-relaxed text-zinc-600">{f.refundNote}</p>
      </div>
    </div>
  );
}
