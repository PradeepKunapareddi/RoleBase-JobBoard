import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [{ title: "Contact — Rolebase" }] }),
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    toast.success("Message sent!", { description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">Have a question or feedback? We'd love to hear from you.</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
        <form onSubmit={submit} className="space-y-5 rounded-2xl border border-border bg-card p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Pradeep Kunapareddi" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Subject</Label>
            <Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" />
          </div>
          <div className="space-y-1.5">
            <Label>Message</Label>
            <Textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." />
          </div>
          <Button type="submit" disabled={sending} className="w-full bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90">
            {sending ? "Sending..." : "Send Message"}
          </Button>
        </form>

        <div className="space-y-6">
          {[
            { icon: Mail, title: "Email us", desc: "support@rolebase.io", sub: "We reply within 24 hours" },
            { icon: MessageSquare, title: "Live chat", desc: "Chat with our team", sub: "Mon–Fri, 9am–6pm IST" },
            { icon: Phone, title: "Phone", desc: "+1 (415) 555-0100", sub: "Enterprise inquiries only" },
            { icon: MapPin, title: "Office", desc: "San Francisco, CA", sub: "500 Market Street, Suite 400" },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand/15 text-brand">
                <c.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">{c.title}</div>
                <div className="text-sm text-foreground">{c.desc}</div>
                <div className="text-xs text-muted-foreground">{c.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
