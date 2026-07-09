import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/help")({
  component: HelpPage,
  head: () => ({ meta: [{ title: "Help Center — Rolebase" }] }),
});

const faqs = [
  { q: "How does AI matching work?", a: "Our AI analyzes your profile, skills, and experience to find jobs where you're most likely to succeed. The match score (0–100) helps you prioritize which roles to apply to first." },
  { q: "Is Rolebase free to use?", a: "Yes! Rolebase is completely free for job seekers. We charge companies to post jobs and access candidate profiles." },
  { q: "How do I upload my resume?", a: "Go to My Profile → Resume section. You can upload PDF, DOC, or DOCX files. Your resume is automatically attached when you apply to jobs." },
  { q: "Can I save jobs to apply later?", a: "Yes! Click the bookmark icon on any job card or job details page to save it. View all saved jobs in your Dashboard." },
  { q: "How do I track my applications?", a: "All applications are tracked in your Dashboard under the 'Applied' tab. You can see the status of each application there." },
  { q: "How do I create a job alert?", a: "In your Dashboard, click 'Create alert' in the Job Alert card on the right. You'll receive notifications when matching jobs are posted." },
  { q: "Can companies see my profile?", a: "Your profile is private by default. You control what information is visible to companies when you apply to their jobs." },
  { q: "How do I delete my account?", a: "Contact our support team at support@rolebase.io and we'll process your account deletion within 48 hours." },
];

function HelpPage() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<number | null>(null);
  const filtered = faqs.filter((f) => f.q.toLowerCase().includes(q.toLowerCase()) || f.a.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Help Center</h1>
        <p className="mt-3 text-muted-foreground">Find answers to common questions about Rolebase.</p>
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-border bg-card p-2 shadow-elegant">
          <Search className="ml-2 h-4 w-4 text-muted-foreground" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search help articles..." className="border-0 bg-transparent shadow-none focus-visible:ring-0" />
        </div>
      </div>

      <div className="space-y-3">
        {filtered.map((f, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
            <button className="flex w-full items-center justify-between p-5 text-left font-medium hover:bg-muted/50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}>
              {f.q}
              <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
