"use client";

import { useState } from "react";
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
  projectType: string;
  budget: string;
  needs: string[];
  message: string;
}): string {
  const lines: string[] = [
    "Bonjour, je souhaite demander un devis.",
    "",
    `Nom / Société : ${data.name.trim() || "—"}`,
    `Type de projet : ${data.projectType || "—"}`,
    `Budget : ${data.budget || "—"}`,
  ];
  if (data.needs.length > 0) {
    lines.push(`Besoins : ${data.needs.join(", ")}`);
  }
  if (data.message.trim()) {
    lines.push("");
    lines.push("Message :");
    lines.push(data.message.trim());
  }
  return lines.join("\n");
}

const inputClass =
  "w-full border border-[#f5f5f0]/20 bg-[#0a0a0a] px-4 py-3 text-sm font-light tracking-[0.02em] text-[#f5f5f0] placeholder:text-[#f5f5f0]/40 focus:border-[#25D366]/50 focus:outline-none focus:ring-1 focus:ring-[#25D366]/30";
const labelClass =
  "mb-1.5 block text-xs font-light tracking-[0.08em] text-[#f5f5f0]/70";

export function WhatsAppForm() {
  const [name, setName] = useState("");
  const [projectType, setProjectType] = useState("");
  const [budget, setBudget] = useState("");
  const [needs, setNeeds] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function toggleNeed(id: string) {
    setNeeds((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const projectLabel =
      PROJECT_TYPES.find((p) => p.value === projectType)?.label || projectType || "—";
    const budgetLabel =
      BUDGETS.find((b) => b.value === budget)?.label || budget || "—";
    const needsLabels = needs
      .map((id) => NEEDS.find((n) => n.id === id)?.label || id)
      .filter(Boolean);
    const text = buildWhatsAppMessage({
      name,
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
    >
      <div>
        <label htmlFor="wa-name" className={labelClass}>
          Nom / Société
        </label>
        <input
          id="wa-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Votre nom ou société"
          className={inputClass}
        />
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
      >
        <MessageCircle size={20} strokeWidth={1.5} />
        Envoyer la demande sur WhatsApp
      </button>
    </form>
  );
}
