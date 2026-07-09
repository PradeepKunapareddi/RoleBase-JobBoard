import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { JobCard, JobCardSkeleton } from "@/components/jobs/job-card";
import { JobFilters, defaultFilters, type Filters } from "@/components/jobs/job-filters";
import { QuickApplyModal } from "@/components/jobs/quick-apply-modal";
import { jobs, type Job } from "@/data/jobs";
import { getCompany } from "@/data/companies";

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.string().optional(),
  sort: z.enum(["latest", "salary-high", "salary-low", "relevance", "popularity"]).optional(),
});

export const Route = createFileRoute("/jobs")({
  validateSearch: (s) => searchSchema.parse(s),
  component: JobsLayout,
  head: () => ({
    meta: [
      { title: "Browse jobs — Rolebase" },
      { name: "description", content: "Search and filter across 50,000+ curated tech roles. Filter by location, salary, experience, and more." },
      { property: "og:title", content: "Browse jobs — Rolebase" },
      { property: "og:description", content: "Search and filter across 50,000+ curated tech roles." },
      { property: "og:url", content: "/jobs" },
    ],
    links: [{ rel: "canonical", href: "/jobs" }],
  }),
});

function JobsLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname !== "/jobs") return <Outlet />;
  return <BrowseJobs />;
}

function BrowseJobs() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [q, setQ] = useState(search.q ?? "");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sort, setSort] = useState<string>(search.sort ?? "latest");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const pageSize = 8;

  useEffect(() => { setQ(search.q ?? ""); }, [search.q]);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(t);
  }, [q, filters, sort, search.category]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = jobs.filter((j) => {
      const company = getCompany(j.companySlug);
      if (query) {
        const hay = `${j.title} ${company?.name ?? ""} ${j.skills.join(" ")} ${j.location}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      if (search.category && j.category !== search.category) return false;
      if (filters.workMode.length && !filters.workMode.includes(j.workMode)) return false;
      if (filters.types.length && !filters.types.includes(j.type)) return false;
      if (filters.experience.length && !filters.experience.includes(j.experience)) return false;
      if (filters.industries.length && !filters.industries.includes(j.industry)) return false;
      if (filters.companySizes.length && company && !filters.companySizes.includes(company.size)) return false;
      if (j.salaryMax < filters.salary[0] * 1000) return false;
      if (j.salaryMin > filters.salary[1] * 1000) return false;
      if (j.postedDaysAgo > filters.postedWithinDays) return false;
      return true;
    });
    switch (sort) {
      case "salary-high": list = [...list].sort((a, b) => b.salaryMax - a.salaryMax); break;
      case "salary-low": list = [...list].sort((a, b) => a.salaryMin - b.salaryMin); break;
      case "relevance": list = [...list].sort((a, b) => b.matchScore - a.matchScore); break;
      case "popularity": list = [...list].sort((a, b) => b.applicants - a.applicants); break;
      default: list = [...list].sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
    }
    return list;
  }, [q, filters, sort, search.category]);

  const visible = filtered.slice(0, page * pageSize);
  const hasMore = visible.length < filtered.length;

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, q: q || undefined }) });
    setPage(1);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Browse jobs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {filtered.length} roles matching your search {search.category ? `in ${search.category}` : ""}
        </p>
      </div>

      <form onSubmit={submit} className="sticky top-16 z-20 mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card/80 p-2 backdrop-blur shadow-elegant">
        <div className="flex flex-1 items-center gap-2 pl-2">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by keyword, company, or skill…"
            className="h-11 border-0 bg-transparent shadow-none focus-visible:ring-0"
            aria-label="Search jobs"
          />
        </div>
        <Select value={sort} onValueChange={(v) => { setSort(v); setPage(1); }}>
          <SelectTrigger className="h-11 w-[160px]"><SelectValue placeholder="Sort" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="relevance">Best match</SelectItem>
            <SelectItem value="salary-high">Salary: High to Low</SelectItem>
            <SelectItem value="salary-low">Salary: Low to High</SelectItem>
            <SelectItem value="popularity">Popularity</SelectItem>
          </SelectContent>
        </Select>
        <Sheet>
          <SheetTrigger asChild>
            <Button type="button" variant="outline" className="h-11 lg:hidden" aria-label="Open filters">
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[340px] overflow-y-auto p-4">
            <JobFilters value={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
          </SheetContent>
        </Sheet>
        <Button type="submit" className="h-11 bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">Search</Button>
      </form>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-40">
            <JobFilters value={filters} onChange={(f) => { setFilters(f); setPage(1); }} />
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="grid gap-4">{Array.from({ length: 5 }).map((_, i) => <JobCardSkeleton key={i} />)}</div>
          ) : filtered.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-16 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-muted"><Filter className="h-6 w-6 text-muted-foreground" /></div>
              <h3 className="mt-4 font-display text-lg font-semibold">No jobs match your filters</h3>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">Try clearing some filters or searching a broader keyword.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setFilters(defaultFilters); setQ(""); }}>Reset filters</Button>
            </div>
          ) : (
            <>
              <div className="grid gap-4">
                {visible.map((j) => <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />)}
              </div>
              {hasMore && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline" onClick={() => setPage((p) => p + 1)} className="h-11 px-6">Load more</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <QuickApplyModal job={applyJob} open={!!applyJob} onOpenChange={(v) => !v && setApplyJob(null)} />
    </div>
  );
}
