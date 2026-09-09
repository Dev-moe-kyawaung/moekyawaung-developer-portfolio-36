import React, { useEffect, useRef } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { HOLO, hexToRgba } from "../lib/hologramTheme";

/**
 * Holographic targeting reticle cursor — rotates to follow the pointer
 * with a soft outer ring, crosshair ticks, and a center dot.
 */
export const HologramCursor: React.FC = () => {
  const state = useRef({ x: -999, y: -999, ax: -999, ay: -999, rot: 0, targetRot: 0, hovering: false, inside: false });
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    document.documentElement.classList.add("has-holo-cursor");

    const s = state.current;

    const onMove = (e: MouseEvent) => {
      s.x = e.clientX;
      s.y = e.clientY;
      s.inside = true;
      const target = e.target as HTMLElement | null;
      s.hovering = !!target?.closest("a, button, [role='button'], input, textarea");
    };
    const onLeave = () => { s.inside = false; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("has-holo-cursor");
    };
  }, []);

  const canvasRef = useCanvas((ctx, w, h) => {
    const s = state.current;
    ctx.clearRect(0, 0, w, h);
    if (!s.inside || document.hidden) return;

    // Damped follow position
    s.ax += (s.x - s.ax) * 0.35;
    s.ay += (s.y - s.ay) * 0.35;
    s.rot += (s.targetRot - s.rot) * 0.12;
    s.targetRot += 0.025;
    s.targetRot %= Math.PI * 2;

    const R = s.hovering ? 22 : 14;

    // Soft outer ring
    ctx.strokeStyle = hexToRgba(HOLO.cyan, s.hovering ? 0.55 : 0.32);
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(s.ax, s.ay, R, 0, Math.PI * 2);
    ctx.stroke();

    // Outer broken ring (rotating)
    ctx.save();
    ctx.translate(s.ax, s.ay);
    ctx.rotate(s.rot);
    ctx.strokeStyle = hexToRgba(HOLO.violet, 0.85);
    ctx.lineWidth = 1.8;
    ctx.setLineDash([5, 8]);
    ctx.beginPath();
    ctx.arc(0, 0, R + 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Counter-rotating accent ring
    ctx.rotate(-s.rot * 1.5);
    ctx.strokeStyle = hexToRgba(HOLO.magenta, 0.65);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, R - 6, 0, Math.PI * 2);
    ctx.stroke();

    // Crosshair ticks
    ctx.strokeStyle = hexToRgba(HOLO.lumen, 0.85);
    ctx.lineWidth = 1.4;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]] as const) {
      ctx.beginPath();
      ctx.moveTo(dx * R, dy * R);
      ctx.lineTo(dx * (R + 5), dy * (R + 5));
      ctx.stroke();
    }
    ctx.restore();

    // Glowing center dot
    const coreGlow = ctx.createRadialGradient(s.ax, s.ay, 0, s.ax, s.ay, 6);
    coreGlow.addColorStop(0, "rgba(255, 255, 255, 1)");
    coreGlow.addColorStop(0.5, hexToRgba(HOLO.cyan, 0.7));
    coreGlow.addColorStop(1, "rgba(74, 216, 255, 0)");
    ctx.fillStyle = coreGlow;
    ctx.beginPath();
    ctx.arc(s.ax, s.ay, 6, 0, Math.PI * 2);
    ctx.fill();
  });

  return (
    <canvas
      ref={(el) => {
        canvasRef.current = el;
        ref.current = el;
      }}
      className="pointer-events-none fixed inset-0 z-[200] hidden h-full w-full [@media(pointer:fine)]:block"
      aria-hidden="true"
    />
  );
};
