"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { MessageCircle } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";


function buildWhatsAppMessage(data: {
  name: string;
  company: string;
  projectType: string;
  budget: string;
  needs: string[];
  message: string;
}): string {
  const nom = data.name.trim() || "un visiteur";
  const typeProjet = data.projectType || "projet web";
  const budget = data.budget || "non défini";
  const besoins =
    data.needs.length > 0 ? data.needs.join(", ") : "à définir";
  const message = data.message.trim();

  let msg = `Bonjour, je suis ${nom}, je souhaite un devis pour ${typeProjet} (Budget : ${budget}). Besoins : ${besoins}.`;
  if (message) {
    msg += `\n\n${message}`;
  }
  return msg;
}

const inputClass =
  "w-full border border-[#f5f5f0]/20 bg-[#0a0a0a] px-4 py-3 text-sm font-light tracking-[0.02em] text-[#f5f5f0] placeholder:text-[#f5f5f0]/40 focus:border-[#25D366]/50 focus:outline-none focus:ring-1 focus:ring-[#25D366]/30";
const labelClass =
  "mb-1.5 block text-xs font-light tracking-[0.08em] text-[#f5f5f0]/70";

const TYPE_VALUES = ["vitrine", "ecommerce", "application", "maintenance", "autre"] as const;

export function WhatsAppForm() {
  const searchParams = useSearchParams();
  const { t } = useTranslations();
  const cf = t.contactForm;
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

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
  const needsList = [
    { id: "design", label: cf.needsLabels.design },
    { id: "seo", label: cf.needsLabels.seo },
    { id: "maintenance", label: cf.needsLabels.maintenance },
    { id: "formation", label: cf.needsLabels.formation },
    { id: "hebergement", label: cf.needsLabels.hebergement },
  ];

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && TYPE_VALUES.includes(type as (typeof TYPE_VALUES)[number])) {
      setProjectType(type);
    }
  }, [searchParams]);

  function toggleNeed(id: string) {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const projectLabel = projectType
      ? projectTypes.find((p) => p.value === projectType)?.label || projectType
      : "";
    const budgetLabel = budget
      ? budgets.find((b) => b.value === budget)?.label || budget
      : "";
    const needsLabels = needs
      .map((id) => needsList.find((n) => n.id === id)?.label || id)
      .filter(Boolean);
    const text = buildWhatsAppMessage({
      name,
      company,
      projectType: projectLabel,
      budget: budgetLabel,
      needs: needsLabels,
      message,
    });
    window.open(getWhatsAppDevisUrl(text), "_blank", "noopener,noreferrer");
  }

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
            {cf.name}
          </label>
          <input
            id="wa-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={cf.namePlaceholder}
            className={inputClass}
          />
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
          {cf.message}
        </label>
        <textarea
          id="wa-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder={cf.messagePlaceholder}
          className={`${inputClass} resize-y min-h-[100px]`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
        aria-label={cf.submit}
      >
        <MessageCircle size={20} strokeWidth={1.5} />
        {cf.submit}
      </button>
    </form>
  );
}
