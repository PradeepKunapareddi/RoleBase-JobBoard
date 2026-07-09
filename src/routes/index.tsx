import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Briefcase, Building2, Check, ChevronRight, Code2, Layers, Megaphone, Palette, Search, Sparkles, Star, TrendingUp, Users, Zap } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CompanyLogo } from "@/components/company-logo";
import { JobCard } from "@/components/jobs/job-card";
import { QuickApplyModal } from "@/components/jobs/quick-apply-modal";
import { categoriesList, jobs, trendingSearches, type Job } from "@/data/jobs";
import { companies } from "@/data/companies";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Rolebase — The AI-native job board" },
      { name: "description", content: "50,000+ curated tech roles with AI match scores, salary insights, and one-click apply." },
      { property: "og:title", content: "Rolebase — The AI-native job board" },
      { property: "og:description", content: "50,000+ curated tech roles with AI match scores, salary insights, and one-click apply." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2, Palette, Layers, Sparkles, Megaphone, TrendingUp, Users,
};

function LandingPage() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const featured = jobs.filter((j) => j.featured).slice(0, 6);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate({ to: "/jobs", search: q ? { q } as never : undefined });
  };

  return (
    <>
      {/* HERO */}
      <section className="hero-gradient relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] [background:radial-gradient(circle_at_center,_var(--foreground)_1px,_transparent_1px)] [background-size:22px_22px]" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 md:pt-24">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-brand hover:bg-brand/15" variant="outline">
              <Sparkles className="mr-1.5 h-3 w-3" /> AI match scoring is now live
            </Badge>
            <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Find your next role <br className="hidden sm:block" />
              at a company you'll <span className="text-gradient">actually love</span>.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              50,000+ curated roles at leading tech companies — with AI match scores, real salary data,
              and one-click apply. Built for people who take their careers seriously.
            </p>
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} onSubmit={submit}
            className="mx-auto mt-9 flex max-w-2xl items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-elegant">
            <div className="flex flex-1 items-center gap-2 pl-2">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search 'React', 'AI Engineer', 'Product Designer'…"
                className="h-11 border-0 bg-transparent text-base shadow-none focus-visible:ring-0"
                aria-label="Search jobs"
              />
            </div>
            <Button type="submit" size="lg" className="h-11 rounded-xl bg-gradient-to-r from-brand to-indigo-500 px-6 text-white hover:opacity-90">
              Search <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.form>

          <div className="mx-auto mt-4 flex max-w-2xl flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-muted-foreground">Trending:</span>
            {trendingSearches.map((t) => (
              <button
                key={t}
                onClick={() => navigate({ to: "/jobs", search: { q: t } as never })}
                className="rounded-full border border-border bg-card px-3 py-1 text-muted-foreground transition-colors hover:border-brand hover:text-brand"
              >
                {t}
              </button>
            ))}
          </div>

          {/* stats */}
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: "Open roles", value: "50,248" },
              { label: "Hiring companies", value: "3,800+" },
              { label: "Avg match score", value: "82%" },
              { label: "Hired last month", value: "12k" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.05 }}
                className="rounded-2xl border border-border bg-card/70 p-5 text-center backdrop-blur">
                <div className="font-display text-2xl font-bold tracking-tight text-gradient">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED COMPANIES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Featured companies</h2>
            <p className="mt-1 text-sm text-muted-foreground">Top employers actively hiring on Rolebase</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {companies.slice(0, 8).map((c) => (
            <Link key={c.id} to="/companies/$slug" params={{ slug: c.slug }} className="card-hover group flex items-center gap-3 rounded-2xl border border-border bg-card p-4">
              <CompanyLogo company={c} size="md" />
              <div className="min-w-0">
                <div className="flex items-center gap-1">
                  <div className="truncate font-semibold">{c.name}</div>
                  {c.verified && <span className="text-brand text-xs">✓</span>}
                </div>
                <div className="truncate text-xs text-muted-foreground">{c.industry}</div>
                <div className="mt-1 inline-flex items-center gap-1 text-[11px] text-amber-500">
                  <Star className="h-3 w-3 fill-current" /> {c.rating}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Explore by category</h2>
          <p className="mt-1 text-sm text-muted-foreground">Handpicked opportunities across every discipline</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
          {categoriesList.map((cat) => {
            const Icon = iconMap[cat.icon] ?? Code2;
            return (
              <Link key={cat.name} to="/jobs" search={{ category: cat.name } as never} className="card-hover group flex flex-col gap-3 rounded-2xl border border-border bg-card p-5">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-indigo-500/15 text-brand">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">{cat.name}</div>
                  <div className="text-xs text-muted-foreground">{cat.count} roles</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEATURED JOBS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Featured jobs</h2>
            <p className="mt-1 text-sm text-muted-foreground">Handpicked roles from top companies</p>
          </div>
          <Button asChild variant="ghost"><Link to="/jobs">View all <ChevronRight className="ml-1 h-4 w-4" /></Link></Button>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          {featured.map((j) => <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mb-10 text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Loved by builders and hiring teams</h2>
          <p className="mt-2 text-sm text-muted-foreground">Rolebase has helped thousands of people land roles they love.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "Priya Menon", role: "Senior Engineer, Stripe", quote: "The AI match score is uncanny — I found my current role after 3 days of searching." },
            { name: "Marco Delgado", role: "Design Lead, Figma", quote: "Rolebase surfaces roles nobody else does. Best signal-to-noise of any job board." },
            { name: "Sasha Ivanova", role: "PM, Notion", quote: "Salary insights alone are worth it. Negotiated $28k more than I would have." },
          ].map((t) => (
            <div key={t.name} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 flex gap-0.5 text-amber-500">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}</div>
              <p className="text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-indigo-500 font-semibold text-white">{t.name[0]}</div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 pt-8 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 via-indigo-500/10 to-cyan-500/10 p-8 sm:p-14">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
          <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Ready to find your next role?</h2>
              <p className="mt-3 max-w-md text-muted-foreground">Create a free profile and let our AI surface the roles that match your goals, skills, and salary expectations.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="lg" className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">
                  <Link to="/jobs"><Briefcase className="mr-2 h-4 w-4" />Browse jobs</Link>
                </Button>
                <Button asChild variant="outline" size="lg"><Link to="/dashboard">Go to dashboard</Link></Button>
              </div>
            </div>
            <ul className="grid gap-3 text-sm">
              {[
                { icon: Zap, text: "Instant AI match scores based on your profile" },
                { icon: Building2, text: "Roles from Google, OpenAI, Netflix, Airbnb and more" },
                { icon: Check, text: "Free forever for job seekers — no gimmicks" },
              ].map((f, i) => (
                <li key={i} className="flex items-center gap-3 rounded-2xl border border-border bg-card/70 p-4 backdrop-blur">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand/15 text-brand"><f.icon className="h-4 w-4" /></div>
                  <span className="text-foreground">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <QuickApplyModal job={applyJob} open={!!applyJob} onOpenChange={(v) => !v && setApplyJob(null)} />
    </>
  );
}
