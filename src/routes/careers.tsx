import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({ meta: [{ title: "Careers at Rolebase" }] }),
});

const openRoles = [
  { title: "Senior Frontend Engineer", team: "Product", location: "Remote — US", type: "Full-time" },
  { title: "ML Engineer, Matching", team: "AI", location: "San Francisco, CA", type: "Full-time" },
  { title: "Product Designer", team: "Design", location: "Remote — Global", type: "Full-time" },
  { title: "Growth Marketing Manager", team: "Marketing", location: "New York, NY", type: "Full-time" },
  { title: "Customer Success Manager", team: "Customer Success", location: "Remote — US", type: "Full-time" },
];

function CareersPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Join the Rolebase Team</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">We're building the future of hiring. Come help us make job searching fast, fair, and human.</p>
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        {[
          { value: "Remote-first", label: "Work from anywhere" },
          { value: "Top-of-market", label: "Compensation" },
          { value: "Equity", label: "For every employee" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center">
            <div className="font-display text-xl font-bold text-gradient">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <h2 className="mb-4 font-display text-2xl font-bold">Open Roles</h2>
      <div className="space-y-3">
        {openRoles.map((r) => (
          <div key={r.title} className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-brand transition-colors">
            <div>
              <div className="font-semibold">{r.title}</div>
              <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{r.team}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{r.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{r.type}</Badge>
              <Button size="sm" className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">Apply</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
