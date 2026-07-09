import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
  head: () => ({ meta: [{ title: "Blog — Rolebase" }] }),
});

const posts = [
  { slug: "ai-job-search-2025", title: "How AI is Transforming the Job Search in 2025", excerpt: "From personalized job matching to AI-powered resume screening, discover how artificial intelligence is reshaping the way candidates find and land their dream jobs.", category: "AI & Careers", date: "July 1, 2026", readTime: "6 min read", author: "Rolebase Team" },
  { slug: "salary-negotiation-tips", title: "10 Proven Salary Negotiation Tactics That Actually Work", excerpt: "Negotiating your salary is one of the most impactful things you can do for your career. Here's how to do it confidently and effectively.", category: "Career Advice", date: "June 25, 2026", readTime: "8 min read", author: "Rolebase Team" },
  { slug: "remote-work-productivity", title: "Remote Work Productivity: The Complete 2026 Guide", excerpt: "Working remotely offers incredible flexibility, but it also comes with unique challenges. Learn how top remote workers stay productive and avoid burnout.", category: "Remote Work", date: "June 18, 2026", readTime: "10 min read", author: "Rolebase Team" },
  { slug: "resume-ats-guide", title: "The Ultimate ATS Resume Guide: Get Past the Bots", excerpt: "Applicant Tracking Systems reject 75% of resumes before a human sees them. Here's how to optimize your resume to get noticed.", category: "Resume Tips", date: "June 10, 2026", readTime: "7 min read", author: "Rolebase Team" },
  { slug: "tech-interview-prep", title: "How to Prepare for Technical Interviews at FAANG Companies", excerpt: "Breaking into top tech companies requires specific preparation. We break down the exact process that works for software engineering interviews.", category: "Interview Prep", date: "June 3, 2026", readTime: "12 min read", author: "Rolebase Team" },
  { slug: "career-change-guide", title: "Switching Careers in Your 30s: A Practical Roadmap", excerpt: "It's never too late to pivot. Here's how to successfully transition into a new industry, even without direct experience.", category: "Career Change", date: "May 28, 2026", readTime: "9 min read", author: "Rolebase Team" },
];

function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <h1 className="font-display text-4xl font-bold tracking-tight">Blog</h1>
        <p className="mt-3 text-muted-foreground">Career advice, job search tips, and industry insights from the Rolebase team.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <article key={p.slug} className="card-hover group flex flex-col rounded-2xl border border-border bg-card overflow-hidden">
            <div className="h-40 bg-gradient-to-br from-brand/20 to-indigo-500/20 flex items-center justify-center">
              <span className="font-display text-5xl opacity-20">✍</span>
            </div>
            <div className="flex flex-col flex-1 p-5">
              <Badge variant="secondary" className="w-fit mb-3 text-xs">{p.category}</Badge>
              <h2 className="font-display font-semibold leading-snug group-hover:text-brand transition-colors">{p.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-3 flex-1">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{p.readTime}</span>
                <span className="flex items-center gap-1"><Tag className="h-3 w-3" />{p.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
