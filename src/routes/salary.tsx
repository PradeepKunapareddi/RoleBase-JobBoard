import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/salary")({
  component: SalaryInsights,
  head: () => ({
    meta: [
      { title: "Salary Insights — Rolebase" },
      { name: "description", content: "Real salary data across tech roles, companies, and locations." },
    ],
  }),
});

const salaryData = [
  { role: "AI Engineer", min: 120, mid: 160, max: 220 },
  { role: "ML Engineer", min: 110, mid: 150, max: 200 },
  { role: "Data Engineer", min: 100, mid: 140, max: 180 },
  { role: "Frontend Dev", min: 90, mid: 130, max: 170 },
  { role: "Backend Dev", min: 95, mid: 135, max: 175 },
  { role: "Product Manager", min: 110, mid: 150, max: 190 },
  { role: "DevOps", min: 100, mid: 140, max: 180 },
  { role: "UX Designer", min: 80, mid: 115, max: 150 },
];

const locationData = [
  { city: "San Francisco", avg: 185 },
  { city: "New York", avg: 170 },
  { city: "Seattle", avg: 165 },
  { city: "Austin", avg: 145 },
  { city: "Remote", avg: 150 },
  { city: "Boston", avg: 155 },
];

function SalaryInsights() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-10">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Salary Insights</h1>
            <p className="text-sm text-muted-foreground">Real compensation data from verified job postings</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3 mb-10">
        {[
          { label: "Avg AI Engineer Salary", value: "$160k", change: "+12% YoY" },
          { label: "Highest Paying Role", value: "AI Engineer", change: "$220k max" },
          { label: "Remote Premium", value: "+8%", change: "vs. office roles" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-6">
            <div className="text-sm text-muted-foreground">{s.label}</div>
            <div className="mt-1 font-display text-3xl font-bold text-gradient">{s.value}</div>
            <div className="mt-1 text-xs text-emerald-500">{s.change}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg font-semibold">Salary by Role (USD thousands)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salaryData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="role" tick={{ fontSize: 11 }} interval={0} angle={-20} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`$${v}k`, ""]} />
              <Bar dataKey="min" fill="#c7d2fe" radius={[4, 4, 0, 0]} name="Min" />
              <Bar dataKey="mid" fill="#6366f1" radius={[4, 4, 0, 0]} name="Median" />
              <Bar dataKey="max" fill="#4f46e5" radius={[4, 4, 0, 0]} name="Max" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <h2 className="mb-6 font-display text-lg font-semibold">Avg Salary by Location (USD thousands)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={locationData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="city" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip formatter={(v) => [`$${v}k`, "Avg"]} />
              <Bar dataKey="avg" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6">
        <h2 className="mb-4 font-display text-lg font-semibold">Salary Ranges by Role</h2>
        <div className="space-y-4">
          {salaryData.map((d) => (
            <div key={d.role}>
              <div className="mb-1 flex justify-between text-sm">
                <span className="font-medium">{d.role}</span>
                <span className="text-muted-foreground">${d.min}k – ${d.max}k</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-indigo-500"
                  style={{ width: `${(d.mid / 220) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
