import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/changelog")({
  component: ChangelogPage,
  head: () => ({ meta: [{ title: "Changelog — Rolebase" }] }),
});

const changes = [
  { version: "v2.4.0", date: "July 2026", type: "Feature", items: ["AI Match page with personalized job recommendations", "Salary Insights with real-time compensation data", "Companies directory with search and filtering", "Profile completion tracker with progress bar"] },
  { version: "v2.3.0", date: "June 2026", type: "Feature", items: ["My Profile page with education and experience sections", "Resume upload and management", "Auto-populate apply modal from profile data", "Cover letter field in job applications"] },
  { version: "v2.2.0", date: "May 2026", type: "Improvement", items: ["Improved search performance by 3x", "Better mobile responsiveness across all pages", "Dark mode improvements", "Accessibility enhancements (WCAG 2.1 AA)"] },
  { version: "v2.1.0", date: "April 2026", type: "Feature", items: ["Dashboard with activity charts", "Job bookmarking and saved jobs", "Recently viewed jobs tracking", "Application status tracking"] },
  { version: "v2.0.0", date: "March 2026", type: "Major", items: ["Complete redesign with new design system", "AI-powered job matching with match scores", "Company profiles with detailed information", "Advanced job filtering and sorting"] },
];

const typeColors: Record<string, string> = {
  Feature: "bg-brand/15 text-brand",
  Improvement: "bg-emerald-500/15 text-emerald-600",
  Major: "bg-amber-500/15 text-amber-700",
  Fix: "bg-rose-500/15 text-rose-600",
};

function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">Changelog</h1>
        <p className="mt-3 text-muted-foreground">All notable changes to Rolebase are documented here.</p>
      </div>

      <div className="relative space-y-8 before:absolute before:left-[7px] before:top-2 before:h-full before:w-0.5 before:bg-border">
        {changes.map((c) => (
          <div key={c.version} className="relative pl-8">
            <div className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-brand bg-background" />
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <span className="font-display text-lg font-bold">{c.version}</span>
              <Badge className={`text-xs ${typeColors[c.type] || ""}`}>{c.type}</Badge>
              <span className="text-sm text-muted-foreground">{c.date}</span>
            </div>
            <ul className="space-y-1.5">
              {c.items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
