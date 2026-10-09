import { Linkedin, Instagram, ArrowUp } from "lucide-react";
import { company, navLinks } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e5e2de] bg-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-12">
          <div className="max-w-sm">
            <img src="/assets/logo.png" alt={company.name} className="h-8 w-auto mb-4" />
            <p className="text-sm text-[#6b6560] leading-relaxed">
              A software studio crafting native Windows applications — makers of ConfirmChart.
            </p>
          </div>

          <nav className="flex gap-14" aria-label="Footer">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#b3ada6] mb-4">Site</h4>
              <ul className="space-y-2.5">
                {navLinks.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-sm text-[#57544f] hover:text-accent transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-[#b3ada6] mb-4">Connect</h4>
              <ul className="space-y-2.5">
                <li>
                  <a
                    href={company.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#57544f] hover:text-accent transition-colors"
                  >
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={company.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[#57544f] hover:text-accent transition-colors"
                  >
                    <Instagram className="w-4 h-4" /> Instagram
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <a
            href="#top"
            className="hidden md:flex w-10 h-10 items-center justify-center rounded-md border border-[#d8d4cf] text-[#57544f] hover:text-accent hover:border-[#b3d4f0] transition-all shrink-0"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </a>
        </div>

        <div className="pt-7 border-t border-[#eceae6] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#8a8580]">
          <p>© {year} {company.name}. All rights reserved.</p>
          <p className="font-mono">built with ♥ and WinUI 3</p>
        </div>
      </div>
    </footer>
  );
}
