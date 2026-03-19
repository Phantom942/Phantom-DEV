"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { MessageCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const FORM_STORAGE_KEY = "phantomdev_contact_draft";

function buildWhatsAppMessage(data: {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  urgency: string;
  needs: string[];
  message: string;
}): string {
  const nom = data.name.trim() || "un visiteur";
  const email = data.email.trim();
  const typeProjet = data.projectType || "projet web";
  const budget = data.budget || "non défini";
  const urgence = data.urgency || "non défini";
  const besoins =
    data.needs.length > 0 ? data.needs.join(", ") : "à définir";
  const message = data.message.trim();

  let msg = `Bonjour,

Je suis ${nom}`;
  if (email) msg += ` (${email})`;
  msg += `. Je souhaite un devis pour ${typeProjet}.
Budget : ${budget} | Délai : ${urgence}
Besoins : ${besoins}`;
  if (message) {
    msg += `\n\nMessage :\n${message}`;
  }
  return msg;
}

const inputClass =
  "w-full border border-[#f5f5f0]/20 bg-[#0a0a0a] px-4 py-3 text-sm font-light tracking-[0.02em] text-[#f5f5f0] placeholder:text-[#f5f5f0]/40 focus:border-[#25D366]/50 focus:outline-none focus:ring-1 focus:ring-[#25D366]/30";
const inputErrorClass =
  "w-full border border-red-500/50 bg-[#0a0a0a] px-4 py-3 text-sm font-light tracking-[0.02em] text-[#f5f5f0] placeholder:text-[#f5f5f0]/40 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500/30";
const labelClass =
  "mb-1.5 block text-xs font-light tracking-[0.08em] text-[#f5f5f0]/70";

const TYPE_VALUES = ["vitrine", "ecommerce", "application", "maintenance", "autre"] as const;

interface FormState {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  urgency: string;
  needs: string[];
  message: string;
}

function getInitialState(): FormState {
  if (typeof window === "undefined") {
    return {
      name: "",
      email: "",
      company: "",
      projectType: "",
      budget: "",
      urgency: "",
      needs: [],
      message: "",
    };
  }
  try {
    const saved = localStorage.getItem(FORM_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<FormState>;
      return {
        name: parsed.name ?? "",
        email: parsed.email ?? "",
        company: parsed.company ?? "",
        projectType: parsed.projectType ?? "",
        budget: parsed.budget ?? "",
        urgency: parsed.urgency ?? "",
        needs: Array.isArray(parsed.needs) ? parsed.needs : [],
        message: parsed.message ?? "",
      };
    }
  } catch {
    // ignore
  }
  return {
    name: "",
    email: "",
    company: "",
    projectType: "",
    budget: "",
    urgency: "",
    needs: [],
    message: "",
  };
}

