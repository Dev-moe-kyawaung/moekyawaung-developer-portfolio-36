import { SphereTier } from "../lib/hologramTheme";

export interface HologramNode {
  id: string;
  uuid: string;
  name: string;
  tier: SphereTier;
  primaryHue: string;
  secondaryHue: string;
  image: string;
  description: string;
  tagWords: string[];
  stack: string;
  architecture: string;
  depth: number; // 0–10 scale
  caseStudy: {
    challenge: string;
    resolution: string;
    result: string;
    metrics: string[];
  };
  githubUrl: string;
}

const CLOUD = "https://res.cloudinary.com/dye5qpwii/image/upload";

export const PROFILE_DATA = {
  name: "Moe Kyaw Aung",
  nameMm: "မိုးကျော်အောင်",
  codename: "HOLO_OPERATOR // OS-1986",
  title: "Senior Android & Full-Stack Hologram Engineer",
  subtitle: "Architecting layered 3D systems in Kotlin, Jetpack Compose, Clean Architecture & On-Device AI",
  location: "Tachileik, Myanmar 🇲🇲 ⇄ Bangkok, Thailand 🇹🇭",
  status: "OMNI-SPHERE ONLINE // LATTICE IN FULL ROTATION",
  philosophy: "Code with culture. Build with purpose.",
  yearsExp: "3+ Years Active Orbits",
  certified: "82+ Verified Architectures (Programming Hub)",
  phone: "+95 9 889 000 889",
  phoneAlt: "+95 9 666 000 050",
  whatsapp: "https://wa.me/959889000889",
  githubUrl: "https://github.com/Dev-moe-kyawaung",
  github: "Dev-moe-kyawaung",
  gravatarUrl: "https://gravatar.com/moekyawaung13721",
  avatar: `${CLOUD}/v1778763535/MKA_25_lbx6fb.webp`,
  photo1: `${CLOUD}/v1778763531/MKA_12_iv8kpm.webp`,
  photo2: `${CLOUD}/v1778763531/MKA_3_zqrhhr.webp`,
  photo3: `${CLOUD}/v1778763532/MKA_11_jbijtv.webp`,
  currentMission: "MoekyawTranslator // On-Device AI Neural Sphere (TFLite 4MB, 38ms)",
  omniTelemetry: {
    activeNodes: 8,
    dataStreams: "120/sec",
    neuralFlux: "38MS",
    depthFactor: "0.99m",
  },
};

