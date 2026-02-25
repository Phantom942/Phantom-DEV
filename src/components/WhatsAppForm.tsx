"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getWhatsAppDevisUrl } from "@/data/contact";
import { MessageCircle } from "lucide-react";

const PROJECT_TYPES = [
  { value: "", label: "Type de projet" },
  { value: "vitrine", label: "Site vitrine" },
  { value: "ecommerce", label: "E-commerce" },
  { value: "application", label: "Application / SaaS" },
  { value: "maintenance", label: "Maintenance" },
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

const NEEDS = [
  { id: "design", label: "Design / identité visuelle" },
  { id: "seo", label: "SEO / référencement" },
  { id: "maintenance", label: "Maintenance continue" },
  { id: "formation", label: "Formation à la mise à jour" },
  { id: "hebergement", label: "Hébergement inclus" },
] as const;

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
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

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
      ? PROJECT_TYPES.find((p) => p.value === projectType)?.label || projectType
      : "";
    const budgetLabel = budget
      ? BUDGETS.find((b) => b.value === budget)?.label || budget
      : "";
    const needsLabels = needs
      .map((id) => NEEDS.find((n) => n.id === id)?.label || id)
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
            Nom
          </label>
          <input
            id="wa-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Votre nom"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="wa-company" className={labelClass}>
            Société
          </label>
          <input
            id="wa-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Votre société (optionnel)"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="wa-type" className={labelClass}>
            Type de projet
          </label>
          <select
            id="wa-type"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            className={inputClass}
          >
            {PROJECT_TYPES.map((opt) => (
              <option key={opt.value || "empty"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="wa-budget" className={labelClass}>
            Budget approximatif
          </label>
          <select
            id="wa-budget"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className={inputClass}
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
        <span className={labelClass}>Besoins (optionnel)</span>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3">
          {NEEDS.map((need) => (
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
          Votre message
        </label>
        <textarea
          id="wa-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Décrivez votre projet, objectifs, délais..."
          className={`${inputClass} resize-y min-h-[100px]`}
        />
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366]/60 bg-[#25D366]/10 px-8 py-4 text-sm font-light tracking-[0.15em] text-[#f5f5f0] transition-all hover:bg-[#25D366]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:w-auto"
        aria-label="Envoyer la demande de devis sur WhatsApp pour votre projet développement web"
      >
        <MessageCircle size={20} strokeWidth={1.5} />
        Envoyer la demande sur WhatsApp
      </button>
    </form>
  );
}
