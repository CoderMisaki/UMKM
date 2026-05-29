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

const TOOL_ALIAS_TO_TYPE = Object.fromEntries(
  Object.entries(TOOL_DEFINITIONS).flatMap(([toolType, definition]) =>
    definition.aliases.map((alias) => [alias, toolType])
  )
) as Record<ToolAlias, ToolType>;

export function normalizeToolType(value: unknown): ToolType | null {
  if (typeof value !== "string") {
    return null;
  }

  return TOOL_ALIAS_TO_TYPE[value as ToolAlias] ?? null;
}

export function getToolLabel(toolType: ToolType) {
  return TOOL_DEFINITIONS[toolType].label;
}
