import { cn } from "@/lib/utils";
import type { Company } from "@/data/companies";

export function CompanyLogo({ company, size = "md", className }: { company: Company; size?: "sm" | "md" | "lg" | "xl"; className?: string }) {
  const s = size === "sm" ? "h-9 w-9 text-sm" : size === "md" ? "h-12 w-12 text-lg" : size === "lg" ? "h-16 w-16 text-2xl" : "h-24 w-24 text-4xl";
  return (
    <div
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl bg-gradient-to-br font-display font-bold text-white shadow-elegant",
        company.color,
        s,
        className,
      )}
      aria-label={`${company.name} logo`}
    >
      {company.logo}
    </div>
  );
}