export function WhatsAppForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const cf = t.contactForm;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [urgency, setUrgency] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: boolean; message?: boolean }>({});
  const [touched, setTouched] = useState(false);

  const projectTypes = [
    { value: "", label: cf.projectTypes.empty },
    { value: "vitrine", label: cf.projectTypes.vitrine },
    { value: "ecommerce", label: cf.projectTypes.ecommerce },
    { value: "application", label: cf.projectTypes.application },
    { value: "maintenance", label: cf.projectTypes.maintenance },
    { value: "autre", label: cf.projectTypes.autre },
  ];
  const budgets = [
    { value: "", label: cf.budgets.empty },
    { value: "moins-5", label: cf.budgets["moins-5"] },
    { value: "5-10", label: cf.budgets["5-10"] },
    { value: "10-20", label: cf.budgets["10-20"] },
    { value: "plus-20", label: cf.budgets["plus-20"] },
    { value: "non-defini", label: cf.budgets["non-defini"] },
  ];
  const urgencyOptions = [
    { value: "", label: cf.urgencyOptions.empty },
    { value: "asap", label: cf.urgencyOptions.asap },
    { value: "1month", label: cf.urgencyOptions["1month"] },
    { value: "3months", label: cf.urgencyOptions["3months"] },
    { value: "undefined", label: cf.urgencyOptions.undefined },
  ];
  const needsList = [
    { id: "design", label: cf.needsLabels.design },
    { id: "seo", label: cf.needsLabels.seo },
    { id: "maintenance", label: cf.needsLabels.maintenance },
    { id: "formation", label: cf.needsLabels.formation },
    { id: "hebergement", label: cf.needsLabels.hebergement },
  ];

  useEffect(() => {
    const state = getInitialState();
    setName(state.name);
    setEmail(state.email);
    setCompany(state.company);
    setProjectType(state.projectType);
    setBudget(state.budget);
    setUrgency(state.urgency);
    setNeeds(state.needs);
    setMessage(state.message);
  }, []);

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && TYPE_VALUES.includes(type as (typeof TYPE_VALUES)[number])) {
      setProjectType(type);
    }
  }, [searchParams]);

  const saveDraft = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        FORM_STORAGE_KEY,
        JSON.stringify({ name, email, company, projectType, budget, urgency, needs, message })
      );
    } catch {
      // ignore
    }
  }, [name, email, company, projectType, budget, urgency, needs, message]);

  useEffect(() => {
    saveDraft();
  }, [saveDraft]);

  function toggleNeed(id: string) {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const nameValid = name.trim().length > 0;
    const messageValid = message.trim().length > 0;
    setErrors({
      name: !nameValid,
      message: !messageValid,
    });

    if (!nameValid || !messageValid) {
      return;
    }

    const projectLabel = projectType
      ? projectTypes.find((p) => p.value === projectType)?.label || projectType
      : "";
    const budgetLabel = budget
      ? budgets.find((b) => b.value === budget)?.label || budget
      : "";
    const urgencyLabel = urgency
      ? urgencyOptions.find((u) => u.value === urgency)?.label || urgency
      : "";
    const needsLabels = needs
      .map((id) => needsList.find((n) => n.id === id)?.label || id)
      .filter(Boolean);
    const text = buildWhatsAppMessage({
      name,
      email,
      company,
      projectType: projectLabel,
      budget: budgetLabel,
      urgency: urgencyLabel,
      needs: needsLabels,
      message,
    });
    try {
      localStorage.removeItem(FORM_STORAGE_KEY);
    } catch {
      // ignore
    }
    window.open(getWhatsAppDevisUrl(text), "_blank", "noopener,noreferrer");
  }

  const nameInvalid = touched && errors.name;
  const messageInvalid = touched && errors.message;

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-xl space-y-5"
      noValidate
      aria-label="Formulaire de demande de devis : projet web, site vitrine, e-commerce ou SaaS"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="wa-name" className={labelClass}>
            {cf.name} <span className="text-red-400">*</span>
          </label>
          <input
            id="wa-name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: false }));
            }}
            placeholder={cf.namePlaceholder}
            className={nameInvalid ? inputErrorClass : inputClass}
            required
            aria-required="true"
            aria-invalid={nameInvalid || undefined}
            aria-describedby={nameInvalid ? "wa-name-error" : undefined}
          />
          {nameInvalid && (
            <p id="wa-name-error" className="mt-1.5 flex items-center gap-2 text-xs text-red-400" role="alert">
              <AlertCircle size={14} className="shrink-0" />
              {cf.nameRequired}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="wa-email" className={labelClass}>
            {cf.email}
          </label>
          <input
            id="wa-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={cf.emailPlaceholder}
            className={inputClass}
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="wa-company" className={labelClass}>
          {cf.company}
        </label>
        <input
          id="wa-company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder={cf.companyPlaceholder}
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="wa-type" className={labelClass}>
            {cf.projectType}
          </label>
          <select
            id="wa-type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={inputClass}
          >
            {projectTypes.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wa-budget" className={labelClass}>
            {cf.budget}
          </label>
          <select
            id="wa-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={inputClass}
          >
            {budgets.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="wa-urgency" className={labelClass}>
          {cf.urgency}
        </label>
        <select
          id="wa-urgency"
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className={inputClass}
        >
          {urgencyOptions.map((opt) => (
            <option key={opt.value || "empty"} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <span className={labelClass}>{cf.needs}</span>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
          {needsList.map((need) => (
            <label
              key={need.id}
              className="flex cursor-pointer items-center gap-2 text-sm font-light text-[#f5f5f0]/85"
            >
              <input
                type="checkbox"
                checked={needs.includes(need.id)}
                onChange={() => toggleNeed(need.id)}
                className="h-4 w-4 border-[#f5f5f0]/30 bg-[#0a0a0a] text-[#25D366] focus:ring-[#25D366]/50"
              />
              <span>{need.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="wa-message" className={labelClass}>
          {cf.message} <span className="text-red-400">*</span>
        </label>
        <textarea
          id="wa-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message) setErrors((prev) => ({ ...prev, message: false }));
          }}
          rows={4}
          placeholder={cf.messagePlaceholder}
          className={`${messageInvalid ? inputErrorClass : inputClass} resize-y min-h-[100px]`}
          required
          aria-required="true"
          aria-invalid={messageInvalid || undefined}
          aria-describedby={messageInvalid ? "wa-message-error" : undefined}
        />
        {messageInvalid && (
          <p id="wa-message-error" className="mt-1.5 flex items-center gap-2 text-xs text-red-400" role="alert">
            <AlertCircle size={14} className="shrink-0" />
            {cf.messageRequired}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
          aria-label={cf.submit}
        >
          <MessageCircle size={20} strokeWidth={1.5} />
          {cf.submit}
        </button>
        <p className="text-xs font-light tracking-[0.08em] text-[#f5f5f0]/50">
          {cf.response48h}
        </p>
      </div>
    </form>
  );
}
