import React, { useEffect, useState } from "react";
import { Sparkles, Volume2, VolumeX, Terminal, Activity } from "lucide-react";
import { NAV_LINKS, PROFILE_DATA } from "../data/hologramData";
import { hologramAudio } from "../lib/hologramAudio";

export const HologramNav: React.FC = () => {
  const [soundActive, setSoundActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setSoundActive(hologramAudio.enabled);
    const onAudio = (e: Event) => setSoundActive(!!(e as CustomEvent<boolean>).detail);
    const onScroll = () => setScrolled(window.scrollY > 40);

    window.addEventListener("holo:audio", onAudio);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("holo:audio", onAudio);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const toggleSound = () => {
    const next = hologramAudio.toggleSound();
    setSoundActive(next);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#020410]/90 backdrop-blur-xl border-[#4ad8ff]/30 shadow-[0_4px_30px_rgba(74,216,255,0.25)]"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Brand Mark */}
        <a
          href="#hero"
          onClick={() => hologramAudio.uiTick()}
          className="flex items-center gap-3 group"
        >
          {/* Geometric Reticle Logo */}
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-[#4ad8ff] via-[#9d6bff] to-[#ff5cf3] p-0.5 shadow-[0_0_15px_rgba(74,216,255,0.6)] group-hover:rotate-45 transition-transform duration-500">
              <div className="w-full h-full bg-[#020410] rounded-md flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-[#4ad8ff] animate-pulse" />
              </div>
            </div>
          </div>
          <div>
            <span className="font-display text-lg font-black tracking-wider text-white group-hover:text-[#4ad8ff] transition block leading-tight">
              OMNI<span className="text-[#4ad8ff]">·</span>SPHERE
            </span>
            <span className="font-mono text-[9px] tracking-[0.35em] text-[#9d6bff] block -mt-0.5">
              HOLOGRAPHIC PORTFOLIO
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 font-mono text-[11px] tracking-[0.22em]">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => hologramAudio.uiTick()}
              className="text-[#98a5c4] hover:text-[#4ad8ff] transition relative group py-1"
            >
              <span>{link.label.toUpperCase()}</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4ad8ff] to-[#ff5cf3] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_#4ad8ff]" />
            </a>
          ))}
        </nav>

        {/* Right HUD Panel */}
        <div className="flex items-center gap-3">
          {/* Telemetry Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#050a25]/90 border border-[#4ad8ff]/40 font-mono text-[10px] tracking-wider text-[#4ad8ff] shadow-[0_0_12px_rgba(74,216,255,0.25)]">
            <Activity className="w-3.5 h-3.5 text-[#4ad8ff] animate-pulse" />
            <span className="font-bold text-white">{PROFILE_DATA.omniTelemetry.neuralFlux}</span>
            <span className="text-[#5b6890]">|</span>
            <span className="text-[#9d6bff]">{PROFILE_DATA.omniTelemetry.depthFactor}</span>
          </div>

          {/* Audio Toggle */}
          <button
            onClick={toggleSound}
            title="Toggle Hologram Audio Engine"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-mono text-[10px] tracking-wider transition ${
              soundActive
                ? "bg-[#4ad8ff]/20 border-[#4ad8ff] text-[#4ad8ff] shadow-[0_0_15px_rgba(74,216,255,0.5)]"
                : "bg-[#0a1133] border-[#252e4a] text-[#6c7a9a] hover:border-[#4ad8ff] hover:text-white"
            }`}
          >
            {soundActive ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden md:inline">{soundActive ? "OS: ON" : "OS: OFF"}</span>
          </button>

          {/* Command Deck Shortcut */}
          <button
            onClick={() => window.dispatchEvent(new Event("holo:palette"))}
            title="Launch Hologram Command Deck (Ctrl+K)"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#ff5cf3]/30 bg-[#0a1133] hover:border-[#ff5cf3] text-[#ff5cf3] font-mono text-[10px] tracking-wider transition shadow-[0_0_10px_rgba(255,92,243,0.2)]"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff5cf3]" />
            <span>CTRL K</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Strip */}
      <nav className="no-scrollbar flex lg:hidden gap-5 overflow-x-auto border-t border-[#4ad8ff]/20 px-4 py-2 bg-[#020410]/95 backdrop-blur">
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={() => hologramAudio.uiTick()}
            className="whitespace-nowrap font-mono text-[10px] tracking-[0.2em] text-[#98a5c4] hover:text-[#4ad8ff]"
          >
            {link.label.toUpperCase()}
          </a>
        ))}
      </nav>
    </header>
  );
};
