import { useEffect, useRef } from "react";

export type ChartMode = "line" | "area" | "bars";

interface LiveChartProps {
  mode?: ChartMode;
  streaming?: boolean;
  /** show hover crosshair + tooltip */
  interactive?: boolean;
  className?: string;
}

const POINTS = 72;
const TICK_MS = 900;

function rand(seedRef: { v: number }) {
  // deterministic-ish LCG so both charts look intentional, not chaotic
  seedRef.v = (seedRef.v * 1664525 + 1013904223) % 4294967296;
  return seedRef.v / 4294967296;
}

/**
 * Canvas-rendered live chart. Data streams in on a tick; every point eases
 * toward its target each animation frame, so motion is butter-smooth.
 */
export function LiveChart({ mode = "area", streaming = true, interactive = false, className = "" }: LiveChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modeRef = useRef(mode);
  modeRef.current = mode;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rng = { v: 20240917 };

    let current: number[] = [];
    let target: number[] = [];
    let v = 50;
    for (let i = 0; i < POINTS; i++) {
      v += (rand(rng) - 0.48) * 9;
      v = Math.max(12, Math.min(92, v));
      current.push(v);
      target.push(v);
    }

    const mouse = { x: -1, y: -1, inside: false };
    let raf = 0;
    let lastTick = performance.now();
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.inside = true;
    };
    const onLeave = () => {
      mouse.inside = false;
    };
    if (interactive) {
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);
    }

    const ACCENT = "#22d3ee";
    const ACCENT2 = "#818cf8";

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);

      if (streaming && now - lastTick > TICK_MS) {
        lastTick = now;
        const last = target[target.length - 1];
        let nv = last + (rand(rng) - 0.48) * 11;
        nv = Math.max(10, Math.min(94, nv));
        target.push(nv);
        target.shift();
        current.push(nv - (rand(rng) - 0.5) * 24);
        current.shift();
      }

      // ease current toward target
      for (let i = 0; i < current.length; i++) {
        current[i] += (target[i] - current[i]) * 0.09;
      }

      ctx.clearRect(0, 0, width, height);

      const padL = 8;
      const padR = 8;
      const padT = 14;
      const padB = 10;
      const plotW = width - padL - padR;
      const plotH = height - padT - padB;
      const n = current.length;
      const stepX = plotW / (n - 1);

      const xAt = (i: number) => padL + i * stepX;
      const yAt = (val: number) => padT + plotH - (val / 100) * plotH;

      // grid
      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g++) {
        const gy = padT + (plotH / 4) * g;
        ctx.beginPath();
        ctx.moveTo(padL, gy);
        ctx.lineTo(width - padR, gy);
        ctx.stroke();
      }

      const m = modeRef.current;

      if (m === "bars") {
        const bw = Math.max(2, stepX * 0.55);
        for (let i = 0; i < n; i++) {
          const x = xAt(i) - bw / 2;
          const y = yAt(current[i]);
          const h = padT + plotH - y;
          const grad = ctx.createLinearGradient(0, y, 0, y + h);
          grad.addColorStop(0, i === n - 1 ? "#67e8f9" : "rgba(34, 211, 238, 0.85)");
          grad.addColorStop(1, "rgba(59, 130, 246, 0.12)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          const r = Math.min(3, bw / 2);
          ctx.roundRect(x, y, bw, h, [r, r, 0, 0]);
          ctx.fill();
        }
      } else {
        // path
        const path = new Path2D();
        path.moveTo(xAt(0), yAt(current[0]));
        for (let i = 1; i < n; i++) {
          const x0 = xAt(i - 1);
          const y0 = yAt(current[i - 1]);
          const x1 = xAt(i);
          const y1 = yAt(current[i]);
          const cx = (x0 + x1) / 2;
          path.bezierCurveTo(cx, y0, cx, y1, x1, y1);
        }

        if (m === "area") {
          const fill = new Path2D(path);
          fill.lineTo(xAt(n - 1), padT + plotH);
          fill.lineTo(xAt(0), padT + plotH);
          fill.closePath();
          const grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
          grad.addColorStop(0, "rgba(34, 211, 238, 0.30)");
          grad.addColorStop(0.6, "rgba(59, 130, 246, 0.10)");
          grad.addColorStop(1, "rgba(59, 130, 246, 0)");
          ctx.fillStyle = grad;
          ctx.fill(fill);
        }

        ctx.save();
        ctx.shadowColor = "rgba(34, 211, 238, 0.55)";
        ctx.shadowBlur = 12;
        ctx.strokeStyle = ACCENT;
        ctx.lineWidth = 2;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke(path);
        ctx.restore();

        // secondary ghost line (comparison series)
        const ghost = new Path2D();
        ghost.moveTo(xAt(0), yAt(current[0] * 0.72 + 12));
        for (let i = 1; i < n; i++) {
          const val = current[i] * 0.72 + 12;
          ghost.lineTo(xAt(i), yAt(val));
        }
        ctx.strokeStyle = "rgba(129, 140, 248, 0.35)";
        ctx.lineWidth = 1.25;
        ctx.setLineDash([4, 5]);
        ctx.stroke(ghost);
        ctx.setLineDash([]);

        // latest point pulse
        const lx = xAt(n - 1);
        const ly = yAt(current[n - 1]);
        const pulse = (now % 1600) / 1600;
        ctx.beginPath();
        ctx.arc(lx, ly, 4 + pulse * 10, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${0.25 * (1 - pulse)})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(lx, ly, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#67e8f9";
        ctx.fill();
      }

      // hover crosshair + tooltip
      if (interactive && mouse.inside) {
        const idx = Math.max(0, Math.min(n - 1, Math.round((mouse.x - padL) / stepX)));
        const cx = xAt(idx);
        const cy = yAt(current[idx]);

        ctx.strokeStyle = "rgba(226, 232, 240, 0.25)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 4]);
        ctx.beginPath();
        ctx.moveTo(cx, padT);
        ctx.lineTo(cx, padT + plotH);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.beginPath();
        ctx.arc(cx, cy, 4.5, 0, Math.PI * 2);
        ctx.fillStyle = ACCENT2;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 1.5;
        ctx.stroke();

        const label = current[idx].toFixed(1);
        ctx.font = "11px 'JetBrains Mono', monospace";
        const tw = ctx.measureText(label).width;
        const boxW = tw + 16;
        const boxH = 22;
        let bx = cx + 10;
        if (bx + boxW > width - 4) bx = cx - boxW - 10;
        const by = Math.max(4, cy - boxH - 10);
        ctx.fillStyle = "rgba(10, 15, 29, 0.92)";
        ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(bx, by, boxW, boxH, 5);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#e2e8f0";
        ctx.fillText(label, bx + 8, by + 15);
      }
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      if (interactive) {
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
      }
    };
  }, [streaming, interactive]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
}
