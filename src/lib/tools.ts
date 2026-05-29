export const DEFAULT_TOOL_TYPE = "balasChat";

export const TOOL_DEFINITIONS = {
  balasChat: {
    label: "Balas Chat",
    shortLabel: "Balas Chat",
    description: "Jawab pertanyaan harga, stok, dan info produk otomatis.",
    aliases: ["balasChat"],
  },
  komplain: {
    label: "Komplain",
    shortLabel: "Komplain",
    description: "Ubah komplain pelanggan menjadi balasan sopan dan solutif.",
    aliases: ["komplain"],
  },
  deskripsiProduk: {
    label: "Deskripsi Produk",
    shortLabel: "Deskripsi",
    description: "Buat deskripsi produk yang jelas, menarik, dan tidak berlebihan.",
    aliases: ["deskripsiProduk", "deskripsi"],
  },
  captionPromo: {
    label: "Caption Promo",
    shortLabel: "Caption",
    description: "Generate caption promo untuk media sosial dan kampanye penjualan.",
    aliases: ["captionPromo", "caption"],
  },
  ringkasPesanan: {
    label: "Ringkas Pesanan",
    shortLabel: "Ringkas",
    description: "Ekstrak data pesanan dari chat pelanggan yang berantakan.",
    aliases: ["ringkasPesanan", "ringkas"],
  },
  toneConverter: {
    label: "Ubah Nada",
    shortLabel: "Ubah Nada",
    description: "Ubah nada pesan tanpa mengubah makna aslinya.",
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

export function getToolDefinition(value: unknown) {
  return TOOL_DEFINITIONS[normalizeToolTypeOrDefault(value)];
}

export function getToolLabel(value: unknown) {
  return getToolDefinition(value).label;
}

export function getToolHref(toolType: ToolType) {
  return `/app?tool=${toolType}`;
}
