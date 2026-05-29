export const DEFAULT_TOOL_TYPE = "balasChat";

export const TOOL_DEFINITIONS = {
  balasChat: {
    label: "Balas Chat",
    aliases: ["balasChat"],
  },
  komplain: {
    label: "Komplain",
    aliases: ["komplain"],
  },
  deskripsiProduk: {
    label: "Deskripsi Produk",
    aliases: ["deskripsiProduk", "deskripsi"],
  },
  captionPromo: {
    label: "Caption Promo",
    aliases: ["captionPromo", "caption"],
  },
  ringkasPesanan: {
    label: "Ringkas Pesanan",
    aliases: ["ringkasPesanan", "ringkas"],
  },
  toneConverter: {
    label: "Ubah Nada",
    aliases: ["toneConverter", "tone"],
  },
} as const;

export type ToolType = keyof typeof TOOL_DEFINITIONS;
export type ToolAlias = (typeof TOOL_DEFINITIONS)[ToolType]["aliases"][number];

export const TOOL_TYPES = Object.keys(TOOL_DEFINITIONS) as ToolType[];

const TOOL_ALIAS_TO_TYPE = Object.fromEntries(
  Object.entries(TOOL_DEFINITIONS).flatMap(([toolType, definition]) =>
    definition.aliases.map((alias) => [alias, toolType])
  )
) as Record<ToolAlias, ToolType>;

export function isToolType(value: unknown): value is ToolType {
  return typeof value === "string" && value in TOOL_DEFINITIONS;
}

export function normalizeToolType(value: unknown): ToolType | null {
  if (typeof value !== "string") {
    return null;
  }

  return TOOL_ALIAS_TO_TYPE[value as ToolAlias] ?? null;
}

export function normalizeToolTypeOrDefault(value: unknown): ToolType {
  return normalizeToolType(value) ?? DEFAULT_TOOL_TYPE;
}

export function getToolLabel(value: unknown) {
  return TOOL_DEFINITIONS[normalizeToolTypeOrDefault(value)].label;
}
