import { createFileRoute, Link } from "@tanstack/react-router";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip as ChartTooltip, XAxis, YAxis } from "recharts";
import { Bookmark, BriefcaseBusiness, Building2, CheckCircle2, Clock, Eye, Sparkles, TrendingUp, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobCard } from "@/components/jobs/job-card";
import { jobs } from "@/data/jobs";
import { useLocalSet, useRecentlyViewed } from "@/hooks/use-local-storage";
import { useProfile } from "@/hooks/use-profile";
import { useState } from "react";
import type { Job } from "@/data/jobs";
import { QuickApplyModal } from "@/components/jobs/quick-apply-modal";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "Dashboard — Rolebase" },
      { name: "description", content: "Track saved jobs, applications, and recommendations." },
      { name: "robots", content: "noindex" },
    ],
  }),
});

const chartData = [
  { day: "Mon", applications: 2, views: 12 },
  { day: "Tue", applications: 4, views: 18 },
  { day: "Wed", applications: 3, views: 22 },
  { day: "Thu", applications: 6, views: 28 },
  { day: "Fri", applications: 5, views: 35 },
  { day: "Sat", applications: 1, views: 9 },
  { day: "Sun", applications: 2, views: 14 },
];

function Dashboard() {
  const bookmarks = useLocalSet("jb.bookmarks");
  const applied = useLocalSet("jb.applied");
  const recent = useRecentlyViewed();
  const { profile, completion, education, experience } = useProfile();
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  const saved = jobs.filter((j) => bookmarks.items.includes(j.id));
  const applications = jobs.filter((j) => applied.items.includes(j.id));
  const viewed = recent.items.map((id) => jobs.find((j) => j.id === id)).filter(Boolean) as typeof jobs;
  const recommended = [...jobs].sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);

  const stats = [
    { label: "Saved jobs", value: saved.length, icon: Bookmark, color: "from-brand to-indigo-500" },
    { label: "Applications", value: applications.length, icon: BriefcaseBusiness, color: "from-emerald-500 to-teal-500" },
    { label: "Profile views", value: 128, icon: Eye, color: "from-amber-500 to-orange-500" },
    { label: "Avg match", value: "82%", icon: Sparkles, color: "from-pink-500 to-rose-500" },
  ];

  const completionItems = [
    { label: "Upload profile photo", done: !!profile.photo },
    { label: "Upload resume", done: !!profile.resumeName },
    { label: "Add skills", done: profile.skills.length > 0 },
    { label: "Add education", done: education.length > 0 },
    { label: "Add experience", done: experience.length > 0 },
    { label: "Complete about section", done: !!profile.about },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          {profile.photo ? (
            <img src={profile.photo} alt="Profile" className="h-14 w-14 rounded-2xl object-cover border border-border" />
          ) : (
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand to-indigo-500 text-white">
              <User className="h-7 w-7" />
            </div>
          )}
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome back{profile.name ? `, ${profile.name.split(" ")[0]}` : ""} 👋
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">{profile.headline || "Here's what's happening with your job search."}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline"><Link to="/profile">Edit Profile</Link></Button>
          <Button asChild className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90"><Link to="/jobs">Browse jobs</Link></Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card-hover overflow-hidden rounded-2xl border border-border bg-card p-5">
            <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${s.color} text-white`}>
              <s.icon className="h-5 w-5" />
            </div>
            <div className="font-display text-2xl font-bold tabular-nums">{s.value}</div>
            <div className="text-xs text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold">Activity this week</h2>
                <p className="text-xs text-muted-foreground">Applications and profile views</p>
              </div>
              <Badge variant="outline" className="rounded-full"><TrendingUp className="mr-1 h-3 w-3 text-emerald-500" /> +24%</Badge>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="views" fill="var(--brand)" radius={[6, 6, 0, 0]} opacity={0.35} />
                  <Bar dataKey="applications" fill="var(--brand)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="saved" className="flex-1">Saved ({saved.length})</TabsTrigger>
              <TabsTrigger value="applied" className="flex-1">Applied ({applications.length})</TabsTrigger>
              <TabsTrigger value="viewed" className="flex-1">Viewed</TabsTrigger>
              <TabsTrigger value="recommended" className="flex-1">For You</TabsTrigger>
            </TabsList>
            <TabsContent value="saved" className="mt-5">
              {saved.length === 0 ? <EmptyState icon={Bookmark} title="No saved jobs yet" desc="Bookmark roles you're interested in to see them here." />
                : <div className="grid gap-4">{saved.map((j) => <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />)}</div>}
            </TabsContent>
            <TabsContent value="applied" className="mt-5">
              {applications.length === 0 ? <EmptyState icon={CheckCircle2} title="No applications yet" desc="Try Quick Apply on any role to track your applications here." />
                : <div className="grid gap-4">{applications.map((j) => <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />)}</div>}
            </TabsContent>
            <TabsContent value="viewed" className="mt-5">
              {viewed.length === 0 ? <EmptyState icon={Clock} title="Nothing viewed yet" desc="Recently viewed jobs will appear here." />
                : <div className="grid gap-4">{viewed.map((j) => <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />)}</div>}
            </TabsContent>
            <TabsContent value="recommended" className="mt-5">
              <div className="grid gap-4">{recommended.map((j) => <JobCard key={j.id} job={j} onQuickApply={setApplyJob} />)}</div>
            </TabsContent>
          </Tabs>
        </div>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-display text-sm font-semibold">Profile completion</h3>
              <span className="text-sm font-semibold text-brand">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2" />
            <ul className="mt-4 space-y-2 text-sm">
              {completionItems.map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-muted-foreground">
                  <CheckCircle2 className={`h-4 w-4 ${t.done ? "text-emerald-500" : "text-muted"}`} />
                  <span className={t.done ? "line-through" : ""}>{t.label}</span>
                </li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-4 w-full"><Link to="/profile">Complete Profile</Link></Button>
          </div>

          <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand/10 to-indigo-500/10 p-5">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand">
              <Sparkles className="h-3.5 w-3.5" /> Job alert
            </div>
            <h4 className="font-display text-base font-semibold">Get roles matching your profile</h4>
            <p className="mt-1 text-xs text-muted-foreground">We'll ping you the moment a great match is posted.</p>
            <Button className="mt-4 w-full bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">Create alert</Button>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold">
              <Building2 className="h-4 w-4 text-brand" /> Companies
            </h3>
            <p className="text-xs text-muted-foreground">Explore top companies hiring right now.</p>
            <Button asChild variant="outline" className="mt-3 w-full"><Link to="/companies/">Explore companies</Link></Button>
          </div>
        </aside>
      </div>

      <QuickApplyModal job={applyJob} open={!!applyJob} onOpenChange={(v) => !v && setApplyJob(null)} />
    </div>
  );
}

function EmptyState({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-border bg-card p-14 text-center">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted"><Icon className="h-5 w-5 text-muted-foreground" /></div>
      <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{desc}</p>
      <Button asChild className="mt-4"><Link to="/jobs">Browse jobs</Link></Button>
    </div>
  );
}
