import React, { useState } from "react";
import { FolderGit2, ChevronRight, X, Layers } from "lucide-react";
import { HOLO_NODES, type HologramNode } from "../data/hologramData";
import { SPHERE_TIERS } from "../lib/hologramTheme";
import { hologramAudio } from "../lib/hologramAudio";

/* ------------------------------------------------------------------ */
/*  OMNI-SPHERE                                                       */
/*  Projects are holographic nodes orbiting the central subject          */
/*  portrait. Tier dictates orbit radius, scale, Z depth, and color.    */
/*  Selecting a node opens a multi-layer 3D depth case study panel.     */
/* ------------------------------------------------------------------ */

const TIER_RADIUS: Record<string, number> = { CORE: 140, UPPER_ORBIT: 200, MID_ORBIT: 260, OUTER_RING: 310 };

export const OmniSphere: React.FC = () => {
  const [selected, setSelected] = useState<HologramNode | null>(null);

  const openNode = (n: HologramNode) => {
    hologramAudio.hologramRise();
    setSelected(n);
  };

  const closeNode = () => {
    hologramAudio.subChord();
    setSelected(null);
  };

  return (
    <section id="omni-sphere" className="relative z-10 py-24 px-4 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#4ad8ff]/10 border border-[#4ad8ff]/30 rounded-full font-mono text-xs text-[#4ad8ff] tracking-widest mb-3">
          <Layers className="w-3.5 h-3.5 text-[#4ad8ff] animate-pulse" />
          <span>OMNI-SPHERE LATTICE // 8 HOLOGRAPHIC NODES</span>
        </div>
        <h2 className="holo-text text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight">
          OMNI-SPHERE
        </h2>
        <p className="font-body text-xl text-[#98a5c4] max-w-2xl mx-auto mt-2 italic">
          All production systems rendered as floating holographic nodes orbiting the central engineer profile. Click any node to project its full case study in 3D depth.
        </p>
      </div>

      {/* The Sphere Container */}
      <div className="relative w-full h-[640px] sm:h-[700px] flex items-center justify-center">
        {/* Core central orb (subject portrait) */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 rounded-full p-1 bg-gradient-to-tr from-[#4ad8ff] via-[#9d6bff] to-[#ff5cf3] shadow-[0_0_50px_rgba(74,216,255,0.6)] hologram-flicker"
          style={{ zIndex: 50 }}
        >
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#4ad8ff] bg-[#020410]">
            <img
              src="https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp"
              alt="Moe Kyaw Aung"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Orbiting Ring Track Visuals */}
        {(["CORE", "UPPER_ORBIT", "MID_ORBIT", "OUTER_RING"] as const).map((tier) => (
          <div
            key={tier}
            className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/5 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: TIER_RADIUS[tier] * 2,
              height: TIER_RADIUS[tier] * 2,
            }}
          />
        ))}

        {/* Project Nodes */}
        {HOLO_NODES.map((n, i) => {
          const tier = SPHERE_TIERS[n.tier];
          const angle = (i / HOLO_NODES.length) * Math.PI * 2;
          const radius = TIER_RADIUS[n.tier];
          const z = tier.z;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius * 0.45; // elliptical for 3D tilt

          return (
            <div
              key={n.id}
              onClick={() => openNode(n)}
              onMouseEnter={() => hologramAudio.uiTick()}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                transform: `translate3d(${x}px, ${y}px, ${z}px) scale(${tier.scale})`,
                transformStyle: "preserve-3d",
                zIndex: 100 - tier.z,
                animation: `float-y ${5 + (i % 4) * 0.5}s ease-in-out infinite`,
                animationDelay: `${(i % 5) * 0.3}s`,
              }}
            >
              {/* Node Bracket Frame */}
              <div
                className="relative w-[160px] sm:w-[200px] p-2 rounded-2xl border bg-[#050a25]/90 backdrop-blur-md shadow-[0_0_25px_rgba(74,216,255,0.25)] group-hover:shadow-[0_0_40px_rgba(74,216,255,0.5)] group-hover:border-[#4ad8ff] transition-all duration-500"
                style={{
                  borderColor: n.primaryHue,
                  boxShadow: `0 0 20px ${n.primaryHue}55`,
                }}
              >
                {/* Bracket Corners */}
                <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2" style={{ borderColor: n.primaryHue }} />
                <div className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2" style={{ borderColor: n.primaryHue }} />
                <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2" style={{ borderColor: n.primaryHue }} />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2" style={{ borderColor: n.primaryHue }} />

                {/* UUID Label */}
                <span
                  className="font-mono text-[8px] font-bold tracking-widest block text-center mb-1.5"
                  style={{ color: n.primaryHue }}
                >
                  {n.uuid}
                </span>

                {/* Image Holo Cube */}
                <div className="relative h-24 w-full rounded-lg overflow-hidden border border-[#4ad8ff]/30 bg-[#020410]">
                  <img
                    src={n.image}
                    alt={n.name}
                    className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-110 group-hover:brightness-110 transition duration-500"
                    loading="lazy"
                  />
                  {/* Moire Scanline */}
                  <div className="absolute inset-0 moire-overlay opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020410]/80 to-transparent" />

                  {/* Tier Tag */}
                  <span
                    className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded font-mono text-[7px] tracking-widest border"
                    style={{
                      color: n.primaryHue,
                      borderColor: `${n.primaryHue}66`,
                      background: "rgba(2, 4, 16, 0.85)",
                    }}
                  >
                    {n.tier}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-tech text-base font-bold text-white text-center mt-2.5 tracking-wider group-hover:text-[#4ad8ff] transition">
                  {n.name}
                </h3>

                {/* Sub-tags */}
                <div className="flex flex-wrap gap-1 justify-center mt-2">
                  {n.tagWords.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[8px] px-1.5 py-0.5 rounded border tracking-widest"
                      style={{
                        color: n.secondaryHue,
                        borderColor: `${n.secondaryHue}44`,
                        background: `${n.secondaryHue}11`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Launch Probe Button */}
                <div className="flex items-center justify-center mt-2.5">
                  <span
                    className="font-mono text-[9px] font-bold tracking-widest flex items-center gap-1"
                    style={{ color: n.primaryHue }}
                  >
                    <span>LAUNCH PROBE</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hologram Case Study Modal — Multi-layer 3D depth */}
      {selected && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-[#020410]/85 backdrop-blur-md overflow-y-auto"
          onClick={closeNode}
        >
          <div
            className="relative w-full max-w-4xl preserve-3d my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Outer glow ring */}
            <div
              className="absolute -inset-4 rounded-3xl blur-2xl opacity-40"
              style={{ background: `radial-gradient(circle, ${selected.primaryHue}, transparent 70%)` }}
            />

            {/* Layer 1: Backplate (largest, deepest Z) */}
            <div
              className="holo-panel absolute -bottom-4 -right-4 left-4 top-4 rounded-3xl opacity-30"
              style={{
                transform: "translateZ(-40px) scale(0.97)",
                borderColor: selected.secondaryHue,
                boxShadow: `0 0 30px ${selected.secondaryHue}66`,
              }}
            />

            {/* Layer 2: Mid-backplate */}
            <div
              className="holo-panel absolute -bottom-2 -right-2 left-2 top-2 rounded-3xl opacity-50"
              style={{
                transform: "translateZ(-20px) scale(0.985)",
                borderColor: selected.primaryHue,
              }}
            />

            {/* Layer 3: Main Case Study Panel (depth-emerged) */}
            <div
              className="relative holo-panel border-2 rounded-3xl p-6 sm:p-8 depth-emerge"
              style={{
                borderColor: selected.primaryHue,
                boxShadow: `0 0 50px ${selected.primaryHue}66, 0 0 100px ${selected.secondaryHue}44`,
                transform: "translateZ(0)",
                background:
                  "linear-gradient(135deg, rgba(2,4,16,0.97) 0%, rgba(10,17,51,0.97) 100%)",
              }}
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-3 mb-6 pb-4 border-b border-[#4ad8ff]/30">
                <div>
                  <p
                    className="font-mono text-[10px] font-bold tracking-[0.3em] mb-1"
                    style={{ color: selected.primaryHue }}
                  >
                    {selected.uuid} // {selected.tier} ORBIT
                  </p>
                  <h3 className="holo-text text-2xl sm:text-4xl font-black tracking-wider leading-none">
                    {selected.name}
                  </h3>
                </div>
                <button
                  onClick={closeNode}
                  className="p-2 rounded-xl bg-[#050a25] border border-[#4ad8ff]/40 text-[#4ad8ff] hover:text-white hover:border-[#ff5cf3] transition shrink-0"
                  aria-label="Close Case Study"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Image Cube */}
                <div className="md:col-span-5 relative">
                  <div
                    className="rounded-2xl overflow-hidden border-2 shadow-[0_0_25px_rgba(74,216,255,0.4)]"
                    style={{ borderColor: selected.primaryHue }}
                  >
                    <img src={selected.image} alt={selected.name} className="w-full h-56 md:h-72 object-cover" />
                  </div>
                  {/* Stats Under Image */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="bg-[#050a25] border border-[#4ad8ff]/30 rounded-lg p-2.5 text-center">
                      <span className="font-mono text-[8px] text-[#98a5c4] block tracking-widest">DEPTH</span>
                      <span className="font-display text-base font-bold text-[#4ad8ff]">
                        {selected.depth}m
                      </span>
                    </div>
                    <div className="bg-[#050a25] border border-[#ff5cf3]/30 rounded-lg p-2.5 text-center">
                      <span className="font-mono text-[8px] text-[#98a5c4] block tracking-widest">TIER</span>
                      <span className="font-display text-base font-bold text-[#ff5cf3] uppercase">
                        {selected.tier.split("_")[0]}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column: 3-Layer Case Study */}
                <div className="md:col-span-7 space-y-3">
                  <p className="font-body text-base sm:text-lg text-[#cad6f2] italic mb-3 leading-snug">
                    “{selected.description}”
                  </p>

                  <div
                    className="rounded-xl border p-4 font-mono text-xs space-y-3"
                    style={{
                      background: "rgba(5, 10, 37, 0.7)",
                      borderColor: `${selected.secondaryHue}44`,
                    }}
                  >
                    <div>
                      <span className="block font-bold mb-1" style={{ color: selected.secondaryHue }}>
                        ▶ CHALLENGE:
                      </span>
                      <span className="text-[#cad6f2] block leading-relaxed">
                        {selected.caseStudy.challenge}
                      </span>
                    </div>
                    <div>
                      <span className="block font-bold mb-1" style={{ color: selected.primaryHue }}>
                        ▶ RESOLUTION:
                      </span>
                      <span className="text-white block leading-relaxed">
                        {selected.caseStudy.resolution}
                      </span>
                    </div>
                    <div>
                      <span className="block font-bold mb-1 text-[#05ffa1]">
                        ▶ HOLO-YIELD:
                      </span>
                      <span className="text-white block leading-relaxed">{selected.caseStudy.result}</span>
                    </div>
                  </div>

                  {/* Metric Badges */}
                  <div className="grid grid-cols-3 gap-2">
                    {selected.caseStudy.metrics.map((m) => (
                      <div
                        key={m}
                        className="bg-[#020410] border border-[#4ad8ff]/30 rounded-lg px-2 py-1.5 text-center font-mono text-[9px] font-bold text-[#4ad8ff] tracking-wider"
                      >
                        {m}
                      </div>
                    ))}
                  </div>

                  {/* Specs Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-[#98a5c4] pt-2">
                    <span>
                      STACK: <strong className="text-white">{selected.stack}</strong>
                    </span>
                    <span>
                      ARCH: <strong className="text-white">{selected.architecture}</strong>
                    </span>
                  </div>

                  {/* GitHub Action Button */}
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-[#4ad8ff] via-[#9d6bff] to-[#ff5cf3] hover:brightness-110 text-white font-tech text-xs tracking-[0.2em] font-bold rounded-xl shadow-[0_0_25px_rgba(74,216,255,0.5)] transition"
                  >
                    <FolderGit2 className="w-4 h-4" />
                    <span>INSPECT REPOSITORY</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
