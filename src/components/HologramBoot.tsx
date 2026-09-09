import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Radio } from "lucide-react";
import { hologramAudio } from "../lib/hologramAudio";

const BOOT_SEQUENCE = [
  "> Booting omni-sphere OS // initializing lattice mesh …",
  "> Linking 3D sphere rotations across all 8 holographic nodes …",
  "> Engaging volumetric light shaders and depth-based transitions …",
  "> Activating multi-layer holographic case study panels …",
  "> Synchronizing with AI hologram entity (MKA-86) …",
  "> Calibrating layered frame stack … 100%",
  "> Omni-sphere stable. Welcome to the 3D space of Moe Kyaw Aung.",
];

/**
 * Boot sequence — loads the omni-sphere with a circular sweep, log
 * scrolling, and an audio chirp on completion.
 */
export const HologramBoot: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isDismounted, setIsDismounted] = useState(false);
  const isComplete = useRef(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const start = performance.now();
    const duration = 2200;
    let animId = 0;

    const finish = () => {
      if (isComplete.current) return;
      isComplete.current = true;
      setPercent(100);
      hologramAudio.systemChirp();
      setTimeout(() => {
        setIsFading(true);
        document.body.style.overflow = "";
        setTimeout(() => setIsDismounted(true), 600);
      }, 250);
    };

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setPercent(Math.round(eased * 100));

      if (progress < 1 && !isComplete.current) {
        animId = requestAnimationFrame(tick);
      } else {
        finish();
      }
    };

    animId = requestAnimationFrame(tick);
    const onSkip = () => finish();
    window.addEventListener("pointerdown", onSkip);
    window.addEventListener("keydown", onSkip);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("pointerdown", onSkip);
      window.removeEventListener("keydown", onSkip);
      document.body.style.overflow = "";
    };
  }, []);

  if (isDismounted) return null;

  const shownLogs = BOOT_SEQUENCE.slice(
    0,
    Math.min(BOOT_SEQUENCE.length, 1 + Math.floor((percent / 100) * BOOT_SEQUENCE.length))
  );

  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[#020410] transition-all duration-700 ${
        isFading ? "opacity-0 blur-xl scale-105 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={isFading}
    >
      {/* Background radial halo */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#4ad8ff]/15 via-[#9d6bff]/10 to-[#ff5cf3]/15 blur-[140px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-[min(92vw,520px)] px-4">
        {/* Circular Sweep Loader */}
        <div className="relative w-60 h-60 flex items-center justify-center mb-4">
          {/* Outer rotating rings */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-[#4ad8ff]/40 animate-spin-slow" />
          <div className="absolute inset-6 rounded-full border border-[#ff5cf3]/25 animate-spin-slower" />
          <div className="absolute inset-10 rounded-full border border-[#9d6bff]/20 animate-spin-slow" style={{ animationDuration: "20s", animationDirection: "reverse" }} />

          {/* SVG Progress Gauge */}
          <svg width={160} height={160} className="absolute -rotate-90">
            <circle cx="80" cy="80" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="none"
              stroke="url(#holoBootGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - (circumference * percent) / 100}
              style={{
                filter: "drop-shadow(0 0 14px rgba(74,216,255,0.8))",
                transition: "stroke-dashoffset 0.1s linear",
              }}
            />
            <defs>
              <linearGradient id="holoBootGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#4ad8ff" />
                <stop offset="50%" stopColor="#9d6bff" />
                <stop offset="100%" stopColor="#ff5cf3" />
              </linearGradient>
            </defs>
          </svg>

          {/* Center Readout */}
          <div className="text-center">
            <Sparkles className="w-7 h-7 text-[#4ad8ff] mx-auto animate-pulse" />
            <p className="font-display text-4xl font-black text-white tracking-wider mt-1">
              {percent}%
            </p>
            <p className="font-mono text-[8px] tracking-[0.35em] text-[#4ad8ff] mt-1">
              LATTICE FORMING
            </p>
          </div>
        </div>

        {/* Title Banner */}
        <p className="holo-text text-3xl sm:text-4xl font-black tracking-wider text-center">
          OMNI-SPHERE
        </p>
        <p className="font-mono text-[9px] tracking-[0.45em] text-[#9d6bff] text-center mt-1">
          HOLOGRAPHIC PORTFOLIO OS // OPERATOR VK-86
        </p>

        {/* Live Boot Log */}
        <div className="holo-panel-deep mt-6 min-h-[140px] w-full rounded-2xl p-4 font-mono text-[11px] leading-relaxed border border-[#4ad8ff]/30 shadow-[0_0_25px_rgba(74,216,255,0.15)]">
          {shownLogs.map((log, i) => (
            <p
              key={log}
              className={
                i === shownLogs.length - 1
                  ? "text-[#4ad8ff] hologram-flicker"
                  : "text-[#5b6890]"
              }
            >
              {log}
            </p>
          ))}
          <span className="inline-block w-2 h-3.5 bg-[#4ad8ff] ml-1 animate-pulse align-middle" />
        </div>

        <p className="font-mono text-[9px] tracking-[0.35em] text-[#5b6890] text-center mt-4 flex items-center justify-center gap-1.5">
          <Radio className="w-3 h-3 text-[#4ad8ff] animate-pulse" /> CLICK ANYWHERE TO SKIP BOOT
        </p>
      </div>
    </div>
  );
};
