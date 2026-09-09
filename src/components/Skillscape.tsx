import React from "react";
import { Award, Sparkles } from "lucide-react";
import { SPHERE_SKILLS } from "../data/hologramData";
import { hologramAudio } from "../lib/hologramAudio";

export const Skillscape: React.FC = () => {
  return (
    <section id="skills" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff5cf3]/10 border border-[#ff5cf3]/40 rounded-full font-mono text-xs text-[#ff5cf3] tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#ff5cf3] animate-pulse" />
            <span>SKILLSCAPE // 14 CALIBRATED STRATA</span>
          </div>
          <h2 className="holo-text text-3xl sm:text-5xl font-black tracking-tight">
            ARCHITECTURE STACK
          </h2>
          <p className="font-body text-xl text-[#98a5c4] max-w-xl mt-2 italic">
            Technical skill density measured by signal strength across the entire operating stack.
          </p>
        </div>

        {/* Total Badge Plaque */}
        <div className="holo-panel px-5 py-3 rounded-2xl flex items-center gap-3 border border-[#4ad8ff]/40">
          <Award className="w-6 h-6 text-[#ffd500]" />
          <div>
            <span className="font-display text-xl font-bold text-white block">82+ CERTIFICATES</span>
            <span className="font-mono text-[9px] text-[#4ad8ff] block tracking-wider">PROGRAMMING HUB // 9 DOMAINS</span>
          </div>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {SPHERE_SKILLS.map((s) => (
          <div
            key={s.name}
            onMouseEnter={() => hologramAudio.uiTick()}
            className="holo-panel rounded-2xl p-4 border border-[#4ad8ff]/25 hover:border-[#4ad8ff] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(74,216,255,0.35)] group relative overflow-hidden"
          >
            {/* Dynamic background gradient halo */}
            <div
              className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              style={{ background: s.hue }}
            />

            <div className="flex items-start justify-between gap-2 mb-2 relative z-10">
              <div>
                <span className="font-tech text-base font-bold text-white group-hover:text-[#4ad8ff] transition">
                  {s.name}
                </span>
                <span className="font-mono text-[8px] text-[#4ad8ff] block tracking-wider mt-0.5">
                  {s.domain}
                </span>
              </div>
              <span className="font-mono text-xs font-bold text-white shrink-0">
                {Math.round(s.strength * 100)}%
              </span>
            </div>

            {/* Holographic Signal Bar */}
            <div className="w-full h-2.5 bg-[#020410] rounded-full border border-[#4ad8ff]/30 overflow-hidden p-0.5 my-3 relative z-10">
              <div
                className="h-full rounded-full transition-all duration-700 shadow-[0_0_8px_#4ad8ff]"
                style={{
                  width: `${s.strength * 100}%`,
                  background: `linear-gradient(90deg, #4ad8ff, ${s.hue}, #ff5cf3)`,
                }}
              />
            </div>

            <div className="flex items-center justify-between font-mono text-[10px] text-[#98a5c4] relative z-10">
              <span>SIGNAL: <strong className="text-white">{Math.round(s.strength * 100)}%</strong></span>
              <span className="text-[#4ad8ff]">SUPERCRITICAL</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
