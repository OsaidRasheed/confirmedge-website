import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, company } from "@/lib/content";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "acrylic border-b border-[#e5e2de] py-2.5 shadow-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3 group">
          <img
            src="/assets/logo.png"
            alt={company.name}
            className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
          />
        </a>

        <nav className="hidden md:flex items-center gap-0.5" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-[#57544f] hover:text-[#1b1a19] rounded-md hover:bg-black/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-semibold bg-accent text-white hover:bg-[#106ebe] transition-colors shadow-sm"
          >
            Start a project
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <button
          className="md:hidden p-2 text-[#444441]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden acrylic border-t border-[#e5e2de] mt-2.5">
          <nav className="px-6 py-4 flex flex-col gap-1" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm text-[#444441] rounded-md hover:bg-black/[0.05]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-md text-sm font-semibold bg-accent text-white"
            >
              Start a project
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
