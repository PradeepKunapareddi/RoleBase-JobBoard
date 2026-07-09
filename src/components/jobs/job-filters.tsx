import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { companies } from "@/data/companies";
import type { Experience, JobType, WorkMode } from "@/data/jobs";

export interface Filters {
  workMode: WorkMode[];
  types: JobType[];
  experience: Experience[];
  industries: string[];
  companySizes: string[];
  salary: [number, number];
  postedWithinDays: number;
}

export const defaultFilters: Filters = {
  workMode: [],
  types: [],
  experience: [],
  industries: [],
  companySizes: [],
  salary: [40, 400],
  postedWithinDays: 30,
};

const workModes: WorkMode[] = ["Remote", "Hybrid", "On-site"];
const typesList: JobType[] = ["Full-time", "Part-time", "Contract", "Internship"];
const expList: Experience[] = ["Entry", "Mid", "Senior", "Lead", "Principal"];
const sizes = ["1-50", "51-200", "201-1000", "1,001-5,000", "5,001-10,000", "10,000+"];
const industries = Array.from(new Set(companies.map((c) => c.industry)));
const postedOptions = [1, 3, 7, 14, 30];

function toggle<T>(arr: T[], v: T): T[] { return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]; }

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border/60 py-4 first:pt-0 last:border-0">
      <h4 className="mb-3 font-display text-sm font-semibold">{title}</h4>
      {children}
    </div>
  );
}

function CheckList<T extends string>({ options, selected, onToggle }: { options: T[]; selected: T[]; onToggle: (v: T) => void }) {
  return (
    <div className="space-y-2">
      {options.map((o) => (
        <label key={o} className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox checked={selected.includes(o)} onCheckedChange={() => onToggle(o)} />
          <span className="text-muted-foreground">{o}</span>
        </label>
      ))}
    </div>
  );
}

export function JobFilters({ value, onChange, onClose }: { value: Filters; onChange: (f: Filters) => void; onClose?: () => void }) {
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => onChange({ ...value, [k]: v });

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-base font-semibold">Filters</h3>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onChange(defaultFilters)}>Reset</Button>
          {onClose && <Button variant="ghost" size="icon" onClick={onClose} className="lg:hidden" aria-label="Close filters"><X className="h-4 w-4" /></Button>}
        </div>
      </div>

      <Section title="Work mode">
        <CheckList options={workModes} selected={value.workMode} onToggle={(v) => set("workMode", toggle(value.workMode, v))} />
      </Section>

      <Section title="Employment type">
        <CheckList options={typesList} selected={value.types} onToggle={(v) => set("types", toggle(value.types, v))} />
      </Section>

      <Section title="Experience">
        <CheckList options={expList} selected={value.experience} onToggle={(v) => set("experience", toggle(value.experience, v))} />
      </Section>

      <Section title="Salary (USD, thousands)">
        <div className="pt-1">
          <Slider min={40} max={500} step={10} value={value.salary} onValueChange={(v) => set("salary", [v[0], v[1]] as [number, number])} />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>${value.salary[0]}k</span>
            <span>${value.salary[1]}k+</span>
          </div>
        </div>
      </Section>

      <Section title="Industry">
        <CheckList options={industries} selected={value.industries} onToggle={(v) => set("industries", toggle(value.industries, v))} />
      </Section>

      <Section title="Company size">
        <CheckList options={sizes} selected={value.companySizes} onToggle={(v) => set("companySizes", toggle(value.companySizes, v))} />
      </Section>

      <Section title="Posted">
        <div className="flex flex-wrap gap-2">
          {postedOptions.map((d) => (
            <Button key={d} size="sm" variant={value.postedWithinDays === d ? "default" : "outline"} className={value.postedWithinDays === d ? "bg-brand text-white hover:bg-brand/90" : ""} onClick={() => set("postedWithinDays", d)}>
              {d === 1 ? "24h" : `${d}d`}
            </Button>
          ))}
        </div>
        <div className="pt-3">
          <Label className="text-xs text-muted-foreground">Currently showing jobs posted in the last {value.postedWithinDays} days</Label>
        </div>
      </Section>
    </div>
  );
}
