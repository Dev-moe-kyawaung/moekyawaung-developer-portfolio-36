// Holographic Palette and Color Helpers
export const HOLO = {
  void: "#020410",
  abyss: "#050a25",
  deep: "#0a1133",
  panel: "#0d1645",
  cyan: "#4ad8ff",
  azure: "#2890ff",
  violet: "#9d6bff",
  magenta: "#ff5cf3",
  lumen: "#ffffff",
  amber: "#ffb84a",
};

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  if (clean.length !== 3 && clean.length !== 6) return hex;
  const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
  const num = parseInt(full, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function mixHex(a: string, b: string, k: number): string {
  const pa = a.replace("#", "");
  const pb = b.replace("#", "");
  const na = parseInt(pa.length === 3 ? pa.split("").map((c) => c + c).join("") : pa, 16);
  const nb = parseInt(pb.length === 3 ? pb.split("").map((c) => c + c).join("") : pb, 16);
  const r = Math.round(((na >> 16) & 255) * (1 - k) + ((nb >> 16) & 255) * k);
  const g = Math.round(((na >> 8) & 255) * (1 - k) + ((nb >> 8) & 255) * k);
  const bl = Math.round((na & 255) * (1 - k) + (nb & 255) * k);
  return `rgb(${r},${g},${bl})`;
}

// Orbital Sphere Tiers — color coding for project holographic nodes
export type SphereTier = "CORE" | "UPPER_ORBIT" | "MID_ORBIT" | "OUTER_RING";

export const SPHERE_TIERS: Record<SphereTier, { name: string; color: string; scale: number; z: number }> = {
  CORE: { name: "Primary Orbit", color: HOLO.cyan, scale: 1.15, z: 40 },
  UPPER_ORBIT: { name: "Upper Orbit", color: HOLO.violet, scale: 0.95, z: 20 },
  MID_ORBIT: { name: "Mid Orbit", color: HOLO.magenta, scale: 0.85, z: 0 },
  OUTER_RING: { name: "Outer Ring", color: HOLO.amber, scale: 0.75, z: -30 },
};
