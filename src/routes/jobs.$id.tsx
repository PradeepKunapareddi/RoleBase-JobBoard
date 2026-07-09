import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Building2, CheckCircle2, Clock, Copy, Flag, Globe, MapPin, Share2, Sparkles, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CompanyLogo } from "@/components/company-logo";
import { JobCard } from "@/components/jobs/job-card";
import { QuickApplyModal } from "@/components/jobs/quick-apply-modal";
import { MatchScore } from "@/components/match-score";
import { getCompany } from "@/data/companies";
import { formatSalary, getJob, jobs } from "@/data/jobs";
import { useLocalSet, useRecentlyViewed } from "@/hooks/use-local-storage";

export const Route = createFileRoute("/jobs/$id")({
  loader: ({ params }) => {
    const job = getJob(params.id);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return { meta: [{ title: "Job not found — Rolebase" }, { name: "robots", content: "noindex" }] };
    const { job } = loaderData;
    const company = getCompany(job.companySlug);
    const title = `${job.title} at ${company?.name} — Rolebase`;
    const desc = `${job.title} · ${job.location} · ${job.workMode} · ${formatSalary(job.salaryMin, job.salaryMax)}`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/jobs/${job.id}` },
      ],
      links: [{ rel: "canonical", href: `/jobs/${job.id}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "JobPosting",
          title: job.title,
          description: job.description,
          hiringOrganization: { "@type": "Organization", name: company?.name },
          employmentType: job.type.toUpperCase().replace("-", "_"),
          jobLocation: { "@type": "Place", address: job.location },
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: job.currency,
            value: { "@type": "QuantitativeValue", minValue: job.salaryMin, maxValue: job.salaryMax, unitText: "YEAR" },
          },
        }),
      }],
    };
  },
  component: JobDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Job not found</h1>
      <p className="mt-2 text-muted-foreground">This role may have closed. Browse the latest openings.</p>
      <Button asChild className="mt-6"><Link to="/jobs">Browse jobs</Link></Button>
    </div>
  ),
});

