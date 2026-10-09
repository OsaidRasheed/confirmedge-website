interface WindowFrameProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}

/** Windows 11 style window chrome with Mica-like translucent body. */
export function WindowFrame({ title, children, className = "", bodyClassName = "" }: WindowFrameProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden border border-white/10 card-glow ${className}`}
      role="img"
      aria-label={`${title} application window preview`}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between h-10 px-4 bg-[#0b1120]/95 border-b border-white/[0.06] select-none">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="w-3.5 h-3.5 rounded-[4px] bg-gradient-to-br from-cyan-400 to-blue-600 shrink-0" />
          <span className="text-xs font-medium text-slate-300 truncate">{title}</span>
        </div>
        <div className="flex items-center gap-0 text-slate-500 shrink-0">
          {/* minimize */}
          <span className="flex items-center justify-center w-10 h-7 hover:bg-white/5 rounded transition-colors">
            <svg width="10" height="10" viewBox="0 0 10 10"><line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
          {/* maximize */}
          <span className="flex items-center justify-center w-10 h-7 hover:bg-white/5 rounded transition-colors">
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1" /></svg>
          </span>
          {/* close */}
          <span className="flex items-center justify-center w-10 h-7 hover:bg-red-500/80 hover:text-white rounded transition-colors">
            <svg width="10" height="10" viewBox="0 0 10 10">
              <line x1="0" y1="0" x2="10" y2="10" stroke="currentColor" strokeWidth="1" />
              <line x1="10" y1="0" x2="0" y2="10" stroke="currentColor" strokeWidth="1" />
            </svg>
          </span>
        </div>
      </div>
      <div className={`bg-[#0a0f1d] ${bodyClassName}`}>{children}</div>
    </div>
  );
}
