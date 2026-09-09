import { useEffect } from "react";
import { HologramBackground } from "./components/HologramBackground";
import { HologramCursor } from "./components/HologramCursor";
import { HologramBoot } from "./components/HologramBoot";
import { HologramNav } from "./components/HologramNav";
import { HologramHero } from "./components/HologramHero";
import { OmniSphere } from "./components/OmniSphere";
import { HologramEntity } from "./components/HologramEntity";
import { Skillscape } from "./components/Skillscape";
import { HologramContact } from "./components/HologramContact";
import { HologramDock } from "./components/HologramDock";
import { HologramPalette } from "./components/HologramPalette";
import { HologramDossier } from "./components/HologramDossier";
import { hologramAudio } from "./lib/hologramAudio";

export default function App() {
  // Global pointer parallax for layered holographic depth
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      document.documentElement.style.setProperty("--mx", x.toFixed(3));
      document.documentElement.style.setProperty("--my", y.toFixed(3));
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Restore persisted audio preference
  useEffect(() => {
    try {
      if (localStorage.getItem("holo-sound") === "1") {
        hologramAudio.toggleSound(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <>
      {/* Omni-Sphere Boot Loader */}
      <HologramBoot />

      {/* Holographic Targeting Reticle Cursor */}
      <HologramCursor />

      <div className="app-shell relative min-h-screen bg-[#020410] font-body text-[#cad6f2]">
        {/* Holographic Volumetric Canvas Backdrop */}
        <HologramBackground />

        {/* Atmospheric Fog & Holographic Glow Vignette */}
        <div className="fx-vignette pointer-events-none fixed inset-0 z-[40]" />
        <div className="fx-grain pointer-events-none fixed inset-0 z-[41]" />

        {/* Omni-Sphere Navigation Console */}
        <HologramNav />

        {/* Main Holographic Projections */}
        <main className="relative">
          <HologramHero />
          <OmniSphere />
          <HologramEntity />
          <Skillscape />
          <HologramContact />
        </main>

        {/* Holographic Instrument Cluster & Command Deck */}
        <HologramDock />
        <HologramPalette />
      </div>

      {/* Printable Hologram Engineer Resume Dossier */}
      <HologramDossier />
    </>
  );
}
