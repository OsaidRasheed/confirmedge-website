import { useRevealGroup } from "@/hooks/useReveal";
import { processSteps } from "@/lib/content";

export function Process() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-36 border-t border-white/[0.05] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-blue-500/[0.06] blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-16">
          <p className="font-mono text-sm text-cyan-400 mb-4">{"// how we ship"}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            A process that respects your deadline
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Four phases. Working software from week one. No surprises at launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="reveal group relative rounded-2xl border border-white/[0.07] bg-[#0a0f1d]/80 p-7 overflow-hidden transition-all duration-300 hover:border-white/[0.15] hover:-translate-y-1.5"
            >
              <span className="absolute -top-3 -right-2 font-mono text-[88px] font-bold text-white/[0.04] select-none leading-none group-hover:text-cyan-400/[0.07] transition-colors">
                {step.num}
              </span>
              <p className="font-mono text-xs text-cyan-400 mb-5">
                <span className="text-slate-600">$</span> confirmedge {step.cmd}
                <span className="caret-blink text-cyan-300 ml-1">▌</span>
              </p>
              <h3 className="text-xl font-bold mb-2.5">{step.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
