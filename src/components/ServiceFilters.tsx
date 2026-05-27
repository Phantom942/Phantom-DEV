"use client";

import type { ServiceFilterValue } from "@/data/services";
import { SERVICE_FILTERS } from "@/data/services";
import { useTranslations } from "@/hooks/useTranslations";

type ServiceFiltersProps = {
  value: ServiceFilterValue;
  onChange: (value: ServiceFilterValue) => void;
};

export function ServiceFilters({ value, onChange }: ServiceFiltersProps) {
  const { t } = useTranslations();
  const labels = t.servicesPage.filters;

  return (
    <div
      className="service-filter-bar mb-10 rounded-lg border border-zinc-800/90 bg-zinc-900/40 px-3 py-4 sm:px-4 sm:py-5"
      role="tablist"
      aria-label={labels.tablistAria}
    >
      <div className="flex flex-wrap justify-center gap-2 sm:justify-start sm:gap-3">
        {SERVICE_FILTERS.map((f) => (
          <button
            key={f.value}
            type="button"
            role="tab"
            aria-selected={value === f.value}
            onClick={() => onChange(f.value)}
            className="service-filter-tab"
            data-active={value === f.value}
          >
            {labels[f.labelKey as "all" | "vitrine" | "application" | "dev" | "seo" | "ia" | "maintenance"]}
          </button>
        ))}
      </div>
    </div>
  );
}
