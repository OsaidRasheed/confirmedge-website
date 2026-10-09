import { Mail, Phone, MessageCircle, MapPin, ArrowUpRight } from "lucide-react";
import { useRevealGroup } from "@/hooks/useReveal";
import { company } from "@/lib/content";

export function Contact() {
  const ref = useRevealGroup<HTMLElement>();

  const cards = [
    {
      icon: Mail,
      label: "Email",
      value: company.email,
      href: `mailto:${company.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: company.phone,
      href: `tel:${company.phone.replace(/\s/g, "")}`,
    },
    {
      icon: MessageCircle,
      label: "WhatsApp",
      value: company.whatsapp,
      href: company.whatsappLink,
    },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-36 border-t border-white/[0.05] overflow-hidden">
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] rounded-full bg-cyan-500/[0.07] blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mx-auto text-center mb-16">
          <p className="font-mono text-sm text-cyan-400 mb-4">{"// let's talk"}</p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Have an app in mind?
            <br />
            <span className="text-gradient">Let's build it.</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Tell us about your project — we reply within one business day.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto mb-5">
          {cards.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "WhatsApp" ? "_blank" : undefined}
              rel={c.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="reveal group rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.04] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400/15 to-blue-500/15 border border-cyan-400/20 flex items-center justify-center">
                  <c.icon className="w-5 h-5 text-cyan-300" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </div>
              <p className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-1">{c.label}</p>
              <p className="font-semibold text-slate-200 group-hover:text-white transition-colors break-all">
                {c.value}
              </p>
            </a>
          ))}
        </div>

        <div className="reveal max-w-4xl mx-auto">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-400/15 to-purple-500/15 border border-indigo-400/20 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-indigo-300" />
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-slate-500 mb-1">Office</p>
                <address className="not-italic text-slate-300 leading-relaxed">
                  {company.address.street}, {company.address.city}
                  <br />
                  {company.address.country}
                </address>
              </div>
            </div>
            <a
              href={`mailto:${company.email}?subject=Project%20inquiry`}
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-semibold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition-all hover:shadow-[0_0_32px_rgba(34,211,238,0.4)] shrink-0"
            >
              Send us a message
              <ArrowUpRight className="w-4.5 h-4.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
