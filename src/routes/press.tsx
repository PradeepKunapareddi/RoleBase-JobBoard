import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/press")({
  component: PressPage,
  head: () => ({ meta: [{ title: "Press — Rolebase" }] }),
});

const coverage = [
  { outlet: "TechCrunch", title: "Rolebase raises $12M to build the AI-native job board", date: "June 2026", url: "#" },
  { outlet: "The Verge", title: "Can AI finally fix the broken job search experience?", date: "May 2026", url: "#" },
  { outlet: "Forbes", title: "Rolebase named one of the 50 most innovative startups of 2026", date: "April 2026", url: "#" },
  { outlet: "Wired", title: "The startup using LLMs to match candidates with jobs", date: "March 2026", url: "#" },
  { outlet: "Bloomberg", title: "AI job boards are disrupting traditional recruiting", date: "February 2026", url: "#" },
];

function PressPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Press & Media</h1>
        <p className="mt-4 text-muted-foreground">News and coverage about Rolebase.</p>
      </div>

      <div className="mb-12 rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="font-display text-xl font-bold mb-2">Press Inquiries</h2>
        <p className="text-muted-foreground text-sm mb-4">For media inquiries, interviews, or press kit requests, reach out to our communications team.</p>
        <Button className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">press@rolebase.io</Button>
      </div>

      <h2 className="mb-6 font-display text-2xl font-bold">Recent Coverage</h2>
      <div className="space-y-4">
        {coverage.map((c) => (
          <a key={c.title} href={c.url}
            className="flex items-center justify-between rounded-2xl border border-border bg-card p-5 hover:border-brand transition-colors group">
            <div>
              <div className="text-xs font-semibold text-brand uppercase tracking-wide mb-1">{c.outlet}</div>
              <div className="font-medium group-hover:text-brand transition-colors">{c.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.date}</div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />
          </a>
        ))}
      </div>
    </div>
  );
}
