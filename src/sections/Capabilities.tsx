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
    <section id="capabilities" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-14">
          <p className="font-mono text-[13px] text-accent mb-4">{"// what we do"}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1b1a19] mb-5">
            Full-stack desktop engineering
          </h2>
          <p className="text-lg text-[#57544f] leading-relaxed">
            From the first wireframe to a signed installer on your user's machine —
            every layer handled in-house.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map((cap) => {
            const Icon = ICONS[cap.icon] ?? AppWindow;
            return (
              <div key={cap.title} className="reveal fluent-card group p-7">
                <div className="w-11 h-11 rounded-lg bg-[#e8f2fb] border border-[#cfe5f7] flex items-center justify-center mb-5 group-hover:bg-[#dcebfa] transition-colors">
                  <Icon className="w-5 h-5 text-accent" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-[#1b1a19] mb-2.5 group-hover:text-accent transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-[#57544f] leading-relaxed mb-5">{cap.description}</p>
                <div className="flex flex-wrap gap-2">
                  {cap.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-[#f3f1ef] border border-[#e5e2de] text-[#6b6560]"
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
