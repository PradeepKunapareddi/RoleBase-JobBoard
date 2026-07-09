import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { FileText, Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CompanyLogo } from "@/components/company-logo";
import { MatchScore } from "@/components/match-score";
import { getCompany } from "@/data/companies";
import type { Job } from "@/data/jobs";
import { useLocalSet } from "@/hooks/use-local-storage";
import { useProfile } from "@/hooks/use-profile";

const schema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  linkedin: z.string().url("Enter a valid URL").optional().or(z.literal("")),
  coverLetter: z.string().max(1000, "Keep it under 1000 characters").optional(),
});

type FormValues = z.infer<typeof schema>;

export function QuickApplyModal({ job, open, onOpenChange }: { job: Job | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  const applied = useLocalSet("jb.applied");
  const [submitting, setSubmitting] = useState(false);
  const { profile } = useProfile();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", linkedin: "", coverLetter: "" },
  });

  // Auto-populate from profile
  useEffect(() => {
    if (open && profile.name) {
      form.reset({
        name: profile.name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        linkedin: profile.linkedin || "",
        coverLetter: "",
      });
    }
  }, [open, profile, form]);

  if (!job) return null;
  const company = getCompany(job.companySlug)!;

  const onSubmit = async (_v: FormValues) => {
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    applied.add(job.id);
    toast.success(`Application sent to ${company.name}!`, {
      description: `You applied to ${job.title}. Good luck! 🎉`,
    });
    setSubmitting(false);
    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <CompanyLogo company={company} />
            <div className="flex-1">
              <DialogTitle className="font-display">{job.title}</DialogTitle>
              <DialogDescription>{company.name} · {job.location} · {job.workMode}</DialogDescription>
            </div>
            <MatchScore score={job.matchScore} />
          </div>
        </DialogHeader>

        <div className="rounded-xl border border-brand/20 bg-brand/5 p-3 text-xs text-muted-foreground">
          <Sparkles className="mr-1 inline h-3 w-3 text-brand" />
          <span className="text-foreground">AI insight:</span> Your profile matches{" "}
          <span className="font-semibold text-brand">{job.matchScore}%</span> based on{" "}
          {job.skills.slice(0, 3).join(", ")}.
        </div>

        {profile.resumeName && (
          <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
            <FileText className="h-4 w-4 text-emerald-500 shrink-0" />
            <div className="flex-1">
              <div className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Resume attached</div>
              <div className="text-xs text-muted-foreground">{profile.resumeName}</div>
            </div>
            <Badge variant="outline" className="text-xs text-emerald-600 border-emerald-500/30">Auto-attached</Badge>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel>Full name</FormLabel>
                  <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input placeholder="+91 9876543210" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl><Input type="email" placeholder="you@domain.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="linkedin" render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn / Portfolio (optional)</FormLabel>
                <FormControl><Input placeholder="https://linkedin.com/in/you" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="coverLetter" render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter (optional)</FormLabel>
                <FormControl><Textarea rows={4} placeholder="Why are you a great fit for this role? Tell them briefly..." {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button type="submit" disabled={submitting} className="bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">
                {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Sending…</> : "Send Application"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
