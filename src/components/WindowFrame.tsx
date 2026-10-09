interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  /** light = Fluent title bar (default), dark = keeps dark chrome */
  chrome?: "light" | "dark";
  onTitlePointerDown?: (e: React.PointerEvent) => void;
}

/** Windows 11 style window chrome — Mica title bar, Fluent controls. */
export function WindowFrame({
  title,
  children,
  className = "",
  bodyClassName = "",
  chrome = "light",
  onTitlePointerDown,
}: WindowFrameProps) {
  const dark = chrome === "dark";
  return (
    <div className={`window-frame overflow-hidden ${dark ? "!bg-[#0b1120] !border-white/10" : ""} ${className}`}>
      {/* Title bar */}
      <div
        className={`flex items-center justify-between h-10 pl-4 select-none ${
          dark ? "bg-[#0b1120]/95 border-b border-white/[0.06]" : "bg-[#f7f5f3]/90 border-b border-[#eceae6]"
        } ${onTitlePointerDown ? "cursor-grab active:cursor-grabbing touch-none" : ""}`}
        onPointerDown={onTitlePointerDown}
      >
        <div className="flex items-center gap-2.5 min-w-0 pointer-events-none">
          <span className="w-3.5 h-3.5 rounded-[4px] bg-gradient-to-br from-sky-400 to-[#0067c0] shrink-0" />
          <span className={`text-xs truncate ${dark ? "text-slate-300" : "text-[#1b1a19]"}`}>{title}</span>
        </div>
        <div className={`flex items-center self-stretch shrink-0 ${dark ? "text-slate-500" : "text-[#616161]"}`}>
          <span className={`flex items-center justify-center w-11 h-full transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-black/[0.06]"}`}>
            <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
          <span className={`flex items-center justify-center w-11 h-full transition-colors ${dark ? "hover:bg-white/5" : "hover:bg-black/[0.06]"}`}>
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
          <span className={`flex items-center justify-center w-11 h-full transition-colors hover:bg-[#c42b1c] ${dark ? "hover:text-white" : "hover:text-white"}`}>
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>
      </div>
      <div className={`${dark ? "bg-[#0a0f1d]" : "bg-white"} ${bodyClassName}`}>{children}</div>
    </div>
  );
}
