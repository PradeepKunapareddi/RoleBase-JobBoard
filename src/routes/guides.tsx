import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/guides")({
  component: GuidesPage,
  head: () => ({ meta: [{ title: "Guides — Rolebase" }] }),
});

const guides = [
  { title: "Complete Job Search Playbook", desc: "A step-by-step guide to finding your next role — from resume to offer.", category: "Job Search", readTime: "15 min", level: "Beginner" },
  { title: "How to Write an ATS-Friendly Resume", desc: "Learn how to format your resume to pass automated screening systems.", category: "Resume", readTime: "10 min", level: "Beginner" },
  { title: "Mastering Technical Interviews", desc: "Comprehensive prep guide for coding, system design, and behavioral rounds.", category: "Interviews", readTime: "20 min", level: "Advanced" },
  { title: "Salary Negotiation Scripts", desc: "Word-for-word scripts to negotiate your compensation with confidence.", category: "Negotiation", readTime: "8 min", level: "Intermediate" },
  { title: "Building a Personal Brand on LinkedIn", desc: "How to optimize your LinkedIn profile to attract recruiters.", category: "LinkedIn", readTime: "12 min", level: "Intermediate" },
  { title: "Transitioning into Tech", desc: "Your roadmap for breaking into the tech industry from a non-technical background.", category: "Career Change", readTime: "18 min", level: "Beginner" },
];

function GuidesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">Career Guides</h1>
        <p className="mt-3 text-muted-foreground">In-depth guides to help you navigate every stage of your job search.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <div key={g.title} className="card-hover group flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
              <BookOpen className="h-5 w-5" />
            </div>
            <Badge variant="secondary" className="w-fit mb-3 text-xs">{g.category}</Badge>
            <h2 className="font-display font-semibold leading-snug group-hover:text-brand transition-colors flex-1">{g.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{g.desc}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{g.readTime}</span>
              <Badge variant="outline" className="text-xs">{g.level}</Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