function JobDetail() {
  const { job } = Route.useLoaderData();
  const company = getCompany(job.companySlug)!;
  const bookmarks = useLocalSet("jb.bookmarks");
  const recent = useRecentlyViewed();
  const [applyOpen, setApplyOpen] = useState(false);

  useEffect(() => { recent.push(job.id); /* eslint-disable-next-line */ }, [job.id]);

  const related = jobs.filter((j) => j.companySlug === job.companySlug && j.id !== job.id).slice(0, 3);
  const saved = bookmarks.has(job.id);

  const share = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: job.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        toast.success("Link copied to clipboard");
      }
    } catch { /* cancelled */ }
  };

  const copy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  return (
    <>
      <section className="hero-gradient">
        <div className="mx-auto max-w-7xl px-4 pb-10 pt-10 sm:px-6">
          <nav className="mb-6 text-xs text-muted-foreground">
            <Link to="/jobs" className="hover:text-foreground">Jobs</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{job.title}</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex items-start gap-5">
              <CompanyLogo company={company} size="xl" />
              <div>
                <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                  <Link to="/companies/$slug" params={{ slug: company.slug }} className="font-medium text-foreground hover:text-brand">{company.name}</Link>
                  {company.verified && <CheckCircle2 className="h-4 w-4 text-brand" />}
                  {company.premium && <Badge variant="secondary">Premium</Badge>}
                </div>
                <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">{job.title}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{job.postedDaysAgo}d ago</span>
                  <span className="inline-flex items-center gap-1"><Users className="h-4 w-4" />{job.applicants} applicants</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="outline" className="rounded-full">{job.workMode}</Badge>
                  <Badge variant="outline" className="rounded-full">{job.type}</Badge>
                  <Badge variant="outline" className="rounded-full">{job.experience}</Badge>
                  {job.urgent && <Badge className="rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20"><Zap className="mr-1 h-3 w-3" />Urgent hire</Badge>}
                  {job.featured && <Badge className="rounded-full bg-brand/15 text-brand hover:bg-brand/20"><Sparkles className="mr-1 h-3 w-3" />Featured</Badge>}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <MatchScore score={job.matchScore} size="lg" />
              <div className="text-right">
                <div className="font-display text-2xl font-bold">{formatSalary(job.salaryMin, job.salaryMax)}</div>
                <div className="text-xs text-muted-foreground">Estimated base salary</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button size="lg" onClick={() => setApplyOpen(true)} className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">Apply now</Button>
                <Button size="lg" variant="outline" onClick={() => { bookmarks.toggle(job.id); toast(saved ? "Removed" : "Saved to your list"); }}>
                  {saved ? <><BookmarkCheck className="mr-2 h-4 w-4" />Saved</> : <><Bookmark className="mr-2 h-4 w-4" />Save</>}
                </Button>
              </div>
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={share}><Share2 className="mr-1.5 h-4 w-4" />Share</Button>
                <Button variant="ghost" size="sm" onClick={copy}><Copy className="mr-1.5 h-4 w-4" />Copy link</Button>
                <Button variant="ghost" size="sm" onClick={() => toast("Thanks for the report", { description: "Our team will review this posting." })}><Flag className="mr-1.5 h-4 w-4" />Report</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <Section title="About the role">
            <p className="text-sm leading-relaxed text-muted-foreground">{job.description}</p>
          </Section>

          <Section title="What you'll do">
            <BulletList items={job.responsibilities} />
          </Section>

          <Section title="What we're looking for">
            <BulletList items={job.requirements} />
          </Section>

          <Section title="Nice to haves">
            <BulletList items={job.preferred} />
          </Section>

          <Section title="Tech stack">
            <div className="flex flex-wrap gap-2">
              {job.techStack.map((s: string) => (
                <Badge key={s} variant="outline" className="rounded-full px-3 py-1 text-sm">{s}</Badge>
              ))}
            </div>
          </Section>

          <Section title="Benefits">
            <div className="grid gap-2 sm:grid-cols-2">
              {job.benefits.map((b: string) => (
                <div key={b} className="flex items-start gap-2 rounded-xl border border-border bg-card p-3 text-sm">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
          </Section>

          {related.length > 0 && (
            <Section title={`More roles at ${company.name}`}>
              <div className="grid gap-4">{related.map((j) => <JobCard key={j.id} job={j} onQuickApply={() => setApplyOpen(true)} />)}</div>
            </Section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" /> AI Insights
            </div>
            <div className="space-y-3 text-sm">
              <InsightRow label="Match score" value={`${job.matchScore}%`} />
              <InsightRow label="Hiring urgency" value={job.urgent ? "High" : "Medium"} />
              <InsightRow label="Expected response" value={`${2 + (job.applicants % 5)} days`} />
              <InsightRow label="Salary vs market" value={job.salaryMax > 180000 ? "Above market" : "Competitive"} />
            </div>
            <Separator className="my-4" />
            <div className="text-xs text-muted-foreground">
              Popular skills for this role: <span className="text-foreground">{job.skills.slice(0, 3).join(", ")}</span>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h4 className="mb-3 font-display text-sm font-semibold">About {company.name}</h4>
            <div className="flex items-center gap-3">
              <CompanyLogo company={company} size="md" />
              <div>
                <div className="text-sm font-semibold">{company.name}</div>
                <div className="text-xs text-muted-foreground">{company.industry}</div>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">{company.mission}</p>
            <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" />{company.size} employees</div>
              <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{company.headquarters}</div>
              <div className="flex items-center gap-2"><Globe className="h-3.5 w-3.5" />{company.website}</div>
            </div>
            <Button asChild variant="outline" className="mt-4 w-full"><Link to="/companies/$slug" params={{ slug: company.slug }}>View company profile</Link></Button>
          </div>
        </aside>
      </div>

      <QuickApplyModal job={job} open={applyOpen} onOpenChange={setApplyOpen} />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((it, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
function InsightRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
