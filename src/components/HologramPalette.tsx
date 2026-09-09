import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Sparkles,
  Cpu,
  Printer,
  Volume2,
  VolumeX,
  ArrowUp,
  CornerDownLeft,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { NAV_LINKS, HOLO_NODES } from "../data/hologramData";
import { hologramAudio } from "../lib/hologramAudio";

interface PaletteItem {
  group: string;
  label: string;
  hint?: string;
  icon: LucideIcon;
  run: () => void;
}

export const HologramPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") setOpen(false);
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("holo:palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("holo:palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      window.setTimeout(() => inputRef.current?.focus(), 40);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [open]);

  const items: PaletteItem[] = useMemo(() => {
    const list: PaletteItem[] = [];

    NAV_LINKS.forEach((l) =>
      list.push({
        group: "TRAVERSE OMNI-SPHERE",
        label: `Navigate to ${l.label}`,
        hint: l.href,
        icon: Layers,
        run: () => document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" }),
      })
    );

    HOLO_NODES.forEach((n) =>
      list.push({
        group: "ACTIVATE HOLOGRAPHIC NODE",
        label: n.name,
        hint: `${n.uuid} // ${n.tier}`,
        icon: Sparkles,
        run: () => {
          document.querySelector("#omni-sphere")?.scrollIntoView({ behavior: "smooth" });
        },
      })
    );

    list.push(
      {
        group: "OPERATIONS",
        label: "Print Hologram Engineer Dossier (PDF)",
        hint: "Curriculum Vitae",
        icon: Printer,
        run: () => window.print(),
      },
      {
        group: "OPERATIONS",
        label: "Toggle Omni-Sphere Audio Engine",
        hint: hologramAudio.enabled ? "ACTIVE" : "MUTED",
        icon: hologramAudio.enabled ? Volume2 : VolumeX,
        run: () => hologramAudio.toggleSound(),
      },
      {
        group: "OPERATIONS",
        label: "Return to Sphere Origin",
        hint: "Top",
        icon: ArrowUp,
        run: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      }
    );

    return list;
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter(
      (i) => i.label.toLowerCase().includes(needle) || i.group.toLowerCase().includes(needle) || i.hint?.toLowerCase().includes(needle)
    );
  }, [items, q]);

  useEffect(() => setActive(0), [q]);
  useEffect(() => {
    listRef.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (!open) return null;

  const run = (i: PaletteItem) => {
    setOpen(false);
    hologramAudio.uiTick();
    window.setTimeout(() => i.run(), 30);
  };

  let lastGroup = "";

  return (
    <div
      className="fixed inset-0 z-[180] flex items-start justify-center px-4 pt-[11vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Hologram Command Deck"
    >
      <div className="absolute inset-0 bg-[#020410]/85 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div
        className="holo-panel relative w-full max-w-xl overflow-hidden rounded-2xl border-2 border-[#4ad8ff] shadow-[0_0_80px_rgba(74,216,255,0.45)] depth-emerge"
      >
        <div className="flex items-center gap-3 border-b border-[#4ad8ff]/30 px-4 py-3.5 bg-[#020410]/60">
          <Search className="h-4 w-4 shrink-0 text-[#4ad8ff]" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(filtered.length - 1, a + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(0, a - 1));
              } else if (e.key === "Enter") {
                const it = filtered[active];
                if (it) run(it);
              }
            }}
            placeholder="Query the omni-sphere: nodes, telemetry, dossier..."
            className="w-full bg-transparent font-mono text-sm tracking-wide text-white placeholder:text-[#5b6890] focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-[#4ad8ff]/30 px-1.5 py-0.5 font-mono text-[9px] text-[#4ad8ff] sm:block">
            ESC
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[48vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-center font-mono text-xs tracking-[0.3em] text-[#5b6890]">
              NO LATTICE TARGET FOUND
            </p>
          )}
          {filtered.map((item, i) => {
            const header = item.group !== lastGroup ? item.group : null;
            lastGroup = item.group;
            const Icon = item.icon;
            return (
              <div key={`${item.group}-${item.label}`}>
                {header && (
                  <p className="px-3 pb-1 pt-3 font-mono text-[9px] tracking-[0.35em] text-[#4ad8ff]">
                    {header}
                  </p>
                )}
                <button
                  data-idx={i}
                  onClick={() => run(item)}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                    i === active ? "bg-[#4ad8ff]/20 text-white" : "text-[#cad6f2]"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                      i === active ? "border-[#4ad8ff] text-[#4ad8ff]" : "border-[#252e4a] text-[#98a5c4]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1 truncate font-mono text-xs tracking-wider">
                    {item.label}
                  </span>
                  {item.hint && (
                    <span className="hidden shrink-0 font-mono text-[10px] text-[#9d6bff] sm:block">
                      {item.hint}
                    </span>
                  )}
                  {i === active && <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-[#4ad8ff]" />}
                </button>
              </div>
            );
          })}
        </div>

        <div className="flex items-center justify-between border-t border-[#4ad8ff]/30 px-4 py-2.5 font-mono text-[9px] tracking-[0.25em] text-[#98a5c4] bg-[#020410]/60">
          <span className="flex items-center gap-1.5 text-[#4ad8ff]">
            <Cpu className="h-3 w-3 text-[#4ad8ff]" /> OS: OMNI-SPHERE v86
          </span>
          <span>ENTER TO EXECUTE // ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
