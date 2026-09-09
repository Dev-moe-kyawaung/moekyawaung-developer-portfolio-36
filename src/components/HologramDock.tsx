import React, { useEffect, useState } from "react";
import { Activity, Command, Volume2, VolumeX, ArrowUp, Cpu } from "lucide-react";
import { hologramAudio } from "../lib/hologramAudio";

function useFps() {
  const [fps, setFps] = useState(60);
  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;
    const loop = (t: number) => {
      frames++;
      if (t - last >= 1000) {
        setFps(Math.round((frames * 1000) / (t - last)));
        frames = 0;
        last = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return fps;
}

function useClock(tz: string) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);
  try {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: tz,
    }).format(now);
  } catch {
    return "--:--:--";
  }
}

export const HologramDock: React.FC = () => {
  const fps = useFps();
  const ygn = useClock("Asia/Yangon");
  const bkk = useClock("Asia/Bangkok");
  const [soundOn, setSoundOn] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setSoundOn(hologramAudio.enabled);
    const onAudio = (e: Event) => setSoundOn(!!(e as CustomEvent<boolean>).detail);
    const onScroll = () => setShowTop(window.scrollY > 800);

    window.addEventListener("holo:audio", onAudio);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("holo:audio", onAudio);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    hologramAudio.uiTick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Bottom Telemetry Cluster */}
      <div className="fixed bottom-4 left-4 z-[150] hidden md:flex items-center gap-3 holo-panel px-4 py-2 rounded-2xl border border-[#4ad8ff]/40 font-mono text-[10px] tracking-[0.16em] text-[#98a5c4] backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.8)]">
        <span className="flex items-center gap-1.5 text-[#4ad8ff]">
          <Activity className="h-3.5 w-3.5 animate-pulse" /> {fps} HZ
        </span>

        <span className="h-3 w-px bg-[#252e4a]" />

        <span className="tabular-nums text-[#4ad8ff]">YGN {ygn}</span>
        <span className="tabular-nums text-[#9d6bff]">BKK {bkk}</span>

        <span className="h-3 w-px bg-[#252e4a]" />

        <span className="flex items-center gap-1 text-white font-bold">
          <Cpu className="w-3 h-3 text-[#9d6bff]" />
          <span>OS-1986</span>
        </span>

        <span className="h-3 w-px bg-[#252e4a]" />

        {/* Audio Toggle */}
        <button
          onClick={() => hologramAudio.toggleSound()}
          title="Toggle Hologram Audio Engine"
          className={`flex h-7 w-7 items-center justify-center rounded-lg border transition ${
            soundOn
              ? "border-[#4ad8ff] bg-[#4ad8ff]/20 text-[#4ad8ff] shadow-[0_0_12px_rgba(74,216,255,0.5)]"
              : "border-[#252e4a] text-[#5b6890] hover:border-[#4ad8ff] hover:text-white"
          }`}
        >
          {soundOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}
        </button>

        {/* Ctrl+K Palette Shortcut */}
        <button
          onClick={() => window.dispatchEvent(new Event("holo:palette"))}
          title="Launch Hologram Command Deck (Ctrl+K)"
          className="flex h-7 items-center gap-1 rounded-lg px-2 text-[#5b6890] hover:bg-[#4ad8ff]/15 hover:text-[#4ad8ff] transition"
        >
          <Command className="h-3.5 w-3.5" /> CTRL K
        </button>
      </div>

      {/* Return to Origin Button */}
      <button
        onClick={scrollToTop}
        aria-label="Return to Omni-Sphere Origin"
        className={`fixed bottom-5 right-5 z-[150] flex h-11 w-11 items-center justify-center rounded-full border border-[#4ad8ff]/60 bg-[#050a25]/90 text-[#4ad8ff] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(74,216,255,0.6)] hover:scale-105 ${
          showTop ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </>
  );
};
