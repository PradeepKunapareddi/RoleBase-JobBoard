import { cn } from "@/lib/utils";

export function MatchScore({ score, className, size = "md" }: { score: number; className?: string; size?: "sm" | "md" | "lg" }) {
  const dim = size === "sm" ? 40 : size === "lg" ? 88 : 56;
  const stroke = size === "sm" ? 4 : size === "lg" ? 8 : 6;
  const r = (dim - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (score / 100) * c;
  const color = score >= 85 ? "text-emerald-500" : score >= 70 ? "text-brand" : "text-amber-500";

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: dim, height: dim }} aria-label={`AI match ${score}%`}>
      <svg width={dim} height={dim} className="-rotate-90">
        <circle cx={dim / 2} cy={dim / 2} r={r} stroke="currentColor" strokeWidth={stroke} className="text-muted opacity-40" fill="none" />
        <circle cx={dim / 2} cy={dim / 2} r={r} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={off} className={cn("transition-all duration-700", color)} fill="none" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <span className={cn("font-display font-semibold tabular-nums", size === "sm" ? "text-[10px]" : size === "lg" ? "text-xl" : "text-xs", color)}>
          {score}%
        </span>
      </div>
    </div>
  );
}
