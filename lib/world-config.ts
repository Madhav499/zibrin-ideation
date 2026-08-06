export type WorldKey =
  | "hero"
  | "about"
  | "services"
  | "process"
  | "portfolio"
  | "blog"
  | "contact";

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
  about: -60,
  services: -120,
  process: -180,
  portfolio: -240,
  blog: -300,
  contact: -360,
};

export const HOME_SCROLL_Z_MIN = 0;
export const HOME_SCROLL_Z_MAX = -360;

export const ROUTE_WORLD_MAP: Record<string, WorldKey> = {
  "/": "hero",
  "/about": "about",
  "/services": "services",
  "/process": "process",
  "/portfolio": "portfolio",
  "/blog": "blog",
  "/contact": "contact",
};

export const WORLD_LABELS: Record<WorldKey, string> = {
  hero: "Hero Gateway",
  about: "About Story",
  services: "Services Universe",
  process: "6-Step Process",
  portfolio: "Portfolio Showcase",
  blog: "Insights & Tech Blog",
  contact: "Contact Destination",
};

/** Home page section → world key mapping for scroll markers */
export const HOME_SECTION_WORLDS: { id: string; world: WorldKey }[] = [
  { id: "hero", world: "hero" },
  { id: "about", world: "about" },
  { id: "services", world: "services" },
  { id: "process", world: "process" },
  { id: "portfolio", world: "portfolio" },
  { id: "blog", world: "blog" },
  { id: "contact", world: "contact" },
];

