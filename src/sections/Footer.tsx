import { Linkedin, Instagram, ArrowUp } from "lucide-react";
import { company, navLinks } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#05080f]" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <img
              src="/assets/logo.png"
              alt={company.name}
              className="h-9 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-slate-500 leading-relaxed">
              A software studio crafting native Windows applications — makers of ConfirmChart.
            </p>
          </div>

          <nav className="flex gap-14" aria-label="Footer">
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-600 mb-4">Site</h4>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-slate-400 hover:text-cyan-300 transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-xs uppercase tracking-wider text-slate-600 mb-4">Connect</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={company.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={company.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-300 transition-colors"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <a
            href="#top"
            className="hidden md:flex w-11 h-11 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-400/40 transition-all shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </a>
        </div>

        <div className="pt-7 border-t border-white/[0.05] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p className="font-mono">
            built with <span className="text-cyan-500">♥</span> and WinUI 3
          </p>
        </div>
      </div>
    </footer>
  );
}
