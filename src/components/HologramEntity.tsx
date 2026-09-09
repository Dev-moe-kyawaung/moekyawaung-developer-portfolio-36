import React, { useEffect, useRef, useState } from "react";
import { Cpu, Sparkles, X, Send } from "lucide-react";
import { HOLO_QUERIES, HOLO_RESPONSES } from "../data/hologramData";
import { hologramAudio } from "../lib/hologramAudio";

/**
 * Hologram Entity AI — a floating interactive orb that narrates
 * architectural layers, neural plumes, and growth trajectories in
 * 3D space.
 */
export const HologramEntity: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<string>("core");
  const [typed, setTyped] = useState<string>("");
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const typingTimerRef = useRef<number | null>(null);
  const paragraphTimerRef = useRef<number | null>(null);
  const [showHint, setShowHint] = useState(true);

  const activeData = HOLO_RESPONSES[activeKey] ?? HOLO_RESPONSES.core;

  // Initialize with first query result
  useEffect(() => {
    if (open) {
      runQuery("core");
    }
    return () => {
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
      if (paragraphTimerRef.current) window.clearInterval(paragraphTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Auto-cycle paragraphs every 7 seconds
  useEffect(() => {
    if (!open) return;
    if (paragraphTimerRef.current) window.clearInterval(paragraphTimerRef.current);
    paragraphTimerRef.current = window.setInterval(() => {
      setParagraphIndex((prev) => (prev + 1) % activeData.paragraphs.length);
    }, 7500);
    return () => {
      if (paragraphTimerRef.current) window.clearInterval(paragraphTimerRef.current);
    };
  }, [open, activeData]);

  // Auto-dismiss hint after 8 seconds
  useEffect(() => {
    const t = setTimeout(() => setShowHint(false), 8000);
    return () => clearTimeout(t);
  }, []);

  const runQuery = (key: string) => {
    hologramAudio.harmoChime();
    setActiveKey(key);
    setParagraphIndex(0);
    setTyped("");
    if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);

    const data = HOLO_RESPONSES[key];
    if (!data) return;
    let i = 0;
    typingTimerRef.current = window.setInterval(() => {
      i += 2;
      setTyped(data.paragraphs[0].slice(0, i));
      if (i >= data.paragraphs[0].length) {
        if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
      }
    }, 12);
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      hologramAudio.harmoChime();
      if (!typed) runQuery("core");
    } else {
      hologramAudio.uiTick();
    }
  };

  return (
    <>
      {/* Floating Hologram Orb */}
      <button
        onClick={toggle}
        onMouseEnter={() => hologramAudio.uiTick()}
        aria-label="Summon Hologram Entity AI"
        className="group fixed bottom-20 right-5 z-[155] flex h-16 w-16 items-center justify-center rounded-full transition-transform duration-500 hover:scale-105"
        style={{
          boxShadow: "0 0 30px rgba(74, 216, 255, 0.5), inset 0 0 14px rgba(157, 107, 255, 0.3)",
        }}
      >
        {/* Concentric Rotating Rings */}
        <span className="absolute inset-0 rounded-full border-2 border-dashed border-[#4ad8ff]/60 animate-spin-slow" />
        <span className="absolute inset-[5px] rounded-full border border-[#9d6bff]/40 animate-spin-slower" />
        <span className="absolute inset-[10px] rounded-full bg-[#020410]/90 backdrop-blur" />

        {/* Center Icon */}
        <div className="relative">
          <Sparkles className="h-6 w-6 text-[#4ad8ff] hologram-flicker" />
        </div>

        {/* LED Pulse */}
        <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-[#020410] bg-[#9d6bff] shadow-[0_0_10px_#9d6bff]" />

        {/* Initial Notification Hint */}
        {showHint && !open && (
          <span className="pop-in holo-panel absolute right-full mr-3 whitespace-nowrap rounded-xl px-3 py-1.5 font-mono text-[9px] tracking-[0.25em] text-[#4ad8ff]">
            ENTITY READY
          </span>
        )}
      </button>

      {/* Hologram Entity Analysis Panel */}
      {open && (
        <div className="pop-in holo-panel-deep fixed bottom-40 right-5 z-[155] w-[min(88vw,400px)] overflow-hidden rounded-3xl border border-[#4ad8ff]/40 shadow-[0_15px_50px_rgba(74,216,255,0.4)]">
          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-[#4ad8ff]/30 px-5 py-3 bg-[#020410]/80">
            <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.35em] text-[#4ad8ff]">
              <Cpu className="h-3.5 w-3.5 text-[#4ad8ff] animate-pulse" /> ENTITY // OS-1986
            </span>
            <button
              onClick={toggle}
              aria-label="Dismiss Entity"
              className="text-[#98a5c4] hover:text-white transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Title Bar */}
          <div className="border-b border-[#4ad8ff]/15 bg-[#050a25]/60 px-5 py-2.5">
            <p className="font-mono text-[9px] tracking-[0.3em] text-[#9d6bff]">PROBE: {activeKey.toUpperCase()}</p>
            <p className="font-tech text-sm font-bold text-white mt-0.5">
              {activeData.title}
            </p>
          </div>

          {/* Typewriter Analysis Output */}
          <div className="min-h-[120px] px-5 py-4 font-mono text-[13px] sm:text-sm leading-relaxed text-[#cad6f2]">
            <span className="text-[#4ad8ff] mr-1.5">&gt;</span>
            {typed}
            <span className="inline-block w-2 h-4 bg-[#4ad8ff] ml-1 animate-pulse align-middle" />
            <p className="mt-2 text-[10px] tracking-widest text-[#5b6890] uppercase">
              PARAGRAPH {paragraphIndex + 1} / {activeData.paragraphs.length}
            </p>
          </div>

          {/* 4 Holographic Query Probes */}
          <div className="grid grid-cols-2 gap-2 border-t border-[#4ad8ff]/20 bg-[#020410]/60 p-3">
            {HOLO_QUERIES.map((q) => {
              const isActive = q.key === activeKey;
              return (
                <button
                  key={q.key}
                  onClick={() => runQuery(q.key)}
                  className={`p-2.5 rounded-lg border font-mono text-[10px] text-left transition flex flex-col gap-1 ${
                    isActive
                      ? "bg-[#4ad8ff]/20 border-[#4ad8ff] text-white shadow-[0_0_15px_rgba(74,216,255,0.4)]"
                      : "bg-[#050a25] border-[#252e4a] text-[#98a5c4] hover:border-[#9d6bff] hover:text-white"
                  }`}
                >
                  <span className="font-bold flex items-center gap-1.5">
                    <Send className="w-3 h-3 text-[#4ad8ff] shrink-0" />
                    {q.label}
                  </span>
                  <span className="text-[9px] opacity-80 leading-tight">{q.prompt}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
