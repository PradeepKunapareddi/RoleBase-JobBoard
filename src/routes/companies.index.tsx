import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/company-logo";
import { companies } from "@/data/companies";
import { getJobsByCompany } from "@/data/jobs";

export const Route = createFileRoute("/companies/")({
  component: CompaniesPage,
  head: () => ({
    meta: [
      { title: "Companies — Rolebase" },
      { name: "description", content: "Browse top hiring companies on Rolebase." },
    ],
  }),
});

function CompaniesPage() {
  const [q, setQ] = useState("");
  const filtered = companies.filter((c) =>
    `${c.name} ${c.industry}`.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Companies</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {companies.length} companies actively hiring on Rolebase
        </p>
      </div>

      <div className="mb-6 flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-elegant">
        <Search className="ml-2 h-4 w-4 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search companies by name or industry…"
          className="border-0 bg-transparent shadow-none focus-visible:ring-0"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((c) => {
          const openJobs = getJobsByCompany(c.slug);
          return (
            <Link
              key={c.id}
              to="/companies/$slug"
              params={{ slug: c.slug }}
              className="card-hover group flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <div className="flex items-start gap-3">
                <CompanyLogo company={c} size="lg" />
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="truncate font-semibold">{c.name}</span>
                    {c.verified && <span className="text-brand text-xs">✓</span>}
                  </div>
                  <div className="text-xs text-muted-foreground">{c.industry}</div>
                  <div className="mt-1 flex items-center gap-1 text-[11px] text-amber-500">
                    <Star className="h-3 w-3 fill-current" /> {c.rating}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{c.mission}</p>
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">{c.size}</Badge>
                <span className="text-xs font-medium text-brand">{openJobs.length} open roles</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
