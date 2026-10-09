import { techStack } from "@/lib/content";

export function TechMarquee() {
  const items = [...techStack, ...techStack];
  return (
    <section aria-label="Technologies we use" className="py-10 border-y border-white/[0.06] bg-[#070b16]/60 overflow-hidden">
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee gap-4 pr-4">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-mono text-sm text-slate-500 whitespace-nowrap px-5 py-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] hover:text-cyan-300 hover:border-cyan-400/30 transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
