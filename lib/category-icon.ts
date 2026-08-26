import { Zap, ShieldCheck, Wrench, Users, HardHat, type LucideIcon } from "lucide-react";

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  Powertrain: Zap,
  "Safety Systems": ShieldCheck,
  Diagnostics: Wrench,
  "Customer Experience": Users,
  "Safety & Compliance": HardHat,
};

export function categoryIcon(category: string): LucideIcon {
  return CATEGORY_ICONS[category] ?? Wrench;
}
