import { useRevealGroup } from "@/hooks/useReveal";
import { results } from "@/lib/content";

export function Results() {
  const ref = useRevealGroup<HTMLElement>();

  return (
    <section id="results" ref={ref} className="relative py-24 md:py-36 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mb-16">
          <p className="font-mono text-sm text-cyan-400 mb-4">{"// proof"}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Outcomes, not just output
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {results.map((r) => (
            <div
              key={r.title}
              className="reveal rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 transition-all duration-300 hover:border-cyan-400/25 hover:bg-white/[0.04]"
            >
              <p className="font-mono text-4xl md:text-5xl font-bold text-gradient mb-4">{r.metric}</p>
              <h3 className="text-lg font-bold mb-2">{r.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{r.outcome}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
