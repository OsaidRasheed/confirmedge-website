import { useEffect, useRef } from "react";

export type SpcVariant = "control" | "capability";

interface SpcChartProps {
  variant: SpcVariant;
  streaming?: boolean;
  className?: string;
}

const TICK_MS = 900;
const POINTS = 42;

// control limits for a process centered at 50 with sigma = 8
const CL = 50;
const SIGMA = 8;
const UCL = CL + 3 * SIGMA;
const LCL = CL - 3 * SIGMA;

function mulberry(seed: { v: number }) {
  seed.v = (seed.v * 1664525 + 1013904223) >>> 0;
  return seed.v / 4294967296;
}

/** Box–Muller normal sample */
function normal(rng: { v: number }, mu: number, sigma: number) {
  const u = Math.max(mulberry(rng), 1e-9);
  const v = mulberry(rng);
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/**
 * SPC visuals rendered on canvas:
 * - "control": streaming X̄ control chart with UCL / CL / LCL and violation highlighting
 * - "capability": process-capability histogram with normal fit, LSL / USL and Cpk readout
 */
export function SpcChart({ variant, streaming = true, className = "" }: SpcChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rng = { v: 987654321 };

    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;

    // ---------------------------------------------------------------- control
    if (variant === "control") {
      let current: number[] = [];
      let target: number[] = [];
      let walk = CL;
      const nextValue = () => {
        // random walk with mean reversion → realistic process behavior
        walk += normal(rng, 0, SIGMA * 0.35) + (CL - walk) * 0.12;
        if (mulberry(rng) < 0.035) {
          // occasional special-cause violation
          walk = mulberry(rng) < 0.5 ? UCL + 2 + mulberry(rng) * 4 : LCL - 2 - mulberry(rng) * 4;
        }
        return walk;
      };
      for (let i = 0; i < POINTS; i++) {
        const v = nextValue();
        current.push(v);
        target.push(v);
      }

      const mouse = { x: -1, inside: false };
      const onMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.inside = true;
      };
      const onLeave = () => {
        mouse.inside = false;
      };
      canvas.addEventListener("mousemove", onMove);
      canvas.addEventListener("mouseleave", onLeave);

      let lastTick = performance.now();
      const YMIN = 18;
      const YMAX = 82;

      const draw = (now: number) => {
        raf = requestAnimationFrame(draw);

        if (streaming && now - lastTick > TICK_MS) {
          lastTick = now;
          const nv = nextValue();
          target.push(nv);
          target.shift();
          current.push(current[current.length - 1]);
          current.shift();
        }
        for (let i = 0; i < current.length; i++) {
          current[i] += (target[i] - current[i]) * 0.12;
        }

        ctx.clearRect(0, 0, width, height);
        const padL = 14;
        const padR = 52;
        const padT = 16;
        const padB = 14;
        const plotW = width - padL - padR;
        const plotH = height - padT - padB;
        const n = current.length;
        const stepX = plotW / (n - 1);
        const xAt = (i: number) => padL + i * stepX;
        const yAt = (v: number) => padT + plotH - ((v - YMIN) / (YMAX - YMIN)) * plotH;

        // in-control band
        ctx.fillStyle = "rgba(34, 211, 238, 0.045)";
        ctx.fillRect(padL, yAt(UCL), plotW, yAt(LCL) - yAt(UCL));

        // limit lines
        const limits: { v: number; label: string; color: string; dash: number[] }[] = [
          { v: UCL, label: "UCL", color: "rgba(248, 113, 113, 0.75)", dash: [7, 5] },
          { v: CL, label: "CL", color: "rgba(148, 163, 184, 0.55)", dash: [2, 4] },
          { v: LCL, label: "LCL", color: "rgba(248, 113, 113, 0.75)", dash: [7, 5] },
        ];
        ctx.font = "10px 'JetBrains Mono', monospace";
        limits.forEach((l) => {
          const y = yAt(l.v);
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 1;
          ctx.setLineDash(l.dash);
          ctx.beginPath();
          ctx.moveTo(padL, y);
          ctx.lineTo(padL + plotW, y);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.fillStyle = l.color;
          ctx.fillText(`${l.label} ${l.v}`, padL + plotW + 6, y + 3);
        });

        // series line
        ctx.beginPath();
        ctx.moveTo(xAt(0), yAt(current[0]));
        for (let i = 1; i < n; i++) ctx.lineTo(xAt(i), yAt(current[i]));
        ctx.strokeStyle = "rgba(34, 211, 238, 0.8)";
        ctx.lineWidth = 1.5;
        ctx.lineJoin = "round";
        ctx.stroke();

        // points — red when beyond limits
        for (let i = 0; i < n; i++) {
          const v = current[i];
          const violation = v > UCL || v < LCL;
          ctx.beginPath();
          ctx.arc(xAt(i), yAt(v), violation ? 4 : 2.5, 0, Math.PI * 2);
          if (violation) {
            ctx.fillStyle = "#f87171";
            ctx.shadowColor = "rgba(248, 113, 113, 0.7)";
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fillStyle = i === n - 1 ? "#67e8f9" : "rgba(34, 211, 238, 0.9)";
            ctx.fill();
          }
        }

        // hover readout
        if (mouse.inside) {
          const idx = Math.max(0, Math.min(n - 1, Math.round((mouse.x - padL) / stepX)));
          const cx = xAt(idx);
          const cy = yAt(current[idx]);
          ctx.strokeStyle = "rgba(226, 232, 240, 0.2)";
          ctx.setLineDash([3, 4]);
          ctx.beginPath();
          ctx.moveTo(cx, padT);
          ctx.lineTo(cx, padT + plotH);
          ctx.stroke();
          ctx.setLineDash([]);

          const label = current[idx].toFixed(1);
          ctx.font = "11px 'JetBrains Mono', monospace";
          const tw = ctx.measureText(label).width;
          let bx = cx + 10;
          if (bx + tw + 16 > width - 4) bx = cx - tw - 26;
          const by = Math.max(4, cy - 32);
          ctx.fillStyle = "rgba(10, 15, 29, 0.92)";
          ctx.strokeStyle = "rgba(148, 163, 184, 0.3)";
          ctx.beginPath();
          ctx.roundRect(bx, by, tw + 16, 22, 5);
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
        canvas.removeEventListener("mousemove", onMove);
        canvas.removeEventListener("mouseleave", onLeave);
      };
    }

    // ------------------------------------------------------------ capability
    const MU = 50.6;
    const S = 3.2;
    const LSL = 36;
    const USL = 64;
    const samples: number[] = [];
    for (let i = 0; i < 400; i++) samples.push(normal(rng, MU, S));

    const BIN_MIN = 32;
    const BIN_MAX = 68;
    const BINS = 24;
    const binW = (BIN_MAX - BIN_MIN) / BINS;
    const counts = new Array(BINS).fill(0);
    samples.forEach((s) => {
      const b = Math.floor((s - BIN_MIN) / binW);
      if (b >= 0 && b < BINS) counts[b]++;
    });
    const maxCount = Math.max(...counts);

    const cpk = Math.min(USL - MU, MU - LSL) / (3 * S);
    const start = performance.now();
    const DUR = 900;

    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const t = Math.min(1, (now - start) / DUR);
      const ease = 1 - Math.pow(1 - t, 3);

      ctx.clearRect(0, 0, width, height);
      const padL = 14;
      const padR = 14;
      const padT = 34;
      const padB = 26;
      const plotW = width - padL - padR;
      const plotH = height - padT - padB;
      const xAt = (v: number) => padL + ((v - BIN_MIN) / (BIN_MAX - BIN_MIN)) * plotW;
      const yAt = (c: number) => padT + plotH - (c / maxCount) * plotH * 0.92;

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

      // spec-limit shading outside LSL/USL
      ctx.fillStyle = "rgba(248, 113, 113, 0.06)";
      ctx.fillRect(padL, padT, xAt(LSL) - padL, plotH);
      ctx.fillRect(xAt(USL), padT, padL + plotW - xAt(USL), plotH);

      // histogram bars
      for (let i = 0; i < BINS; i++) {
        const x = padL + (i / BINS) * plotW + 1;
        const w = plotW / BINS - 2;
        const y = yAt(counts[i] * ease);
        const grad = ctx.createLinearGradient(0, y, 0, padT + plotH);
        grad.addColorStop(0, "rgba(34, 211, 238, 0.85)");
        grad.addColorStop(1, "rgba(59, 130, 246, 0.15)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, w, padT + plotH - y, [2, 2, 0, 0]);
        ctx.fill();
      }

      // normal-fit curve
      ctx.beginPath();
      for (let px = 0; px <= plotW; px += 2) {
        const v = BIN_MIN + (px / plotW) * (BIN_MAX - BIN_MIN);
        const pdf = Math.exp(-((v - MU) ** 2) / (2 * S * S)) / (S * Math.sqrt(2 * Math.PI));
        const c = pdf * binW * samples.length * ease;
        const y = yAt(c);
        if (px === 0) ctx.moveTo(padL + px, y);
        else ctx.lineTo(padL + px, y);
      }
      ctx.save();
      ctx.shadowColor = "rgba(129, 140, 248, 0.6)";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "#818cf8";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();

      // spec limit lines
      ctx.font = "10px 'JetBrains Mono', monospace";
      [
        { v: LSL, label: `LSL ${LSL}` },
        { v: USL, label: `USL ${USL}` },
      ].forEach((l) => {
        const x = xAt(l.v);
        ctx.strokeStyle = "rgba(248, 113, 113, 0.75)";
        ctx.lineWidth = 1.25;
        ctx.setLineDash([6, 5]);
        ctx.beginPath();
        ctx.moveTo(x, padT);
        ctx.lineTo(x, padT + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(248, 113, 113, 0.9)";
        ctx.fillText(l.label, x - 18, padT + plotH + 16);
      });

      // x-axis labels
      ctx.fillStyle = "rgba(100, 116, 139, 0.8)";
      [BIN_MIN, MU, BIN_MAX].forEach((v) => {
        const x = xAt(v);
        const txt = String(Math.round(v));
        ctx.fillText(txt, x - 6, padT + plotH + 16);
      });

      // Cpk badge — green when capable (≥1.33), amber 1.0–1.33, red below
      const cpkLabel = `Cpk ${cpk.toFixed(2)}`;
      const capable = cpk >= 1.33;
      const marginal = cpk >= 1.0 && cpk < 1.33;
      const badgeFg = capable ? "#34d399" : marginal ? "#fbbf24" : "#f87171";
      const badgeBg = capable ? "rgba(16, 185, 129, 0.12)" : marginal ? "rgba(251, 191, 36, 0.12)" : "rgba(248, 113, 113, 0.12)";
      const badgeBd = capable ? "rgba(16, 185, 129, 0.45)" : marginal ? "rgba(251, 191, 36, 0.45)" : "rgba(248, 113, 113, 0.45)";
      ctx.font = "bold 12px 'JetBrains Mono', monospace";
      const tw = ctx.measureText(cpkLabel).width;
      const bx = width - padR - tw - 22;
      ctx.fillStyle = badgeBg;
      ctx.strokeStyle = badgeBd;
      ctx.beginPath();
      ctx.roundRect(bx, 10, tw + 22, 24, 6);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = badgeFg;
      ctx.fillText(cpkLabel, bx + 11, 26);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [variant, streaming]);

  return <canvas ref={canvasRef} className={`w-full h-full block ${className}`} />;
}
