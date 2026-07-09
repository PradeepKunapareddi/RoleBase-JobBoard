import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Building2, Calendar, CheckCircle2, Globe, MapPin, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompanyLogo } from "@/components/company-logo";
import { JobCard } from "@/components/jobs/job-card";
import { companies, getCompany } from "@/data/companies";
import { getJobsByCompany } from "@/data/jobs";

export const Route = createFileRoute("/companies/$slug")({
  loader: ({ params }) => {
    const company = getCompany(params.slug);
    if (!company) throw notFound();
    return { company };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Company not found — Rolebase" }, { name: "robots", content: "noindex" }] };
    const { company } = loaderData;
    return {
      meta: [
        { title: `${company.name} — Jobs on Rolebase` },
        { name: "description", content: `${company.name} · ${company.industry} · ${company.mission}` },
        { property: "og:title", content: `${company.name} — Jobs on Rolebase` },
        { property: "og:description", content: company.mission },
        { property: "og:url", content: `/companies/${company.slug}` },
      ],
      links: [{ rel: "canonical", href: `/companies/${company.slug}` }],
    };
  },
  component: CompanyPage,
});

function CompanyPage() {
  const { company } = Route.useLoaderData();
  const openJobs = getJobsByCompany(company.slug);
  const related = companies.filter((c) => c.slug !== company.slug).slice(0, 4);

  return (
    <>
      <section className="hero-gradient border-b border-border/60">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-5">
              <CompanyLogo company={company} size="xl" />
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{company.name}</h1>
                  {company.verified && <CheckCircle2 className="h-5 w-5 text-brand" />}
                  {company.premium && <Badge className="bg-gradient-to-r from-brand to-indigo-500 text-white">Premium</Badge>}
                </div>
                <p className="mt-2 max-w-xl text-sm text-muted-foreground">{company.mission}</p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{company.industry}</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{company.size} employees</span>
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{company.headquarters}</span>
                  <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />Founded {company.founded}</span>
                  <span className="inline-flex items-center gap-1 text-amber-500"><Star className="h-3.5 w-3.5 fill-current" />{company.rating}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild variant="outline"><a href={`https://${company.website}`} target="_blank" rel="noreferrer"><Globe className="mr-2 h-4 w-4" />{company.website}</a></Button>
              <Button className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">Follow</Button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-10">
          <section>
            <h2 className="mb-3 font-display text-xl font-semibold">About</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{company.about}</p>
          </section>

          <section>
            <h2 className="mb-3 font-display text-xl font-semibold">Culture</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">{company.culture}</p>
          </section>

          <section>
            <h2 className="mb-4 font-display text-xl font-semibold">Photos</h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                "from-brand/40 to-indigo-500/40",
                "from-pink-500/40 to-rose-500/40",
                "from-emerald-500/40 to-teal-500/40",
                "from-amber-500/40 to-orange-500/40",
                "from-cyan-500/40 to-sky-500/40",
                "from-violet-500/40 to-fuchsia-500/40",
              ].map((g, i) => (
                <div key={i} className={`aspect-[4/3] rounded-2xl border border-border bg-gradient-to-br ${g}`} />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Open positions</h2>
              <span className="text-sm text-muted-foreground">{openJobs.length} roles</span>
            </div>
            <div className="grid gap-4">
              {openJobs.map((j) => <JobCard key={j.id} job={j} />)}
              {openJobs.length === 0 && (
                <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
                  No open positions right now.
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-3 font-display text-sm font-semibold">Benefits</h3>
            <ul className="space-y-2 text-sm">
              {company.benefits.map((b: string) => (
                <li key={b} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-muted-foreground">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-3 font-display text-sm font-semibold">Similar companies</h3>
            <div className="space-y-3">
              {related.map((c) => (
                <Link key={c.id} to="/companies/$slug" params={{ slug: c.slug }} className="flex items-center gap-3">
                  <CompanyLogo company={c} size="sm" />
                  <div>
                    <div className="text-sm font-medium hover:text-brand">{c.name}</div>
                    <div className="text-xs text-muted-foreground">{c.industry}</div>
                  </div>
                </Link>
              ))}
            </div>
            <Separator className="my-4" />
            <Button asChild variant="ghost" className="w-full"><Link to="/jobs">Explore all jobs</Link></Button>
          </div>
        </aside>
      </div>
    </>
  );
}