export const HOLO_NODES: HologramNode[] = [
  {
    id: "social-dash",
    uuid: "NODE-OS-001",
    name: "Social Dashboard",
    tier: "CORE",
    primaryHue: "#4ad8ff",
    secondaryHue: "#9d6bff",
    image: `${CLOUD}/v1778795856/copilot_image_1778795000722_eo96gj.png`,
    description: "Realtime social telemetry sphere aggregating multi-account presence, sentiment heat, and predictive trend lines.",
    tagWords: ["Kotlin", "Compose", "Firebase", "MVI"],
    stack: "Kotlin · Jetpack Compose · Firebase",
    architecture: "Clean Architecture + MVI",
    depth: 9.4,
    caseStudy: {
      challenge: "5 disconnected APIs fragmenting the UI state and forcing brutal manual refreshes.",
      resolution: "Unified all data through a single StateFlow stream + Hilt-injected repositories, layered with proactive push telemetry.",
      result: "Latency reduced by 92%, 5 separate UIs merged into 1 dense spherical panel with zero thread blockages.",
      metrics: ["-92% pipeline latency", "5 accounts → 1 unified stream", "0% frame drop under load"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/social-dashboard",
  },
  {
    id: "video-player",
    uuid: "NODE-OS-002",
    name: "Thermal Video Sphere",
    tier: "CORE",
    primaryHue: "#ff5cf3",
    secondaryHue: "#4ad8ff",
    image: `${CLOUD}/v1778795847/copilot_image_1778795115579_acfm5j.png`,
    description: "Senior-grade media playback sphere — ExoPlayer Media3 with gesture scrubbing, hardware decoders, PiP.",
    tagWords: ["ExoPlayer Media3", "Compose", "PiP", "Subtitles"],
    stack: "Kotlin · ExoPlayer Media3",
    architecture: "Pipeline Stream Reactor",
    depth: 9.1,
    caseStudy: {
      challenge: "Severe video buffering under rapid seek gestures; thermal throttling on mid-tier devices.",
      resolution: "Implemented Media3 chunk pre-fetching with asynchronous surface render threads and explicit thermal throttling awareness.",
      result: "60 FPS solid seek tracking, zero dropped frames across the entire 4K playback surface.",
      metrics: ["Zero frame drops", "60 FPS locked", "-35% thermal overhead"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/video-player",
  },
  {
    id: "pos-ultimate",
    uuid: "NODE-OS-003",
    name: "POS Ultimate Pro Max",
    tier: "UPPER_ORBIT",
    primaryHue: "#9d6bff",
    secondaryHue: "#ff5cf3",
    image: `${CLOUD}/v1778795856/copilot_image_1778794626112_ega7kk.png`,
    description: "Commercial point-of-sale engine — offline-first Room DB, thermal receipt spooler, multi-branch tax reports.",
    tagWords: ["Room SQLite", "WorkManager", "ESC/POS", "Outbox"],
    stack: "Kotlin · Room · WorkManager",
    architecture: "Outbox Repository Pattern",
    depth: 9.8,
    caseStudy: {
      challenge: "Sales vanishing at frontier markets when the cellular signal drops mid-transaction.",
      resolution: "Forged an offline-first Outbox pattern: Room as source of truth, WorkManager drains the queue with exponential backoff.",
      result: "0% lost transactions. Idempotent retries resolve cleanly upon signal reconnection.",
      metrics: ["Zero transaction loss", "Idempotent outbox", "Multi-branch ledger"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/POS-Ultimate-Pro-Max",
  },
  {
    id: "moekyaw-translator",
    uuid: "NODE-OS-004",
    name: "MoekyawTranslator AI",
    tier: "UPPER_ORBIT",
    primaryHue: "#ffb84a",
    secondaryHue: "#4ad8ff",
    image: `${CLOUD}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
    description: "On-device neural translation engine. Quantized TFLite model. 38ms inference. Zero cloud transmission.",
    tagWords: ["TFLite", "On-Device AI", "NNAPI", "Burmese ↔ English"],
    stack: "Kotlin · TFLite · NNAPI",
    architecture: "Edge Neural Flatbuffer",
    depth: 9.5,
    caseStudy: {
      challenge: "Cloud LLM translation APIs failing in cellular dead zones — at borders, in flights, in tunnels.",
      resolution: "Quantized sequence-to-sequence model (4MB) packaged into TFLite flatbuffer executed on NNAPI hardware delegate.",
      result: "38ms per-sentence private translation that never touches a remote server.",
      metrics: ["38ms inference", "4MB footprint", "Zero-cloud privacy"],
    },
    githubUrl: "https://github.com/moekyawaung-tech",
  },
  {
    id: "game-collection",
    uuid: "NODE-OS-005",
    name: "Arcade Holo Vault",
    tier: "MID_ORBIT",
    primaryHue: "#4ad8ff",
    secondaryHue: "#ffb84a",
    image: `${CLOUD}/v1778795822/preview_dzhqvv.webp`,
    description: "Retro arcade bundle with Neon Snake, 2048 Turbo, Space Invaders, and procedural chiptune audio.",
    tagWords: ["Canvas 60FPS", "State Machine", "Chiptune Audio", "Kotlin/TS"],
    stack: "TypeScript · Canvas · Kotlin",
    architecture: "Game Loop State Machine",
    depth: 8.6,
    caseStudy: {
      challenge: "Multi-game architectures duplicating render loops and leaking animation frames into the main thread.",
      resolution: "Standardized on a single clock-driven game state machine with canvas layers hard-synced to 60Hz.",
      result: "Rock-solid 60 FPS gameplay with synchronized procedural chiptune audio feedback.",
      metrics: ["60 FPS locked", "Procedural chiptune", "0 GC frame drops"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/game-collection",
  },
  {
    id: "weather-radar",
    uuid: "NODE-OS-006",
    name: "Atmospheric Radar Sphere",
    tier: "MID_ORBIT",
    primaryHue: "#9d6bff",
    secondaryHue: "#4ad8ff",
    image: `${CLOUD}/v1778795859/copilot_image_1778794430377_n7xlmz.png`,
    description: "Geospatial forecasting engine — hourly pressure, GPS coordinates, severe storm radar layers.",
    tagWords: ["Retrofit", "REST API", "Geocoding", "Custom Charts"],
    stack: "Kotlin · Retrofit · Coroutines",
    architecture: "Clean Architecture",
    depth: 8.2,
    caseStudy: {
      challenge: "Overly frequent GPS polling draining battery and redrawing entire view hierarchies on every tick.",
      resolution: "Geofenced cache invalidation coupled with diffed canvas weather graphing.",
      result: "60% reduction in battery consumption while delivering real-time severe weather warnings.",
      metrics: ["-60% battery drain", "Sub-second radar charts", "Accurate geo alerts"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/Weather-app",
  },
  {
    id: "pwa-shell",
    uuid: "NODE-OS-007",
    name: "Holographic PWA Matrix",
    tier: "MID_ORBIT",
    primaryHue: "#ff5cf3",
    secondaryHue: "#4ad8ff",
    image: `${CLOUD}/v1778795829/copilot_image_1778795000722_okryxj.png`,
    description: "Installable Progressive Web App featuring Workbox service workers, offline asset caches, and background sync queues.",
    tagWords: ["PWA", "Workbox", "Service Worker", "Vite"],
    stack: "TypeScript · Vite · Workbox",
    architecture: "Offline-First Service Worker",
    depth: 8.4,
    caseStudy: {
      challenge: "Web apps collapsing into white screens when client devices lose data connectivity.",
      resolution: "Multi-tier caching strategies: stale-while-revalidate for data, cache-first for assets.",
      result: "App boots instantaneously even in airplane mode and resumes sync quietly upon signal.",
      metrics: ["100% offline shell", "Background sync queue", "Lighthouse 100"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/pwa-app",
  },
  {
    id: "thailand-transit",
    uuid: "NODE-OS-008",
    name: "Tachileik ⇄ Bangkok Transit",
    tier: "OUTER_RING",
    primaryHue: "#ffb84a",
    secondaryHue: "#9d6bff",
    image: `${CLOUD}/v1778795856/copilot_image_1778795675037_heh9xk.png`,
    description: "Cross-border transit navigation sphere for Thailand and Myanmar. Offline maps, currency exchange.",
    tagWords: ["Mapbox SDK", "Offline Maps", "Room DB", "Bilingual"],
    stack: "Kotlin · Mapbox SDK · Room DB",
    architecture: "MVVM Navigation Architecture",
    depth: 8.8,
    caseStudy: {
      challenge: "International roaming failures stripping travelers of maps and currency rates at borders.",
      resolution: "Pre-cached vector tiles inside Room SQLite with a bilingual Burmese/English/Thai interface.",
      result: "Dependable cross-border transit aid requiring zero cellular data during border transitions.",
      metrics: ["Complete offline maps", "Live currency calculator", "Bilingual travel guide"],
    },
    githubUrl: "https://github.com/moekyawaung-tech/thailand-travel",
  },
];

export const SPHERE_SKILLS = [
  { name: "Kotlin", domain: "Core Lattice", strength: 0.98, hue: "#4ad8ff" },
  { name: "Jetpack Compose", domain: "UI Membrane", strength: 0.96, hue: "#9d6bff" },
  { name: "Clean Architecture", domain: "Tectonic Plates", strength: 0.94, hue: "#ff5cf3" },
  { name: "MVVM / MVI", domain: "Signal Pattern", strength: 0.96, hue: "#4ad8ff" },
  { name: "Coroutines & Flow", domain: "Kinetic Stream", strength: 0.96, hue: "#ffb84a" },
  { name: "TFLite Edge AI", domain: "Neural Plume", strength: 0.88, hue: "#ff5cf3" },
  { name: "Firebase Backend", domain: "Telemetry Cloud", strength: 0.92, hue: "#9d6bff" },
  { name: "Room SQLite", domain: "Quantum Vault", strength: 0.95, hue: "#4ad8ff" },
  { name: "Retrofit & REST", domain: "Lattice Channel", strength: 0.97, hue: "#ffb84a" },
  { name: "Python", domain: "Diagnostic Scripting", strength: 0.85, hue: "#9d6bff" },
  { name: "TypeScript / React", domain: "Surface Interface", strength: 0.9, hue: "#4ad8ff" },
  { name: "GitHub Actions", domain: "CD Gates", strength: 0.92, hue: "#ffb84a" },
  { name: "Cybersecurity & Kali", domain: "Membrane Defense", strength: 0.86, hue: "#ff5cf3" },
  { name: "Clean Code Philosophy", domain: "Core Ethos", strength: 1.0, hue: "#ffffff" },
];

export const HOLO_QUERIES = [
  {
    key: "core",
    label: "Scan Omni-Sphere Core",
    prompt: "Analyze the central architecture vector and primary engineering strata",
  },
  {
    key: "neural",
    label: "Map Neural Plume (AI)",
    prompt: "Project the on-device TFLite inference radius and Tachileik-to-Bangkok data corridors",
  },
  {
    key: "tectonics",
    label: "Inspect Tectonic Plates",
    prompt: "Resolve layer boundaries across Compose / Domain / Data",
  },
  {
    key: "growth",
    label: "Trace Growth Trajectory",
    prompt: "Compute orbit expansion: 16+ shipped systems across 9 architectural domains",
  },
];

export const HOLO_RESPONSES: Record<string, { title: string; paragraphs: string[] }> = {
  core: {
    title: "Omni-Sphere Core — Central Architecture Vector",
    paragraphs: [
      "Central holographic vector indicates Kotlin as the master control language. Operating at 98% fluency — the lattice rotates around it, every other sphere depends on its syntax.",
      "The primary orbit is occupied by the Clean Architecture triple: Compose, Domain, Data. The tectonic plates are stable. Frame drops are zero. Thermal overhead has not exceeded -35% reduction.",
      "Current primary expansion vector: cross-platform Kotlin Multiplatform. The architecture is intrinsically prepared for additional OS targets beyond Android.",
    ],
  },
  neural: {
    title: "Neural Plume — On-Device AI Projection",
    paragraphs: [
      "Activating the on-device intelligence layer. MoekyawTranslator operates in the upper orbit, currently executing a 4MB TFLite quantized neural flatbuffer at 38ms per sentence inference.",
      "The Tachileik ⇄ Bangkok data corridor is fully secured. The translation engine contains zero outbound network packets, providing a complete privacy shield for all linguistic traffic.",
      "The AI plume maintains fluid kinematics between cellular dead zones. All neural operations are executed locally, rendering the sphere immune to oceanic sub-network failures.",
    ],
  },
  tectonics: {
    title: "Tectonic Plate Inspection — Layer Boundaries",
    paragraphs: [
      "Scanning structural boundaries. The Presentation tier (Jetpack Compose + ViewModels) is separated by 94.6% testability factor — independent of framework tremors.",
      "The Domain tier enforces pure-Kotlin use-cases. It is the immutable heart of the sphere — no Android imports, no framework dependencies.",
      "The Data tier (Room, Retrofit, Firebase) is fully encapsulated. Boundary breaches logged: 0. The plate architecture holds under all known seismic testing.",
    ],
  },
  growth: {
    title: "Growth Trajectory — Orbital Expansion Log",
    paragraphs: [
      "The trajectory log indicates rapid orbital expansion: 16+ applications have been successfully transited to production-scale systems.",
      "The sphere is enveloped by 82+ verified educational certifications across 9 distinct domains. Mastery spectrum: Programming, Web, Mobile, Databases, AI/Data, Security/DevOps, Blockchain, Software Engineering, Business.",
      "Extrapolated growth vector: continued AI-domain specialization, eventual Multiplatform, and deeper cryptocurrency/hybrid infrastructure intersections.",
    ],
  },
};

export const SOCIAL_NODES = [
  { name: "GitHub", handle: "Dev-moe-kyawaung", url: "https://github.com/Dev-moe-kyawaung", color: "#4ad8ff" },
  { name: "Gravatar", handle: "moekyawaung13721", url: "https://gravatar.com/moekyawaung13721", color: "#ff5cf3" },
  { name: "LinkedIn", handle: "moe-kyaw-aung", url: "https://www.linkedin.com/in/moe-kyaw-aung-2653093a1", color: "#9d6bff" },
  { name: "YouTube", handle: "Dev Moe Channel", url: "https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG", color: "#ff5cf3" },
  { name: "Bluesky", handle: "@moekyawaung96", url: "https://bsky.app/profile/moekyawaung96.bsky.social", color: "#4ad8ff" },
  { name: "Vimeo", handle: "Holo Vault", url: "https://vimeo.com/user252414232", color: "#ffb84a" },
  { name: "Tumblr", handle: "Light Logs", url: "https://www.tumblr.com/moekyawaung", color: "#9d6bff" },
  { name: "Flickr", handle: "Frame Archive", url: "https://www.flickr.com/people/204037451@N06", color: "#ffb84a" },
];

export const NAV_LINKS = [
  { label: "Origin", href: "#hero" },
  { label: "Omni-Sphere", href: "#omni-sphere" },
  { label: "Holo-Nodes", href: "#nodes" },
  { label: "AI Entity", href: "#entity" },
  { label: "Skillscape", href: "#skills" },
  { label: "Transmissions", href: "#contact" },
];
