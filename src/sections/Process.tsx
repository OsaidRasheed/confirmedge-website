import { useRevealGroup } from "@/hooks/useReveal";
import { processSteps } from "@/lib/content";

export function Process() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-32 bg-[#f3f1ef] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-14">
          <p className="font-mono text-[13px] text-accent mb-4">{"// how we ship"}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1b1a19] mb-5">
            A process that respects your deadline
          </h2>
          <p className="text-lg text-[#57544f] leading-relaxed">
            Four phases. Working software from week one. No surprises at launch.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {processSteps.map((step) => (
            <div
              key={step.num}
              className="reveal fluent-card group relative p-7 overflow-hidden"
            >
              <span className="absolute -top-4 -right-1 font-mono text-[92px] font-bold text-[#0067c0]/[0.06] select-none leading-none group-hover:text-[#0067c0]/[0.1] transition-colors">
                {step.num}
              </span>
              <p className="font-mono text-xs text-accent mb-5">
                <span className="text-[#b3ada6]">C:\&gt;</span> confirmedge {step.cmd}
                <span className="caret-blink ml-1">▌</span>
              </p>
              <h3 className="text-xl font-semibold text-[#1b1a19] mb-2.5">{step.title}</h3>
              <p className="text-sm text-[#57544f] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
