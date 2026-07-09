import { createFileRoute } from "@tanstack/react-router";
import { Briefcase, Users, Globe, Zap } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({ meta: [{ title: "About — Rolebase" }] }),
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-indigo-500 text-white">
          <Briefcase className="h-8 w-8" />
        </div>
        <h1 className="font-display text-4xl font-bold tracking-tight">About Rolebase</h1>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          We're building the AI-native job board for the next generation of builders. Our mission is to make finding the right job as fast and accurate as possible.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 mb-12">
        {[
          { icon: Zap, title: "Our Mission", desc: "To connect talented people with companies where they'll thrive — using AI to eliminate the noise and surface only the most relevant opportunities." },
          { icon: Globe, title: "Our Vision", desc: "A world where your next career move takes days, not months — powered by intelligent matching, real salary data, and a community of ambitious builders." },
          { icon: Users, title: "Our Team", desc: "We're a small team of engineers, designers, and operators who've all experienced the pain of job searching. We built Rolebase for ourselves first." },
          { icon: Briefcase, title: "Our Values", desc: "Transparency, speed, and quality. We curate every job on the platform, verify every company, and never compromise on the signal-to-noise ratio." },
        ].map((s) => (
          <div key={s.title} className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display font-semibold text-lg">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <h2 className="font-display text-2xl font-bold">By the numbers</h2>
        <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
          {[
            { value: "50k+", label: "Open roles" },
            { value: "3,800+", label: "Companies" },
            { value: "12k", label: "Hired last month" },
            { value: "82%", label: "Avg match score" },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-display text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
