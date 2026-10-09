import { useEffect, useRef, useState } from "react";

const SCRIPT: { text: string; kind: "cmd" | "out" }[] = [
  { text: "dotnet new winui3 -n ConfirmChart", kind: "cmd" },
  { text: "The template \"WinUI 3 App\" was created successfully.", kind: "out" },
  { text: "dotnet publish -c Release -r win-x64 --self-contained", kind: "cmd" },
  { text: "ConfirmChart -> bin/Release/net8.0-windows/win-x64/publish/", kind: "out" },
  { text: "MSIX package signed · 14.2 MB · 0 warnings", kind: "out" },
  { text: "confirmchart --benchmark --frames 10000", kind: "cmd" },
  { text: "avg frame: 3.8 ms · 60 fps sustained ✓", kind: "out" },
];

export function Terminal({ className = "" }: { className?: string }) {
  const [lines, setLines] = useState<{ text: string; kind: string }[]>([]);
  const [current, setCurrent] = useState("");
  const stateRef = useRef({ line: 0, char: 0 });
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    const step = () => {
      const { line, char } = stateRef.current;
      if (line >= SCRIPT.length) {
        // pause, then restart
        timer = setTimeout(() => {
          stateRef.current = { line: 0, char: 0 };
          setLines([]);
          setCurrent("");
          timer = setTimeout(step, 600);
        }, 4200);
        return;
      }
      const entry = SCRIPT[line];
      if (char < entry.text.length) {
        setCurrent(entry.text.slice(0, char + 1));
        stateRef.current.char++;
        const jitter = entry.kind === "cmd" ? 26 + Math.random() * 46 : 6 + Math.random() * 10;
        timer = setTimeout(step, jitter);
      } else {
        setLines((prev) => [...prev, { text: entry.text, kind: entry.kind }]);
        setCurrent("");
        stateRef.current = { line: line + 1, char: 0 };
        timer = setTimeout(step, entry.kind === "cmd" ? 300 : 420);
      }
    };

    timer = setTimeout(step, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight });
  }, [lines, current]);

  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 bg-[#070b16]/95 card-glow ${className}`}>
      <div className="flex items-center gap-2 h-9 px-4 border-b border-white/[0.06] bg-[#0b1120]/90">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] font-mono text-slate-500">powershell — confirmedge</span>
      </div>
      <div ref={bodyRef} className="p-4 font-mono text-[12px] leading-relaxed h-[168px] overflow-hidden">
        {lines.map((l, i) =>
          l.kind === "cmd" ? (
            <p key={i} className="text-slate-200">
              <span className="text-cyan-400 mr-2">❯</span>
              {l.text}
            </p>
          ) : (
            <p key={i} className="text-slate-500 pl-4">{l.text}</p>
          )
        )}
        {stateRef.current.line < SCRIPT.length && (
          <p className="text-slate-200">
            <span className="text-cyan-400 mr-2">❯</span>
            {current}
            <span className="caret-blink text-cyan-300">▌</span>
          </p>
        )}
      </div>
    </div>
  );
}
