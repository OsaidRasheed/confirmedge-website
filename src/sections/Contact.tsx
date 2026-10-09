import { Mail, Phone, MessageCircle, MapPin, Send, Paperclip, Image as ImageIcon } from "lucide-react";
import { useRevealGroup } from "@/hooks/useReveal";
import { company } from "@/lib/content";

export function Contact() {
  const ref = useRevealGroup<HTMLElement>();

  const channels = [
    { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
    { icon: Phone, label: "Phone", value: company.phone, href: `tel:${company.phone.replace(/\s/g, "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: company.whatsapp, href: company.whatsappLink },
  ];

  return (
    <section id="contact" ref={ref} className="relative py-24 md:py-32 bg-[#f3f1ef] overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 md:px-8">
        <div className="reveal max-w-3xl mx-auto text-center mb-14">
          <p className="font-mono text-[13px] text-accent mb-4">{"// let's talk"}</p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1b1a19] mb-5">
            Have an app in mind? <span className="text-accent">Let's build it.</span>
          </h2>
          <p className="text-lg text-[#57544f] leading-relaxed">
            Tell us about your project — we reply within one business day.
          </p>
        </div>

        {/* contact composed as a new-mail window */}
        <div className="reveal max-w-3xl mx-auto window-frame overflow-hidden mb-8">
          <div className="flex items-center gap-2 h-11 px-4 bg-[#f7f5f3]/90 border-b border-[#eceae6]">
            <Mail className="w-4 h-4 text-accent" />
            <span className="text-xs text-[#444441] font-medium">New message</span>
          </div>
          <div className="bg-white">
            <div className="px-5 py-3 border-b border-[#eceae6] flex items-center gap-3 text-sm">
              <span className="text-[#8a8580] w-14">To:</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#e8f2fb] border border-[#cfe5f7] text-[#0067c0] text-[13px] font-medium">
                <Mail className="w-3 h-3" />
                {company.email}
              </span>
            </div>
            <div className="px-5 py-3 border-b border-[#eceae6] flex items-center gap-3 text-sm">
              <span className="text-[#8a8580] w-14">Subject:</span>
              <span className="text-[#1b1a19]">Project inquiry — let's talk</span>
            </div>
            <div className="px-5 py-6 text-sm text-[#57544f] leading-relaxed min-h-[110px]">
              Hi Confirmedge,
              <br />
              <br />
              We have an idea for an application and would like to hear how you'd
              approach it…
              <span className="caret-blink text-accent">▌</span>
            </div>
            <div className="px-5 py-3 border-t border-[#eceae6] flex items-center justify-between">
              <div className="flex gap-1 text-[#6b6560]">
                <span className="p-2 rounded-md hover:bg-black/[0.05] transition-colors cursor-pointer">
                  <Paperclip className="w-4 h-4" />
                </span>
                <span className="p-2 rounded-md hover:bg-black/[0.05] transition-colors cursor-pointer">
                  <ImageIcon className="w-4 h-4" />
                </span>
              </div>
              <a
                href={`mailto:${company.email}?subject=Project%20inquiry`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md font-semibold text-sm bg-accent text-white hover:bg-[#106ebe] transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                Send
              </a>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-4">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.label === "WhatsApp" ? "_blank" : undefined}
              rel={c.label === "WhatsApp" ? "noopener noreferrer" : undefined}
              className="reveal fluent-card group p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-lg bg-[#e8f2fb] border border-[#cfe5f7] flex items-center justify-center">
                  <c.icon className="w-4 h-4 text-accent" strokeWidth={1.8} />
                </span>
                <p className="font-mono text-[11px] uppercase tracking-wider text-[#8a8580]">{c.label}</p>
              </div>
              <p className="font-semibold text-sm text-[#1b1a19] group-hover:text-accent transition-colors break-all">
                {c.value}
              </p>
            </a>
          ))}
        </div>

        <div className="reveal max-w-3xl mx-auto">
          <div className="fluent-card p-5 flex items-center gap-4">
            <span className="w-9 h-9 rounded-lg bg-[#eef0fb] border border-[#dcd9f5] flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-indigo-600" strokeWidth={1.8} />
            </span>
            <address className="not-italic text-sm text-[#57544f] leading-relaxed">
              {company.address.street}, {company.address.city}, {company.address.country}
            </address>
          </div>
        </div>
      </div>
    </section>
  );
}
