import { useEffect, useState } from "react";
import { ArrowRight, BarChart3, Layers, Mail, CloudSun } from "lucide-react";
import { WindowFrame } from "@/components/WindowFrame";
import { LiveChart } from "@/components/LiveChart";

const DESKTOP_ICONS = [
  { label: "ConfirmChart", href: "#product", icon: BarChart3, tile: "from-sky-400 to-[#0067c0]" },
  { label: "Capabilities", href: "#capabilities", icon: Layers, tile: "from-indigo-400 to-indigo-600" },
  { label: "Contact", href: "#contact", icon: Mail, tile: "from-teal-400 to-teal-600" },
];

const PINNED_APPS = [
  { label: "Product", href: "#product", icon: BarChart3 },
  { label: "Capabilities", href: "#capabilities", icon: Layers },
  { label: "Process", href: "#process", icon: null },
  { label: "Contact", href: "#contact", icon: Mail },
];

export function Hero() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const startDrag = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    const sx = e.clientX;
    const sy = e.clientY;
    const bx = pos.x;
    const by = pos.y;
    setDragging(true);
    const move = (ev: PointerEvent) => {
      setPos({
        x: bx + (ev.clientX - sx),
        y: Math.max(-40, by + (ev.clientY - sy)),
      });
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const clock = now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  const date = now.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

  return (
    <section id="top" className="relative min-h-screen overflow-hidden wallpaper flex flex-col">
      {/* subtle dot texture over wallpaper */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(rgba(15,23,42,0.05) 1px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* desktop icons */}
      <div className="absolute left-5 top-24 z-20 hidden md:flex flex-col gap-2">
        {DESKTOP_ICONS.map((d) => (
          <a
            key={d.label}
            href={d.href}
            className="group flex flex-col items-center gap-1.5 w-20 py-2.5 rounded-lg hover:bg-white/50 transition-colors"
          >
            <span
              className={`w-11 h-11 rounded-[10px] bg-gradient-to-br ${d.tile} shadow-md flex items-center justify-center group-hover:scale-105 transition-transform`}
            >
              <d.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
            </span>
            <span className="text-[11px] text-[#2b2a28] [text-shadow:0_1px_2px_rgba(255,255,255,0.8)]">
              {d.label}
            </span>
          </a>
        ))}
      </div>

      <div className="relative z-10 flex-1 max-w-7xl mx-auto px-6 md:px-8 w-full flex items-center pt-28 pb-20">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 items-center w-full">
          {/* copy over the wallpaper */}
          <div>
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#d8d4cf] bg-white/70 backdrop-blur text-[13px] text-[#444441] mb-7 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0067c0] opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0067c0]" />
              </span>
              Windows App Engineering Studio
            </div>

            <h1 className="text-[2.7rem] sm:text-6xl xl:text-[4.2rem] font-semibold leading-[1.05] tracking-tight text-[#1b1a19] mb-6">
              We craft
              <br />
              <span className="text-accent">software products</span>
              <br />
              you can rely on.
            </h1>

            <p className="text-lg text-[#57544f] max-w-xl leading-relaxed mb-9">
              Confirmedge designs and engineers native desktop software with WinUI 3,
              .NET and Direct2D — and we're the makers of{" "}
              <span className="font-semibold text-[#1b1a19]">ConfirmChart</span>, our
              flagship charting app for Windows.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
              <a
                href="#product"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-white bg-accent hover:bg-[#106ebe] active:bg-[#005a9e] transition-colors shadow-sm"
              >
                Explore ConfirmChart
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md font-semibold text-[#1b1a19] bg-white/80 border border-[#d8d4cf] hover:bg-white transition-colors shadow-sm"
              >
                Start your project
              </a>
            </div>

            <p className="font-mono text-xs text-[#8a8580] hidden lg:block">
              tip: grab the window title bar — it drags.
            </p>
          </div>

          {/* draggable app window on the desktop */}
          <div className="relative hidden sm:block">
            <div
              className={`animate-window-in ${dragging ? "" : "transition-transform duration-200"}`}
              style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
            >
              <WindowFrame
                title="ConfirmChart — dashboard.ccx"
                onTitlePointerDown={startDrag}
                bodyClassName="p-4"
              >
                <div className="flex items-center justify-between mb-3 px-1">
                  <div className="flex gap-1.5">
                    {["Overview", "Series", "Reports"].map((t, i) => (
                      <span
                        key={t}
                        className={`text-[11px] px-2.5 py-1 rounded-md ${
                          i === 0
                            ? "bg-[#e8f2fb] text-[#0067c0] font-medium"
                            : "text-[#8a8580] hover:bg-black/[0.04]"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    LIVE
                  </span>
                </div>
                <div className="h-[250px] sm:h-[290px] rounded-md bg-[#0a0f1d] overflow-hidden">
                  <LiveChart mode="area" streaming />
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {[
                    { k: "fps", v: "60" },
                    { k: "points", v: "102,440" },
                    { k: "latency", v: "3.8 ms" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-md bg-[#f7f5f3] border border-[#eceae6] px-3 py-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-[#8a8580]">{s.k}</p>
                      <p className="text-sm font-semibold text-[#1b1a19] font-mono">{s.v}</p>
                    </div>
                  ))}
                </div>
              </WindowFrame>
            </div>
          </div>
        </div>
      </div>

      {/* taskbar */}
      <div className="relative z-20 h-12 acrylic border-t border-[#e0ddd9] shadow-[0_-2px_12px_rgba(15,23,42,0.06)]">
        <div className="h-full max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* left — weather-style widget */}
          <div className="hidden md:flex items-center gap-2 text-[#57544f]">
            <CloudSun className="w-5 h-5 text-[#0067c0]" strokeWidth={1.8} />
            <span className="text-xs leading-tight">
              12°C London
              <br />
              <span className="text-[#8a8580]">Partly cloudy</span>
            </span>
          </div>

          {/* center — start + pinned apps */}
          <div className="flex items-center gap-1 mx-auto md:mx-0 md:absolute md:left-1/2 md:-translate-x-1/2">
            <a
              href="#top"
              title="Start"
              className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-black/[0.06] transition-colors"
            >
              <img src="/assets/logo.png" alt="Start" className="h-5 w-auto" />
            </a>
            <span className="w-px h-6 bg-[#d8d4cf] mx-1" />
            {PINNED_APPS.map((app) => (
              <a
                key={app.label}
                href={app.href}
                title={app.label}
                className="group relative flex items-center justify-center w-10 h-10 rounded-md hover:bg-black/[0.06] transition-colors"
              >
                {app.icon ? (
                  <app.icon className="w-5 h-5 text-[#444441] group-hover:text-[#0067c0] transition-colors" strokeWidth={1.8} />
                ) : (
                  <span className="font-mono text-[13px] text-[#444441] group-hover:text-[#0067c0] transition-colors">
                    &gt;_
                  </span>
                )}
                <span className="absolute bottom-0.5 w-1 h-1 rounded-full bg-[#0067c0] opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>

          {/* right — clock */}
          <div className="text-right leading-tight text-[#444441]">
            <p className="text-xs font-medium tabular-nums">{clock}</p>
            <p className="text-[11px] text-[#8a8580]">{date}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
