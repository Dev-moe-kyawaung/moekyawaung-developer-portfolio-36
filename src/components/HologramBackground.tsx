import React, { useEffect, useRef } from "react";
import { useCanvas } from "../hooks/useCanvas";
import { HOLO, hexToRgba } from "../lib/hologramTheme";

/* ------------------------------------------------------------------ */
/*  OMNI-SPHERE HOLOGRAPHIC BACKGROUND                                */
/*  - Volumetric 3D stars (depth-rated)                                */
/*  - Volumetric light beams sweeping the sphere                       */
/*  - Recursive concentric data rings                                  */
/*  - Holographic flickering grid distortion                           */
/* ------------------------------------------------------------------ */

interface HologramStar {
  x: number;
  y: number;
  z: number; // depth 0-1
  size: number;
  color: string;
  twinkleSpeed: number;
  twinklePhase: number;
}

interface HologramRing {
  x: number;
  y: number;
  radius: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  height: number;
}

export const HologramBackground: React.FC = () => {
  const stars = useRef<HologramStar[] | null>(null);
  const rings = useRef<HologramRing[] | null>(null);
  const beams = useRef<{ a: number; speed: number; hue: string }[]>([
    { a: 0, speed: 0.18, hue: HOLO.cyan },
    { a: Math.PI * 0.6, speed: -0.12, hue: HOLO.violet },
    { a: Math.PI * 1.3, speed: 0.22, hue: HOLO.magenta },
  ]);

  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const canvasRef = useCanvas((ctx, w, h, t) => {
    if (w < 40) return;
    ctx.clearRect(0, 0, w, h);

    // Smooth pointer interpolation
    mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.04;
    mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.04;

    // 1. Volumetric deep space gradient
    const bg = ctx.createRadialGradient(
      w * 0.5 + mouse.current.x * 20,
      h * 0.55 + mouse.current.y * 20,
      0,
      w * 0.5,
      h * 0.55,
      Math.max(w, h) * 0.85
    );
    bg.addColorStop(0, hexToRgba(HOLO.cyan, 0.08));
    bg.addColorStop(0.5, "#03061a");
    bg.addColorStop(1, "#01030c");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // 2. Init stars
    if (!stars.current) {
      const colors = [HOLO.cyan, HOLO.violet, HOLO.magenta, HOLO.amber, HOLO.lumen];
      stars.current = Array.from({ length: 180 }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: 0.2 + Math.random() * 0.8,
        size: 0.4 + Math.random() * 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        twinkleSpeed: 0.5 + Math.random() * 2,
        twinklePhase: Math.random() * Math.PI * 2,
      }));
    }
    if (!rings.current) {
      rings.current = [
        { x: w * 0.5, y: h * 0.55, radius: Math.min(w, h) * 0.42, color: HOLO.cyan, rotation: 0, rotationSpeed: 0.08, height: 30 },
        { x: w * 0.5, y: h * 0.55, radius: Math.min(w, h) * 0.32, color: HOLO.violet, rotation: 0, rotationSpeed: -0.12, height: 18 },
        { x: w * 0.5, y: h * 0.55, radius: Math.min(w, h) * 0.22, color: HOLO.magenta, rotation: 0, rotationSpeed: 0.18, height: 12 },
      ];
    }

    // 3. Draw volumetric stars with depth scaling
    for (const s of stars.current) {
      const parallaxX = mouse.current.x * 20 * s.z;
      const parallaxY = mouse.current.y * 20 * s.z;
      const x = s.x + parallaxX;
      const y = s.y + parallaxY;
      const size = s.size * s.z * 1.2;
      const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);

      // Outer glow
      ctx.fillStyle = hexToRgba(s.color, twinkle * 0.3 * s.z);
      ctx.beginPath();
      ctx.arc(x, y, size * 3, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = hexToRgba(s.color, twinkle);
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    // 4. Draw data rings (3D perspective ellipses with light data points)
    for (const r of rings.current) {
      r.rotation += r.rotationSpeed * 0.016;

      const x = r.x + mouse.current.x * 10;
      const y = r.y + mouse.current.y * 10;
      const tilt = Math.sin(t * 0.3 + r.rotation) * 0.4;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(tilt);
      ctx.scale(1, Math.cos(tilt + r.rotation * 0.4) * 0.25 + 0.4);

      // Outer hollow ring
      ctx.strokeStyle = hexToRgba(r.color, 0.4);
      ctx.lineWidth = 1.2;
      ctx.setLineDash([4, 8]);
      ctx.beginPath();
      ctx.arc(0, 0, r.radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Data points along ring
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + r.rotation;
        const dx = Math.cos(angle) * r.radius;
        const dy = Math.sin(angle) * r.radius;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + i);
        ctx.fillStyle = hexToRgba(r.color, pulse);
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(dx, dy, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      ctx.restore();
    }

    // 5. Volumetric light beams sweeping
    for (const b of beams.current) {
      b.a += b.speed * 0.016;
      const cx = w * 0.5 + mouse.current.x * 30;
      const cy = h * 0.55 + mouse.current.y * 30;
      const len = Math.max(w, h) * 0.9;
      const x1 = cx + Math.cos(b.a) * len;
      const y1 = cy + Math.sin(b.a) * len;
      const x2 = cx - Math.cos(b.a) * len;
      const y2 = cy - Math.sin(b.a) * len;

      const grad = ctx.createLinearGradient(x1, y1, x2, y2);
      grad.addColorStop(0, hexToRgba(b.hue, 0));
      grad.addColorStop(0.5, hexToRgba(b.hue, 0.18));
      grad.addColorStop(1, hexToRgba(b.hue, 0));
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Beam head glow
      const headX = cx + Math.cos(b.a) * (len * 0.4);
      const headY = cy + Math.sin(b.a) * (len * 0.4);
      const headGlow = ctx.createRadialGradient(headX, headY, 0, headX, headY, 40);
      headGlow.addColorStop(0, hexToRgba(b.hue, 0.45));
      headGlow.addColorStop(1, hexToRgba(b.hue, 0));
      ctx.fillStyle = headGlow;
      ctx.beginPath();
      ctx.arc(headX, headY, 40, 0, Math.PI * 2);
      ctx.fill();
    }

    // 6. Central radial halo behind everything
    const halo = ctx.createRadialGradient(w * 0.5, h * 0.55, 0, w * 0.5, h * 0.55, Math.min(w, h) * 0.45);
    halo.addColorStop(0, hexToRgba(HOLO.cyan, 0.12));
    halo.addColorStop(0.4, hexToRgba(HOLO.violet, 0.05));
    halo.addColorStop(1, "transparent");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, w, h);
  });

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
