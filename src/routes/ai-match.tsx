import { createFileRoute, Link } from "@tanstack/react-router";
import { Sparkles, Zap, Brain, Target, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JobCard } from "@/components/jobs/job-card";
import { jobs } from "@/data/jobs";
import { useState } from "react";
import type { Job } from "@/data/jobs";
import { QuickApplyModal } from "@/components/jobs/quick-apply-modal";

export const Route = createFileRoute("/ai-match")({
  component: AIMatch,
  head: () => ({
    meta: [
      { title: "AI Match — Rolebase" },
      { name: "description", content: "AI-powered job matching based on your skills and preferences." },
    ],
  }),
});

function AIMatch() {
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const topMatches = [...jobs].sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      {/* Hero */}
      <div className="mb-12 rounded-3xl border border-brand/20 bg-gradient-to-br from-brand/10 via-indigo-500/10 to-cyan-500/10 p-8 sm:p-14 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-indigo-500 text-white shadow-elegant">
          <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">AI Job Matching</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Our AI analyzes your skills, experience, and preferences to surface roles where you're most likely to succeed — and get hired.
        </p>
        <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">
          <Link to="/dashboard"><Zap className="mr-2 h-4 w-4" />Set up your profile</Link>
        </Button>
      </div>

      {/* How it works */}
      <div className="mb-12">
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">How AI matching works</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Brain, title: "Skills analysis", desc: "We analyze your skills, experience level, and past roles to understand your strengths." },
            { icon: Target, title: "Smart matching", desc: "Our model compares your profile against thousands of job requirements in real time." },
            { icon: CheckCircle2, title: "Match score", desc: "Each job gets a match score from 0–100 so you know exactly where to focus your energy." },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top matches */}
      <div>
        <h2 className="mb-6 font-display text-2xl font-bold tracking-tight">Your top matches</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {topMatches.map((j) => (
            <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />
          ))}
        </div>
      </div>

      <QuickApplyModal job={applyJob} open={!!applyJob} onOpenChange={(v) => !v && setApplyJob(null)} />
    </div>
  );
}
