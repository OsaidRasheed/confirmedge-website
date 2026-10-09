import { techStack } from "@/lib/content";

export function TechMarquee() {
  const items = [...techStack, ...techStack];
  return (
    <section aria-label="Technologies we use" className="py-9 border-y border-[#e5e2de] bg-white/60 overflow-hidden">
      <div className="marquee-mask">
        <div className="flex w-max animate-marquee gap-3 pr-3">
          {items.map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="font-mono text-[13px] text-[#6b6560] whitespace-nowrap px-4 py-2 rounded-md border border-[#e5e2de] bg-white hover:text-[#0067c0] hover:border-[#b3d4f0] transition-colors"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
