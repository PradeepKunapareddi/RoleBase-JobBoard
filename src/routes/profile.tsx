import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Camera, Plus, Trash2, Pencil, CheckCircle2, X, Upload, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useProfile, type Education, type Experience } from "@/hooks/use-profile";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
  head: () => ({ meta: [{ title: "My Profile — Rolebase" }, { name: "robots", content: "noindex" }] }),
});

const SKILL_SUGGESTIONS = ["React", "TypeScript", "Python", "Node.js", "Java", "Spring Boot", "Machine Learning", "SQL", "Docker", "AWS", "GCP", "Kubernetes", "Go", "Rust", "GraphQL", "PostgreSQL", "MongoDB", "Redis", "Next.js", "FastAPI"];
const EMP_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const LANGUAGES = ["English", "Hindi", "Telugu", "Tamil", "Kannada", "Malayalam", "Bengali", "Marathi", "Gujarati", "Spanish", "French", "German", "Japanese", "Mandarin"];

function ProfilePage() {
  const { profile, setProfile, education, setEducation, experience, setExperience, completion } = useProfile();
  const [skillInput, setSkillInput] = useState("");
  const [eduModal, setEduModal] = useState<Education | null | "new">(null);
  const [expModal, setExpModal] = useState<Experience | null | "new">(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const resumeRef = useRef<HTMLInputElement>(null);

  const updateField = (k: keyof typeof profile, v: string | string[]) =>
    setProfile((p) => ({ ...p, [k]: v }));

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { updateField("photo", ev.target?.result as string); toast.success("Photo updated!"); };
    reader.readAsDataURL(file);
  };

  const handleResume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { updateField("resumeName", file.name); toast.success("Resume uploaded!"); };
    reader.readAsDataURL(file);
  };

  const addSkill = (s: string) => {
    const skill = s.trim();
    if (!skill || profile.skills.includes(skill)) return;
    updateField("skills", [...profile.skills, skill]);
    setSkillInput("");
  };

  const removeSkill = (s: string) => updateField("skills", profile.skills.filter((x) => x !== s));

  const completionItems = [
    { label: "Upload Profile Photo", done: !!profile.photo },
    { label: "Add Resume", done: !!profile.resumeName },
    { label: "Add Skills", done: profile.skills.length > 0 },
    { label: "Add Education", done: education.length > 0 },
    { label: "Add Experience", done: experience.length > 0 },
    { label: "Complete About Section", done: !!profile.about },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold tracking-tight">My Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">Keep your profile complete to get better matches.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">

          {/* Basic Info */}
          <Card title="Basic Information">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl border-2 border-border overflow-hidden bg-muted flex items-center justify-center">
                  {profile.photo
                    ? <img src={profile.photo} alt="Profile" className="h-full w-full object-cover" />
                    : <Camera className="h-8 w-8 text-muted-foreground" />}
                </div>
                <button onClick={() => photoRef.current?.click()}
                  className="absolute -bottom-2 -right-2 grid h-8 w-8 place-items-center rounded-full bg-brand text-white shadow-md hover:opacity-90">
                  <Camera className="h-4 w-4" />
                </button>
                <input ref={photoRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
              </div>
              <div className="flex-1 space-y-3">
                <Field label="Full Name">
                  <Input value={profile.name} onChange={(e) => updateField("name", e.target.value)} placeholder="Pradeep Kunapareddi" />
                </Field>
                <Field label="Professional Headline">
                  <Input value={profile.headline} onChange={(e) => updateField("headline", e.target.value)} placeholder="AI / ML Engineer · Generative AI Developer" />
                </Field>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email"><Input type="email" value={profile.email} onChange={(e) => updateField("email", e.target.value)} placeholder="you@email.com" /></Field>
              <Field label="Phone"><Input value={profile.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+91 9876543210" /></Field>
              <Field label="Location"><Input value={profile.location} onChange={(e) => updateField("location", e.target.value)} placeholder="Hyderabad, India" /></Field>
              <Field label="Portfolio Website"><Input value={profile.portfolio} onChange={(e) => updateField("portfolio", e.target.value)} placeholder="https://yoursite.com" /></Field>
              <Field label="GitHub"><Input value={profile.github} onChange={(e) => updateField("github", e.target.value)} placeholder="https://github.com/username" /></Field>
              <Field label="LinkedIn"><Input value={profile.linkedin} onChange={(e) => updateField("linkedin", e.target.value)} placeholder="https://linkedin.com/in/username" /></Field>
            </div>
            <div className="mt-4">
              <Field label="About Me">
                <Textarea rows={4} value={profile.about} onChange={(e) => updateField("about", e.target.value)} placeholder="Write a short bio about yourself, your experience, and what you're looking for..." />
              </Field>
            </div>
            <Button className="mt-4 bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90"
              onClick={() => toast.success("Profile saved!")}>Save Profile</Button>
          </Card>

          {/* Skills */}
          <Card title="Skills">
            <div className="flex gap-2 mb-4">
              <Input value={skillInput} onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill(skillInput)}
                placeholder="Add a skill and press Enter" />
              <Button onClick={() => addSkill(skillInput)} variant="outline">Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {profile.skills.map((s) => (
                <Badge key={s} variant="secondary" className="gap-1 pr-1 text-sm">
                  {s}
                  <button onClick={() => removeSkill(s)} className="ml-1 rounded-full hover:bg-muted p-0.5"><X className="h-3 w-3" /></button>
                </Badge>
              ))}
              {profile.skills.length === 0 && <p className="text-sm text-muted-foreground">No skills added yet.</p>}
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_SUGGESTIONS.filter((s) => !profile.skills.includes(s)).slice(0, 12).map((s) => (
                  <button key={s} onClick={() => addSkill(s)}
                    className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground hover:border-brand hover:text-brand transition-colors">
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* Languages */}
          <Card title="Languages">
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => {
                const selected = profile.languages.includes(lang);
                return (
                  <button key={lang} onClick={() => updateField("languages", selected ? profile.languages.filter((l) => l !== lang) : [...profile.languages, lang])}
                    className={`rounded-full border px-3 py-1 text-sm transition-colors ${selected ? "border-brand bg-brand/10 text-brand" : "border-border text-muted-foreground hover:border-brand hover:text-brand"}`}>
                    {lang}
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Resume */}
          <Card title="Resume">
            {profile.resumeName ? (
              <div className="flex items-center justify-between rounded-xl border border-border bg-muted/50 p-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-brand/15 text-brand">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{profile.resumeName}</div>
                    <div className="text-xs text-muted-foreground">PDF / DOC / DOCX</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => toast("Resume preview not available in demo")}><Eye className="mr-1 h-4 w-4" />View</Button>
                  <Button size="sm" variant="outline" onClick={() => resumeRef.current?.click()}><Upload className="mr-1 h-4 w-4" />Replace</Button>
                  <Button size="sm" variant="outline" className="text-destructive" onClick={() => { updateField("resumeName", ""); toast.success("Resume removed"); }}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ) : (
              <div onClick={() => resumeRef.current?.click()}
                className="cursor-pointer rounded-xl border-2 border-dashed border-border p-10 text-center hover:border-brand transition-colors">
                <Upload className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                <p className="font-medium">Click to upload your resume</p>
                <p className="mt-1 text-sm text-muted-foreground">PDF, DOC, or DOCX accepted</p>
              </div>
            )}
            <input ref={resumeRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleResume} />
          </Card>

          {/* Education */}
          <Card title="Education" action={<Button size="sm" onClick={() => setEduModal("new")} variant="outline"><Plus className="mr-1 h-4 w-4" />Add</Button>}>
            {education.length === 0 ? (
              <p className="text-sm text-muted-foreground">No education added yet.</p>
            ) : (
              <div className="space-y-4">
                {education.map((e) => (
                  <div key={e.id} className="flex items-start justify-between rounded-xl border border-border p-4">
                    <div>
                      <div className="font-semibold">{e.degree}</div>
                      <div className="text-sm text-muted-foreground">{e.university} · {e.specialization}</div>
                      <div className="text-xs text-muted-foreground mt-1">{e.startYear} – {e.endYear} {e.grade && `· CGPA: ${e.grade}`}</div>
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setEduModal(e)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { setEducation((ed) => ed.filter((x) => x.id !== e.id)); toast.success("Removed"); }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Experience */}
          <Card title="Work Experience" action={<Button size="sm" onClick={() => setExpModal("new")} variant="outline"><Plus className="mr-1 h-4 w-4" />Add</Button>}>
            {experience.length === 0 ? (
              <p className="text-sm text-muted-foreground">No experience added yet.</p>
            ) : (
              <div className="space-y-4">
                {experience.map((e) => (
                  <div key={e.id} className="flex items-start justify-between rounded-xl border border-border p-4">
                    <div>
                      <div className="font-semibold">{e.title}</div>
                      <div className="text-sm text-muted-foreground">{e.company} · {e.type}</div>
                      <div className="text-xs text-muted-foreground mt-1">{e.startDate} – {e.current ? "Present" : e.endDate}</div>
                      {e.description && <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{e.description}</p>}
                    </div>
                    <div className="flex gap-1">
                      <Button size="sm" variant="ghost" onClick={() => setExpModal(e)}><Pencil className="h-4 w-4" /></Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => { setExperience((ex) => ex.filter((x) => x.id !== e.id)); toast.success("Removed"); }}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-5 sticky top-24">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-display text-sm font-semibold">Profile Completion</h3>
              <span className="text-sm font-bold text-brand">{completion}%</span>
            </div>
            <Progress value={completion} className="h-2 mb-4" />
            <ul className="space-y-2.5">
              {completionItems.map((item) => (
                <li key={item.label} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className={`h-4 w-4 shrink-0 ${item.done ? "text-emerald-500" : "text-muted-foreground/40"}`} />
                  <span className={item.done ? "line-through text-muted-foreground" : ""}>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Education Modal */}
      <EduModal
        open={!!eduModal}
        item={eduModal === "new" ? null : eduModal as Education}
        onClose={() => setEduModal(null)}
        onSave={(e) => {
          setEducation((prev) => {
            const existing = prev.find((x) => x.id === e.id);
            return existing ? prev.map((x) => x.id === e.id ? e : x) : [...prev, e];
          });
          setEduModal(null);
          toast.success("Education saved!");
        }}
      />

      {/* Experience Modal */}
      <ExpModal
        open={!!expModal}
        item={expModal === "new" ? null : expModal as Experience}
        onClose={() => setExpModal(null)}
        onSave={(e) => {
          setExperience((prev) => {
            const existing = prev.find((x) => x.id === e.id);
            return existing ? prev.map((x) => x.id === e.id ? e : x) : [...prev, e];
          });
          setExpModal(null);
          toast.success("Experience saved!");
        }}
      />
    </div>
  );
}

function Card({ title, children, action }: { title: string; children: React.ReactNode; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display text-lg font-semibold">{title}</h2>
        {action}
      </div>
      <Separator className="mb-4" />
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function EduModal({ open, item, onClose, onSave }: { open: boolean; item: Education | null; onClose: () => void; onSave: (e: Education) => void }) {
  const [form, setForm] = useState<Education>(() => item ?? { id: crypto.randomUUID(), degree: "", university: "", specialization: "", startYear: "", endYear: "", grade: "" });
  useState(() => { if (item) setForm(item); });
  const set = (k: keyof Education, v: string) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>{item ? "Edit Education" : "Add Education"}</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <Field label="Degree"><Input value={form.degree} onChange={(e) => set("degree", e.target.value)} placeholder="B.Tech Electronics & Communication" /></Field>
          <Field label="University"><Input value={form.university} onChange={(e) => set("university", e.target.value)} placeholder="Swarnandhra College of Engineering" /></Field>
          <Field label="Specialization"><Input value={form.specialization} onChange={(e) => set("specialization", e.target.value)} placeholder="Electronics & Communication" /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Year"><Input value={form.startYear} onChange={(e) => set("startYear", e.target.value)} placeholder="2019" /></Field>
            <Field label="End Year"><Input value={form.endYear} onChange={(e) => set("endYear", e.target.value)} placeholder="2023" /></Field>
          </div>
          <Field label="Grade / CGPA"><Input value={form.grade} onChange={(e) => set("grade", e.target.value)} placeholder="8.07" /></Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90" onClick={() => onSave(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ExpModal({ open, item, onClose, onSave }: { open: boolean; item: Experience | null; onClose: () => void; onSave: (e: Experience) => void }) {
  const [form, setForm] = useState<Experience>(() => item ?? { id: crypto.randomUUID(), company: "", title: "", type: "Full-time", startDate: "", endDate: "", current: false, description: "" });
  const set = (k: keyof Experience, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader><DialogTitle>{item ? "Edit Experience" : "Add Experience"}</DialogTitle></DialogHeader>
        <div className="grid gap-4">
          <Field label="Company"><Input value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Masuu Global Technologies" /></Field>
          <Field label="Job Title"><Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="AI / ML Intern" /></Field>
          <Field label="Employment Type">
            <Select value={form.type} onValueChange={(v) => set("type", v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{EMP_TYPES.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date"><Input type="month" value={form.startDate} onChange={(e) => set("startDate", e.target.value)} /></Field>
            <Field label="End Date"><Input type="month" value={form.endDate} onChange={(e) => set("endDate", e.target.value)} disabled={form.current} /></Field>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="current" checked={form.current} onCheckedChange={(v) => set("current", !!v)} />
            <label htmlFor="current" className="text-sm">I currently work here</label>
          </div>
          <Field label="Description">
            <Textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe your responsibilities and achievements..." />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90" onClick={() => onSave(form)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
