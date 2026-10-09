import { useState } from "react";
import { Check, Download, Activity, BarChart3, Pause, Play } from "lucide-react";
import { WindowFrame } from "@/components/WindowFrame";
import { SpcChart, type SpcVariant } from "@/components/SpcChart";
import { useRevealGroup } from "@/hooks/useReveal";
import { confirmChartFeatures, company } from "@/lib/content";

const MODES: { id: SpcVariant; label: string; icon: typeof Activity }[] = [
  { id: "control", label: "Control chart", icon: Activity },
  { id: "capability", label: "Capability", icon: BarChart3 },
];

export function Product() {
  const [mode, setMode] = useState<SpcVariant>("control");
  const [streaming, setStreaming] = useState(true);
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section id="product" ref={ref} className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />
      <div className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.07] blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-16">
          <p className="font-mono text-sm text-cyan-400 mb-4">{"// flagship product"}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Meet <span className="text-gradient">ConfirmChart</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            A native Windows application for turning raw data into stunning, real-time
            charts — built by us, end to end. Everything you see below is rendered live
            in your browser with the same engineering standards we ship on the desktop.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* features */}
          <div className="space-y-2">
            {confirmChartFeatures.map((f) => (
              <div
                key={f.title}
                className="reveal group flex gap-4 p-4 rounded-xl hover:bg-white/[0.03] border border-transparent hover:border-white/[0.06] transition-all"
              >
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-md bg-cyan-400/10 border border-cyan-400/25 shrink-0">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                </span>
                <div>
                  <h3 className="font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{f.description}</p>
                </div>
              </div>
            ))}

            <div className="reveal pt-5 flex flex-wrap gap-4">
              <a
                href={`mailto:${company.email}?subject=ConfirmChart%20demo%20request`}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all hover:shadow-[0_0_32px_rgba(34,211,238,0.4)]"
              >
                <Download className="w-4.5 h-4.5" />
                Request a demo
              </a>
              <span className="inline-flex items-center px-4 py-3 rounded-xl border border-white/10 text-sm font-mono text-slate-500">
                Windows 10 / 11 · x64 · ARM64
              </span>
            </div>
          </div>

          {/* interactive demo */}
          <div className="reveal lg:sticky lg:top-28">
            <p className="font-mono text-xs text-slate-500 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              interactive demo — switch chart types, hover to inspect
            </p>
            <WindowFrame title="ConfirmChart — SPC analysis" bodyClassName="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex gap-1.5 p-1 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                        mode === m.id
                          ? "bg-cyan-400/15 text-cyan-300 shadow-[inset_0_0_0_1px_rgba(34,211,238,0.3)]"
                          : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      <m.icon className="w-3.5 h-3.5" />
                      {m.label}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setStreaming((s) => !s)}
                  disabled={mode === "capability"}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono border transition-all ${
                    mode === "capability"
                      ? "border-white/[0.06] text-slate-700 cursor-not-allowed"
                      : streaming
                        ? "border-emerald-400/30 text-emerald-400 bg-emerald-400/[0.06]"
                        : "border-white/10 text-slate-500 bg-white/[0.03]"
                  }`}
                >
                  {streaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {streaming ? "streaming" : "paused"}
                </button>
              </div>
              <div className="h-[300px] sm:h-[340px]">
                <SpcChart key={mode} variant={mode} streaming={streaming} />
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-600">
                <span>
                  {mode === "control"
                    ? "x̄ chart · interval: 900 ms · hover to inspect"
                    : "histogram · n = 400 · normal fit · LSL/USL"}
                </span>
                <span className="text-slate-500">rendered on &lt;canvas&gt; @ 60 fps</span>
              </div>
            </WindowFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
