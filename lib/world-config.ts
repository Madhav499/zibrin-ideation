export type WorldKey =
  | "hero"
  | "about"
  | "services"
  | "process"
  | "portfolio"
  | "tech"
  | "ai-lab"
  | "trust"
  | "contact"
  | "builder";

export const BRAND_COLORS = {
  spaceBlack: 0x05070f,
  electricBlue: 0x2f80ff,
  neonViolet: 0x8b5cff,
  cyanGlow: 0x3ef2ff,
  goldAccent: 0xd4af37,
} as const;

/** Camera sits this far in front of each world's focal plane */
export const CAMERA_OFFSET = 18;

/** Z coordinates for every world zone in the persistent scene */
export const WORLD_Z: Record<WorldKey, number> = {
  hero: 0,
  about: -80,
  services: -160,
  process: -240,
  portfolio: -320,
  tech: -400,
  "ai-lab": -480,
  trust: -560,
  contact: -640,
  builder: -640,
};

export const HOME_SCROLL_Z_MIN = 0;
export const HOME_SCROLL_Z_MAX = -640;

export const ROUTE_WORLD_MAP: Record<string, WorldKey> = {
  "/": "hero",
  "/about": "about",
  "/services": "services",
  "/process": "process",
  "/portfolio": "portfolio",
  "/contact": "contact",
  "/builder": "builder",
};

export const WORLD_LABELS: Record<WorldKey, string> = {
  hero: "Hero Command Center",
  about: "Innovation Chamber",
  services: "Services Galaxy",
  process: "Production Pipeline",
  portfolio: "Case Monoliths",
  tech: "Technology Universe",
  "ai-lab": "AI Laboratory",
  trust: "Global Trust Command",
  contact: "Contact Console",
  builder: "Product Configurator",
};

/** Home page section → world key mapping for scroll markers */
export const HOME_SECTION_WORLDS: { id: string; world: WorldKey }[] = [
  { id: "hero", world: "hero" },
  { id: "about", world: "about" },
  { id: "galaxy", world: "services" },
  { id: "process", world: "process" },
  { id: "portfolio", world: "portfolio" },
  { id: "technologies", world: "tech" },
  { id: "ai-lab", world: "ai-lab" },
  { id: "trust", world: "trust" },
  { id: "product-builder", world: "builder" },
];
