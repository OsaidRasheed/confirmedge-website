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
    <section id="product" ref={ref} className="relative py-24 md:py-32 overflow-hidden bg-[#f3f1ef]">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-14">
          <p className="font-mono text-[13px] text-accent mb-4">{"// flagship product"}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1b1a19] mb-5">
            Meet <span className="text-accent">ConfirmChart</span>
          </h2>
          <p className="text-lg text-[#57544f] leading-relaxed">
            A native Windows application for turning raw data into stunning, real-time
            charts — built by us, end to end. Everything you see below is rendered live
            in your browser with the same engineering standards we ship on the desktop.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 lg:gap-16 items-start">
          {/* features */}
          <div className="space-y-1.5">
            {confirmChartFeatures.map((f) => (
              <div
                key={f.title}
                className="reveal group flex gap-4 p-4 rounded-lg hover:bg-white border border-transparent hover:border-[#e5e2de] hover:shadow-sm transition-all"
              >
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-md bg-[#e8f2fb] border border-[#b3d4f0] shrink-0">
                  <Check className="w-3.5 h-3.5 text-accent" />
                </span>
                <div>
                  <h3 className="font-semibold text-[#1b1a19] group-hover:text-accent transition-colors">
                    {f.title}
                  </h3>
                  <p className="text-sm text-[#6b6560] leading-relaxed mt-0.5">{f.description}</p>
                </div>
              </div>
            ))}

            <div className="reveal pt-5 flex flex-wrap gap-4 items-center">
              <a
                href={`mailto:${company.email}?subject=ConfirmChart%20demo%20request`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold bg-accent text-white hover:bg-[#106ebe] transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                Request a demo
              </a>
              <span className="inline-flex items-center px-4 py-2.5 rounded-md border border-[#d8d4cf] bg-white/70 text-[13px] font-mono text-[#6b6560]">
                Windows 10 / 11 · x64 · ARM64
              </span>
            </div>
          </div>

          {/* interactive demo */}
          <div className="reveal lg:sticky lg:top-24">
            <p className="font-mono text-xs text-[#8a8580] mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0067c0] animate-pulse" />
              interactive demo — switch chart types, hover to inspect
            </p>
            <WindowFrame title="ConfirmChart — SPC analysis" bodyClassName="p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div className="flex gap-1 p-1 rounded-md bg-[#f3f1ef] border border-[#e5e2de]">
                  {MODES.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMode(m.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-[5px] text-xs font-medium transition-all ${
                        mode === m.id
                          ? "bg-white text-accent shadow-sm border border-[#e5e2de]"
                          : "text-[#6b6560] hover:text-[#1b1a19] border border-transparent"
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
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-md text-xs font-mono border transition-all ${
                    mode === "capability"
                      ? "border-[#e5e2de] text-[#c8c3bd] cursor-not-allowed"
                      : streaming
                        ? "border-emerald-300 text-emerald-700 bg-emerald-50"
                        : "border-[#d8d4cf] text-[#6b6560] bg-white"
                  }`}
                >
                  {streaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {streaming ? "streaming" : "paused"}
                </button>
              </div>
              <div className="h-[300px] sm:h-[340px] rounded-md bg-[#0a0f1d] overflow-hidden">
                <SpcChart key={mode} variant={mode} streaming={streaming} />
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#eceae6] text-[11px] font-mono text-[#8a8580]">
                <span>
                  {mode === "control"
                    ? "x̄ chart · interval: 900 ms · hover to inspect"
                    : "histogram · n = 400 · normal fit · LSL/USL"}
                </span>
                <span>rendered on &lt;canvas&gt; @ 60 fps</span>
              </div>
            </WindowFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
