import React from "react";
import { Sparkles, Cpu, Radio, ArrowDown } from "lucide-react";
import { PROFILE_DATA } from "../data/hologramData";
import { hologramAudio } from "../lib/hologramAudio";
import { hexToRgba, HOLO } from "../lib/hologramTheme";

export const HologramHero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-4 pt-28 pb-20 overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* Background Energy Radiance */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[150px] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${hexToRgba(HOLO.cyan, 0.18)}, ${hexToRgba(
            HOLO.violet,
            0.1
          )}, transparent 70%)`,
        }}
      />

      {/* Active Connection Telemetry */}
      <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a1133]/80 border border-[#4ad8ff]/60 shadow-[0_0_20px_rgba(74,216,255,0.45)] mb-8 hologram-flicker">
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4ad8ff] opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#9d6bff]" />
        </span>
        <span className="font-mono text-[10px] sm:text-xs tracking-[0.3em] text-[#4ad8ff] font-bold">
          {PROFILE_DATA.status}
        </span>
      </div>

      {/* Geographic / Cultural Tag */}
      <p className="font-mono text-sm sm:text-base tracking-[0.4em] text-[#9d6bff] mb-2 uppercase">
        // {PROFILE_DATA.nameMm} // TACHILEIK ⇄ BANGKOK //
      </p>

      {/* Giant Hologram Title */}
      <h1 className="holo-text text-5xl sm:text-7xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-4">
        MOE KYAW AUNG
      </h1>

      {/* Role Subtitle */}
      <div className="flex items-center justify-center gap-4 my-2 max-w-4xl mx-auto">
        <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#4ad8ff]" />
        <h2 className="font-tech text-base sm:text-2xl text-[#4ad8ff] font-bold tracking-[0.25em] uppercase">
          Senior Android &amp; Hologram Engineer
        </h2>
        <span className="h-[2px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#4ad8ff]" />
      </div>

      {/* Mission Statement */}
      <p className="font-body text-xl sm:text-2xl text-[#cad6f2] max-w-2xl mx-auto my-6 leading-relaxed italic">
        “Forging layered 3D Android systems in Kotlin, Jetpack Compose &amp; Clean Architecture — projected through high-resolution on-device AI.”
      </p>

      {/* Central Hologram Sphere with Cloudinary Portrait */}
      <div
        className="relative my-8 flex items-center justify-center"
        style={{ transform: "rotateX(8deg) rotateY(0deg)" }}
      >
        {/* Outer rotating data rings */}
        <div className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-dashed border-[#4ad8ff]/40 animate-spin-slow pointer-events-none" />
        <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-[#9d6bff]/25 animate-spin-slower pointer-events-none" />
        <div className="absolute w-80 h-80 sm:w-96 sm:h-96 rounded-full border border-[#ff5cf3]/15 animate-spin-slow pointer-events-none" style={{ animationDuration: "32s", animationDirection: "reverse" }} />

        {/* Sphere Orbital Beads */}
        <span className="absolute w-64 h-64 sm:w-72 sm:h-72 animate-spin-slow">
          <span className="absolute top-0 left-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4ad8ff] shadow-[0_0_12px_#4ad8ff]" />
        </span>
        <span className="absolute w-72 h-72 sm:w-80 sm:h-80 animate-spin-slower">
          <span className="absolute bottom-0 left-1/2 w-2 h-2 -translate-x-1/2 translate-y-1/2 rounded-full bg-[#9d6bff] shadow-[0_0_10px_#9d6bff]" />
        </span>

        {/* Central Portrait Sphere */}
        <div className="relative z-10 w-48 h-48 sm:w-56 sm:h-56 rounded-full p-1.5 bg-gradient-to-tr from-[#4ad8ff] via-[#9d6bff] to-[#ff5cf3] shadow-[0_0_60px_rgba(74,216,255,0.6)] hologram-flicker">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#4ad8ff] bg-[#020410] relative">
            <img
              src={PROFILE_DATA.avatar}
              alt={PROFILE_DATA.name}
              className="w-full h-full object-cover filter contrast-110 brightness-105"
            />
            {/* Scanline overlay */}
            <div className="absolute inset-0 moire-overlay opacity-50 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020410]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2 inset-x-0 text-center font-mono text-[9px] tracking-[0.3em] text-[#4ad8ff]">
              MKA-86 // HOLOGRAM OS
            </div>
          </div>
        </div>

        {/* Floating Coordinate Readouts */}
        <div className="absolute -left-6 sm:-left-16 top-8 holo-panel rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-wider text-[#4ad8ff] hidden xs:block">
          DEPTH: 0.99m
        </div>
        <div className="absolute -right-6 sm:-right-16 bottom-6 holo-panel rounded-xl px-3 py-1.5 font-mono text-[10px] tracking-wider text-[#ff5cf3] hidden xs:block">
          AI LATENCY: 38MS
        </div>
      </div>

      {/* Telemetry Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 my-6 w-full max-w-4xl">
        <div className="holo-panel p-4 rounded-2xl text-center border-t-2 border-[#4ad8ff]">
          <Sparkles className="w-5 h-5 text-[#4ad8ff] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">16+</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#4ad8ff] mt-0.5">HOLOGRAM NODES</p>
        </div>
        <div className="holo-panel p-4 rounded-2xl text-center border-t-2 border-[#9d6bff]">
          <Cpu className="w-5 h-5 text-[#9d6bff] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">82+</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#9d6bff] mt-0.5">LATTICE CERTIFICATES</p>
        </div>
        <div className="holo-panel p-4 rounded-2xl text-center border-t-2 border-[#ff5cf3]">
          <Radio className="w-5 h-5 text-[#ff5cf3] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">9</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#ff5cf3] mt-0.5">SPHERE DOMAINS</p>
        </div>
        <div className="holo-panel p-4 rounded-2xl text-center border-t-2 border-[#ffb84a]">
          <Sparkles className="w-5 h-5 text-[#ffb84a] mx-auto mb-1" />
          <p className="font-display text-3xl font-black text-white">3+</p>
          <p className="font-mono text-[9px] tracking-[0.25em] text-[#ffb84a] mt-0.5">YEARS ACTIVE</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <a
          href="#omni-sphere"
          onClick={() => hologramAudio.hologramRise()}
          className="px-7 py-4 bg-gradient-to-r from-[#4ad8ff] via-[#9d6bff] to-[#ff5cf3] hover:brightness-110 text-white font-tech text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl shadow-[0_0_30px_rgba(74,216,255,0.6)] flex items-center gap-2.5 transform hover:-translate-y-1 transition duration-300"
        >
          <Sparkles className="w-4 h-4 text-white" />
          <span>ENTER THE OMNI-SPHERE</span>
        </a>
        <a
          href="#entity"
          onClick={() => hologramAudio.harmoChime()}
          className="px-7 py-4 bg-[#050a25] hover:bg-[#0a1133] border-2 border-[#ff5cf3]/60 text-[#ff5cf3] font-tech text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl shadow-[0_0_20px_rgba(255,92,243,0.3)] flex items-center gap-2.5 transform hover:-translate-y-1 transition duration-300"
        >
          <Cpu className="w-4 h-4 text-[#ff5cf3]" />
          <span>SUMMON HOLOGRAM ENTITY</span>
        </a>
        <a
          href="#contact"
          onClick={() => hologramAudio.uiTick()}
          className="px-6 py-4 bg-[#020410] border border-[#4ad8ff]/40 text-[#cad6f2] hover:border-[#4ad8ff] font-tech text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl flex items-center gap-2 transition"
        >
          <Radio className="w-4 h-4 text-[#4ad8ff]" />
          <span>OPEN TRANSMISSION</span>
        </a>
      </div>

      {/* Active Mission Ticker Strip */}
      <div className="mt-12 w-full max-w-3xl holo-panel rounded-2xl p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-left border-l-4 border-[#4ad8ff]">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#4ad8ff]/20 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 text-[#4ad8ff] animate-pulse" />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#4ad8ff]">ACTIVE MISSION // LIVE LATTICE</p>
            <p className="font-tech text-sm sm:text-base font-bold text-white truncate">
              {PROFILE_DATA.currentMission}
            </p>
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2 font-mono text-[10px] text-[#9d6bff] bg-[#020410] px-3 py-1.5 rounded-lg border border-[#9d6bff]/30">
          <Radio className="w-3.5 h-3.5 text-[#4ad8ff]" />
          <span>2 NODES // 4 LAYERS</span>
        </div>
      </div>

      {/* Scroll Cue */}
      <a
        href="#omni-sphere"
        onClick={() => hologramAudio.uiTick()}
        className="mt-12 flex flex-col items-center gap-1.5 font-mono text-[9px] tracking-[0.35em] text-[#5b6890] hover:text-[#4ad8ff] transition"
      >
        <span>INITIATE 3D DESCENT</span>
        <ArrowDown className="w-4 h-4 text-[#4ad8ff] animate-bounce" />
      </a>
    </section>
  );
};
