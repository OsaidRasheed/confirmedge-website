import { useRevealGroup } from "@/hooks/useReveal";
import { results } from "@/lib/content";

export function Results() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section id="results" ref={ref} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-14">
          <p className="font-mono text-[13px] text-accent mb-4">{"// proof"}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1b1a19] mb-5">
            Outcomes, not just output
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {results.map((r) => (
            <div key={r.title} className="reveal fluent-card p-8">
              <p className="font-mono text-4xl md:text-[2.75rem] font-bold text-accent mb-4 leading-none">
                {r.metric}
              </p>
              <h3 className="text-lg font-semibold text-[#1b1a19] mb-2">{r.title}</h3>
              <p className="text-sm text-[#57544f] leading-relaxed">{r.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
