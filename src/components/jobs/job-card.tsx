import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Bookmark, BookmarkCheck, Clock, MapPin, Sparkles, Zap } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CompanyLogo } from "@/components/company-logo";
import { MatchScore } from "@/components/match-score";
import { getCompany } from "@/data/companies";
import { formatSalary, type Job } from "@/data/jobs";
import { useLocalSet } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";

export function JobCard({ job, onQuickApply }: { job: Job; onQuickApply?: (job: Job) => void }) {
  const company = getCompany(job.companySlug)!;
  const bookmarks = useLocalSet("jb.bookmarks");
  const saved = bookmarks.has(job.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="card-hover group relative overflow-hidden rounded-2xl border border-border bg-card p-5"
    >
      {job.featured && (
        <div className="absolute right-0 top-0 bg-gradient-to-l from-brand/15 to-transparent px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand">
          <Sparkles className="mr-1 inline h-3 w-3" /> Featured
        </div>
      )}
      <div className="flex items-start gap-4">
        <CompanyLogo company={company} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Link to="/companies/$slug" params={{ slug: company.slug }} className="font-medium text-foreground hover:text-brand">
              {company.name}
            </Link>
            {company.verified && <span className="text-brand" title="Verified">✓</span>}
            {company.premium && <Badge variant="secondary" className="h-5 rounded-full px-2 text-[10px]">Premium</Badge>}
            <span>·</span>
            <span>{company.industry}</span>
          </div>
          <Link to="/jobs/$id" params={{ id: job.id }} className="mt-1 block">
            <h3 className="font-display text-lg font-semibold leading-tight tracking-tight text-foreground group-hover:text-brand">
              {job.title}
            </h3>
          </Link>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.postedDaysAgo === 0 ? "Today" : `${job.postedDaysAgo}d ago`}</span>
            <Badge variant="outline" className="rounded-full">{job.workMode}</Badge>
            <Badge variant="outline" className="rounded-full">{job.type}</Badge>
            <Badge variant="outline" className="rounded-full">{job.experience}</Badge>
            {job.urgent && (
              <Badge className="rounded-full bg-amber-500/15 text-amber-700 hover:bg-amber-500/20 dark:text-amber-300">
                <Zap className="mr-1 h-3 w-3" /> Urgent
              </Badge>
            )}
            {job.postedDaysAgo <= 2 && (
              <Badge className="rounded-full bg-emerald-500/15 text-emerald-700 hover:bg-emerald-500/20 dark:text-emerald-300">New</Badge>
            )}
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {job.skills.slice(0, 5).map((s) => (
              <span key={s} className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">{s}</span>
            ))}
          </div>
        </div>

        <div className="hidden flex-col items-end gap-3 sm:flex">
          <MatchScore score={job.matchScore} />
          <div className="text-right">
            <div className="font-display text-base font-semibold text-foreground">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</div>
            <div className="text-[11px] text-muted-foreground">{job.applicants} applicants</div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 border-t border-border/60 pt-4">
        <div className="sm:hidden">
          <div className="font-display text-sm font-semibold">{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</div>
          <div className="text-[11px] text-muted-foreground">{job.applicants} applicants · {job.matchScore}% match</div>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={saved ? "Remove bookmark" : "Save job"}
            onClick={(e) => { e.preventDefault(); bookmarks.toggle(job.id); toast(saved ? "Removed from saved" : "Saved to your list"); }}
            className={cn("text-muted-foreground hover:text-brand", saved && "text-brand")}
          >
            {saved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to="/jobs/$id" params={{ id: job.id }}>View details</Link>
          </Button>
          <Button size="sm" onClick={() => onQuickApply?.(job)} className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">
            Quick apply
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-start gap-4">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-muted" />
        <div className="flex-1 space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
          <div className="h-5 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
          <div className="flex gap-2">
            <div className="h-5 w-14 animate-pulse rounded bg-muted" />
            <div className="h-5 w-14 animate-pulse rounded bg-muted" />
            <div className="h-5 w-14 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
