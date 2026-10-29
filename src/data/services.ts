import type { LucideIcon } from "lucide-react";
import {
  Palette,
  Box,
  Search,
  Brain,
  Wrench,
  ShoppingCart,
  Rocket,
  RefreshCw,
  Plug,
  Gauge,
  Cloud,
  Bot,
  Smartphone,
  ClipboardCheck,
} from "lucide-react";

export type ServiceCategory =
  | "vitrine"
  | "application"
  | "dev"
  | "seo"
  | "ia"
  | "maintenance";

export type ServiceFilterValue = ServiceCategory | "all";

export type ServiceId =
  | "conception"
  | "landing"
  | "ecommerce"
  | "applications"
  | "saas"
  | "mobile"
  | "api"
  | "refonte"
  | "performance"
  | "seo"
  | "ia"
  | "automation"
  | "conseil"
  | "maintenance";

export type ServiceConfig = {
  id: ServiceId;
  categories: ServiceCategory[];
  icon: LucideIcon;
  typeParam: string;
  projectRef?: "phantom-art" | "redk-motors";
  hasProjectLabel?: boolean;
  hasBadge?: boolean;
};

export const SERVICE_FILTERS: { value: ServiceFilterValue; labelKey: string }[] = [
  { value: "all", labelKey: "all" },
  { value: "vitrine", labelKey: "vitrine" },
  { value: "application", labelKey: "application" },
  { value: "dev", labelKey: "dev" },
  { value: "seo", labelKey: "seo" },
  { value: "ia", labelKey: "ia" },
  { value: "maintenance", labelKey: "maintenance" },
];

export const serviceConfigs: ServiceConfig[] = [
  {
    id: "conception",
    categories: ["vitrine", "dev"],
    icon: Palette,
    typeParam: "vitrine",
  },
  {
    id: "landing",
    categories: ["vitrine"],
    icon: Rocket,
    typeParam: "vitrine",
  },
  {
    id: "ecommerce",
    categories: ["application", "vitrine"],
    icon: ShoppingCart,
    typeParam: "application",
  },
  {
    id: "applications",
    categories: ["application", "dev"],
    icon: Box,
    typeParam: "application",
    hasBadge: true,
  },
  {
    id: "saas",
    categories: ["application", "dev"],
    icon: Cloud,
    typeParam: "application",
  },
  {
    id: "mobile",
    categories: ["application", "dev"],
    icon: Smartphone,
    typeParam: "application",
  },
  {
    id: "api",
    categories: ["dev", "application"],
    icon: Plug,
    typeParam: "autre",
  },
  {
    id: "refonte",
    categories: ["dev"],
    icon: RefreshCw,
    typeParam: "autre",
  },
  {
    id: "performance",
    categories: ["dev", "seo"],
    icon: Gauge,
    typeParam: "seo",
  },
  {
    id: "seo",
    categories: ["seo"],
    icon: Search,
    typeParam: "seo",
  },
  {
    id: "ia",
    categories: ["ia"],
    icon: Brain,
    typeParam: "autre",
    hasProjectLabel: true,
  },
  {
    id: "automation",
    categories: ["ia", "dev"],
    icon: Bot,
    typeParam: "autre",
  },
  {
    id: "conseil",
    categories: ["dev"],
    icon: ClipboardCheck,
    typeParam: "autre",
  },
  {
    id: "maintenance",
    categories: ["maintenance", "dev"],
    icon: Wrench,
    typeParam: "maintenance",
  },
];

export function filterServices(
  filter: ServiceFilterValue,
  configs: ServiceConfig[] = serviceConfigs
): ServiceConfig[] {
  if (filter === "all") return configs;
  return configs.filter((s) => s.categories.includes(filter));
}
