import { ArrowRight, ChevronDown, MonitorDown, Cpu } from "lucide-react";
import { WindowFrame } from "@/components/WindowFrame";
import { LiveChart } from "@/components/LiveChart";
import { Terminal } from "@/components/Terminal";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center overflow-hidden pt-28 pb-20">
      {/* backdrop */}
      <div className="absolute inset-0 bg-grid bg-grid-fade" />
      <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-cyan-500/[0.09] blur-[140px]" />
      <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.08] blur-[140px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 w-full">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-14 lg:gap-10 items-center">
          {/* copy */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-cyan-400/25 bg-cyan-400/[0.06] text-cyan-300 text-[13px] font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
              </span>
              Windows App Engineering Studio
            </div>

            <h1 className="text-[2.6rem] sm:text-6xl xl:text-[4.4rem] font-extrabold leading-[1.04] tracking-tight mb-6">
              We craft
              <br />
              <span className="text-gradient">software products</span>
              <br />
              you can rely on.
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed mb-9">
              Confirmedge designs and engineers native desktop software with WinUI 3,
              .NET and Direct2D — and we're the makers of{" "}
              <span className="text-slate-200 font-semibold">ConfirmChart</span>, our
              flagship charting app for Windows.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a
                href="#product"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all hover:shadow-[0_0_36px_rgba(34,211,238,0.45)] hover:-translate-y-0.5"
              >
                <MonitorDown className="w-5 h-5" />
                Explore ConfirmChart
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold border border-white/15 text-slate-200 hover:bg-white/5 hover:border-white/25 transition-all"
              >
                Start your project
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" /> Native performance, 60 fps UI
              </span>
              <span className="flex items-center gap-2">
                <span className="font-mono text-cyan-400 text-xs border border-cyan-400/30 rounded px-1.5 py-0.5">MSIX</span>
                Signed & Store-ready
              </span>
            </div>
          </div>

          {/* visual */}
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/15 rounded-3xl blur-2xl" />
            <div className="relative animate-float">
              <WindowFrame title="ConfirmChart — dashboard.ccx" bodyClassName="p-4">
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex gap-2">
                    {["Overview", "Series", "Reports"].map((t, i) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2.5 py-1 rounded-md ${
                          i === 0 ? "bg-cyan-400/15 text-cyan-300" : "text-slate-500"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="h-[240px] sm:h-[280px]">
                  <LiveChart mode="area" streaming />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[
                    { k: "fps", v: "60" },
                    { k: "points", v: "102,440" },
                    { k: "latency", v: "3.8 ms" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500">{s.k}</p>
                      <p className="text-sm font-semibold text-slate-200 font-mono">{s.v}</p>
                    </div>
                  ))}
                </div>
              </WindowFrame>

              <Terminal className="absolute -bottom-14 -left-6 sm:-left-12 w-[320px] sm:w-[380px] hidden sm:block shadow-2xl" />
            </div>
          </div>
        </div>
      </div>

      <a
        href="#product"
        aria-label="Scroll to product"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-slate-600 hover:text-cyan-400 transition-colors"
      >
        <ChevronDown className="w-7 h-7 animate-bounce" />
      </a>
    </section>
  );
}
