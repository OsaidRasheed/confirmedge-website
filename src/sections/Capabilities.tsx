import { AppWindow, Gauge, Layers, Globe, Package, ShieldCheck } from "lucide-react";
import { useRevealGroup } from "@/hooks/useReveal";
import { capabilities } from "@/lib/content";

const ICONS: Record<string, typeof AppWindow> = {
  "app-window": AppWindow,
  gauge: Gauge,
  layers: Layers,
  globe: Globe,
  package: Package,
  shield: ShieldCheck,
};

export function Capabilities() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section id="capabilities" ref={ref} className="relative py-24 md:py-36 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-16">
          <p className="font-mono text-sm text-cyan-400 mb-4">{"// what we do"}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Full-stack desktop engineering
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            From the first wireframe to a signed installer on your user's machine —
            every layer handled in-house.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => {
            const Icon = ICONS[cap.icon] ?? AppWindow;
            return (
              <div
                key={cap.title}
                className="reveal group relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.04] hover:-translate-y-1.5"
              >
                <div className="absolute inset-x-7 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/0 to-transparent group-hover:via-cyan-400/60 transition-all duration-500" />
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center mb-5 group-hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-shadow">
                  <Icon className="w-6 h-6 text-cyan-300" />
                </div>
                <h3 className="text-lg font-bold mb-2.5 group-hover:text-cyan-300 transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-slate-500 group-hover:text-slate-400 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
