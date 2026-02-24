"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const PROJECT_TYPES = [
  { value: "", label: "Type de projet" },
  { value: "vitrine", label: "Site vitrine" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "application", label: "Application sur-mesure / SaaS" },
  { value: "ia", label: "Intégration IA" },
  { value: "autre", label: "Autre" },
] as const;

const BUDGETS = [
  { value: "", label: "Budget approximatif" },
  { value: "moins-5", label: "Moins de 5 000 €" },
  { value: "5-10", label: "5 000 € – 10 000 €" },
  { value: "10-20", label: "10 000 € – 20 000 €" },
  { value: "plus-20", label: "Plus de 20 000 €" },
  { value: "non-defini", label: "Non défini" },
] as const;

type Status = "idle" | "loading" | "success" | "error";

interface ContactFormProps {
  variant?: "page" | "inline";
}

export function ContactForm({ variant = "page" }: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const body = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      projectType: formData.get("projectType") as string,
      budget: formData.get("budget") as string,
      message: formData.get("message") as string,
    };

    if (!body.name?.trim() || !body.email?.trim() || !body.message?.trim()) {
      setStatus("error");
      setErrorMessage("Merci de remplir les champs obligatoires.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          (data.error as string) || "Une erreur est survenue. Réessayez ou écrivez à contact@phantomdev.fr."
        );
        return;
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Erreur de connexion. Réessayez ou contactez-nous par email.");
    }
  }

  const isInline = variant === "inline";
  const inputClass =
    "w-full border border-[#f5f5f0]/20 bg-[#0a0a0a] px-4 py-3 text-sm font-light tracking-[0.02em] text-[#f5f5f0] placeholder:text-[#f5f5f0]/40 focus:border-[#d4af37]/50 focus:outline-none focus:ring-1 focus:ring-[#d4af37]/30";
  const labelClass = "mb-1.5 block text-xs font-light tracking-[0.08em] text-[#f5f5f0]/70";

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-sm border border-[#d4af37]/30 bg-[#d4af37]/5 px-6 py-10 text-center"
        role="status"
        aria-live="polite"
      >
        <CheckCircle size={40} className="text-[#d4af37]" strokeWidth={1.5} />
        <div>
          <p className="text-sm font-light tracking-[0.05em] text-[#f5f5f0]">
            Message envoyé avec succès.
          </p>
          <p className="mt-1 text-xs font-light tracking-[0.08em] text-[#f5f5f0]/70">
            Réponse sous 48h à l&apos;adresse indiquée.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={isInline ? "space-y-4 max-w-xl" : "mx-auto max-w-xl space-y-5"}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Nom / Société *
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Votre nom ou société"
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email *
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="vous@exemple.fr"
            className={inputClass}
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-projectType" className={labelClass}>
            Type de projet
          </label>
          <select
            id="contact-projectType"
            name="projectType"
            className={inputClass}
            disabled={status === "loading"}
          >
            {PROJECT_TYPES.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="contact-budget" className={labelClass}>
            Budget approximatif
          </label>
          <select
            id="contact-budget"
            name="budget"
            className={inputClass}
            disabled={status === "loading"}
          >
            {BUDGETS.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Votre message *
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={isInline ? 4 : 5}
          placeholder="Décrivez votre projet, vos objectifs et vos délais..."
          className={`${inputClass} resize-y min-h-[120px]`}
          disabled={status === "loading"}
        />
      </div>

      {status === "error" && errorMessage && (
        <div
          className="flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200"
          role="alert"
        >
          <AlertCircle size={18} className="shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center justify-center gap-2 border border-[#d4af37]/50 bg-[#d4af37]/10 px-8 py-3.5 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#d4af37]/20 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={18} className="animate-spin" strokeWidth={1.5} />
              Envoi en cours...
            </>
          ) : (
            <>
              <Mail size={18} strokeWidth={1.5} />
              Envoyer la demande
            </>
          )}
        </button>
        <p className="text-xs font-light tracking-[0.08em] text-[#f5f5f0]/50">
          Devis gratuit sous 48h, sans engagement.
        </p>
      </div>
    </form>
  );
}
