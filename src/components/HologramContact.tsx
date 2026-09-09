import React from "react";
import { Phone, MessageSquare, FolderGit2, Fingerprint, ArrowUpRight, Radio, Printer } from "lucide-react";
import { PROFILE_DATA, SOCIAL_NODES } from "../data/hologramData";
import { hologramAudio } from "../lib/hologramAudio";

export const HologramContact: React.FC = () => {
  return (
    <section id="contact" className="relative z-10 py-24 px-4 max-w-7xl mx-auto space-y-16">
      {/* Transmission Deck */}
      <div className="holo-panel rounded-3xl p-6 sm:p-10 border-2 border-[#4ad8ff]/60 shadow-[0_0_60px_rgba(74,216,255,0.35)] relative overflow-hidden">
        <div className="magma-sheen absolute inset-0" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
          {/* Left Column: Direct Hologram Transmission Channels */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="font-mono text-xs px-3 py-1 rounded-full bg-[#4ad8ff]/15 border border-[#4ad8ff]/40 text-[#4ad8ff] tracking-widest inline-block mb-3">
                OPEN FREQUENCY // ZERO LATENCY CHANNEL
              </span>
              <h2 className="holo-text text-3xl sm:text-5xl font-black tracking-tight">
                HOLO-TRANSMISSION
              </h2>
              <p className="font-body text-xl text-[#98a5c4] mt-2 italic">
                Direct omnidirectional channels to Moe Kyaw Aung. Active dispatch for Senior Android engineering, Clean Architecture consultations, and on-device neural integrations.
              </p>
            </div>

            {/* Direct Phone & WhatsApp Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={`tel:${PROFILE_DATA.phone.replace(/\s+/g, "")}`}
                onClick={() => hologramAudio.uiTick()}
                className="holo-panel p-4 rounded-2xl border border-[#4ad8ff]/40 hover:border-[#4ad8ff] transition group shadow-[0_0_15px_rgba(74,216,255,0.2)] block"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#4ad8ff]">
                  <Phone className="w-3.5 h-3.5 text-[#4ad8ff]" />
                  <span>DIRECT LINE // VOICE FREQUENCY</span>
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#4ad8ff] transition">
                  {PROFILE_DATA.phone}
                </p>
                <span className="font-mono text-[9px] text-[#9d6bff] mt-1 block">
                  FASTEST RESPONSE &lt; 2H
                </span>
              </a>

              <a
                href={PROFILE_DATA.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => hologramAudio.harmoChime()}
                className="holo-panel p-4 rounded-2xl border border-[#ff5cf3]/40 hover:border-[#ff5cf3] transition group shadow-[0_0_15px_rgba(255,92,243,0.2)] block"
              >
                <div className="flex items-center gap-2 mb-2 font-mono text-[10px] text-[#ff5cf3]">
                  <MessageSquare className="w-3.5 h-3.5 text-[#ff5cf3]" />
                  <span>WHATSAPP // BEACON TRANSMITTER</span>
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-[#ff5cf3] transition">
                  INSTANT DISPATCH
                </p>
                <span className="font-mono text-[9px] text-[#ff5cf3] mt-1 block">
                  ENCRYPTED CHANNEL 24/7
                </span>
              </a>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={PROFILE_DATA.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#050a25] border border-[#4ad8ff]/30 hover:border-[#4ad8ff] text-[#cad6f2] hover:text-[#4ad8ff] font-mono text-xs transition"
              >
                <FolderGit2 className="w-4 h-4 text-[#4ad8ff]" />
                <span>GITHUB // {PROFILE_DATA.github}</span>
              </a>
              <a
                href={PROFILE_DATA.gravatarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#050a25] border border-[#9d6bff]/30 hover:border-[#9d6bff] text-[#cad6f2] hover:text-[#9d6bff] font-mono text-xs transition"
              >
                <Fingerprint className="w-4 h-4 text-[#9d6bff]" />
                <span>GRAVATAR IDENTITY</span>
              </a>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4ad8ff]/15 border border-[#4ad8ff]/50 hover:bg-[#4ad8ff]/30 text-[#4ad8ff] font-mono text-xs transition shadow-[0_0_12px_rgba(74,216,255,0.3)]"
              >
                <Printer className="w-4 h-4 text-[#4ad8ff]" />
                <span>PRINT HOLOGRAM DOSSIER</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Roster (Cloudinary Action Shots) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative p-2.5 bg-gradient-to-br from-[#4ad8ff]/40 to-[#020410] rounded-2xl border border-[#4ad8ff]/40 shadow-[0_0_30px_rgba(74,216,255,0.35)] w-full max-w-sm">
              <div className="w-full h-56 rounded-xl overflow-hidden border border-[#4ad8ff]/30 bg-black">
                <img
                  src={PROFILE_DATA.photo1}
                  alt="Moe Kyaw Aung Engineering"
                  className="w-full h-full object-cover filter contrast-110 hologram-flicker"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="h-20 rounded-lg overflow-hidden border border-[#9d6bff]/30">
                  <img src={PROFILE_DATA.photo2} alt="Workshop" className="w-full h-full object-cover" />
                </div>
                <div className="h-20 rounded-lg overflow-hidden border border-[#ff5cf3]/30">
                  <img src={PROFILE_DATA.photo3} alt="Hardware Lab" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="text-center font-mono text-[9px] text-[#4ad8ff] mt-2.5 tracking-[0.25em]">
                VERIFIED OPERATOR DOSSIER // TACHILEIK ⇄ BANGKOK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Network Channels Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {SOCIAL_NODES.map((channel) => (
          <a
            key={channel.name}
            href={channel.url}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={() => hologramAudio.uiTick()}
            className="holo-panel p-3.5 rounded-xl border border-[#4ad8ff]/30 hover:border-[#4ad8ff] flex items-center justify-between group transition hover:-translate-y-1 hover:shadow-[0_0_18px_rgba(74,216,255,0.25)]"
          >
            <div>
              <span className="font-tech text-sm font-bold text-white group-hover:text-[#4ad8ff] transition block">
                {channel.name}
              </span>
              <span className="font-mono text-[9px] text-[#98a5c4] truncate block max-w-[110px]">
                {channel.handle}
              </span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#4ad8ff] group-hover:text-[#ff5cf3] group-hover:translate-x-0.5 transition" />
          </a>
        ))}
      </div>

      {/* Hologram Footer */}
      <footer className="pt-12 border-t border-[#4ad8ff]/30 text-center font-mono">
        <div className="flex items-center justify-center gap-2 mb-2 text-[#4ad8ff]">
          <Radio className="w-4 h-4 text-[#4ad8ff] animate-pulse" />
          <span className="text-xs tracking-[0.3em] font-bold">
            MKA // OMNI-SPHERE OS-1986
          </span>
          <Radio className="w-4 h-4 text-[#4ad8ff] animate-pulse" />
        </div>
        <p className="text-xs text-[#98a5c4] tracking-wider mb-2">
          &copy; {new Date().getFullYear()} MOE KYAW AUNG ({PROFILE_DATA.nameMm}) — PROJECTED FROM TACHILEIK ⇄ BANGKOK
        </p>
        <p className="text-[10px] text-[#5b6890] tracking-[0.25em]">
          “{PROFILE_DATA.philosophy.toUpperCase()}” · ZERO LATENCY · LATTICE STABLE
        </p>
      </footer>
    </section>
  );
};
