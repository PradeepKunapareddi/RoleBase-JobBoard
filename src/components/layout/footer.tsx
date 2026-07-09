import { Link } from "@tanstack/react-router";
import { Briefcase, Github, Linkedin, Twitter } from "lucide-react";

const footerLinks = [
  {
    title: "Product",
    links: [
      { label: "Browse Jobs", to: "/jobs" },
      { label: "Companies", to: "/companies/" },
      { label: "Salary Insights", to: "/salary" },
      { label: "AI Match", to: "/ai-match" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Careers", to: "/careers" },
      { label: "Press", to: "/press" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", to: "/blog" },
      { label: "Help Center", to: "/help" },
      { label: "Guides", to: "/guides" },
      { label: "Changelog", to: "/changelog" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-gradient-to-b from-transparent to-muted/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-14 sm:px-6 md:grid-cols-5">
        <div className="col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-brand to-indigo-500 text-white">
              <Briefcase className="h-5 w-5" />
            </div>
            <span className="font-display text-lg font-bold">Rolebase</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            The AI-native job board built for the next generation of engineers, designers,
            and operators. Discover your next role in minutes, not months.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Linkedin, href: "https://linkedin.com" },
              { Icon: Github, href: "https://github.com" },
            ].map(({ Icon, href }, i) => (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-brand hover:text-brand">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {footerLinks.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold">{col.title}</h4>
            <ul className="mt-4 space-y-2">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <span>© {new Date().getFullYear()} Rolebase, Inc. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-foreground">Privacy</Link>
            <Link to="/about" className="hover:text-foreground">Terms</Link>
            <Link to="/about" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
