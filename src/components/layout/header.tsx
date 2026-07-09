import { Link, useRouterState } from "@tanstack/react-router";
import { Briefcase, LayoutDashboard, Menu, Moon, Search, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/use-profile";

const nav = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Browse Jobs" },
  { to: "/companies/", label: "Companies" },
  { to: "/salary", label: "Salary Insights" },
  { to: "/ai-match", label: "AI Match" },
];

export function Header() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const { profile, completion } = useProfile();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 glass">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-indigo-500 text-white shadow-elegant transition-transform group-hover:scale-105">
            <Briefcase className="h-5 w-5" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">Rolebase</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">AI Job Board</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to.split("/").slice(0, 2).join("/"));
            return (
              <Link key={item.to} to={item.to}
                className={cn("relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground")}>
                {item.label}
                {active && <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-brand to-indigo-500" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Search jobs">
            <Link to="/jobs"><Search className="h-4 w-4" /></Link>
          </Button>
          <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex relative" aria-label="Profile">
            <Link to="/profile">
              {profile.photo
                ? <img src={profile.photo} alt="Profile" className="h-7 w-7 rounded-full object-cover" />
                : <User className="h-4 w-4" />}
              {completion < 100 && (
                <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-background" />
              )}
            </Link>
          </Button>
          <Button asChild className="hidden bg-gradient-to-r from-brand to-indigo-500 text-white hover:opacity-90 md:inline-flex">
            <Link to="/dashboard"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <div className="mt-8 flex flex-col gap-1">
                {nav.map((item) => (
                  <Link key={item.to} to={item.to} onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">
                    {item.label}
                  </Link>
                ))}
                <Link to="/profile" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">My Profile</Link>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-base font-medium text-foreground/90 hover:bg-accent">Dashboard</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
