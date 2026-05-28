export type ToolType = "balasChat" | "komplain" | "deskripsiProduk" | "captionPromo" | "ringkasPesanan" | "toneConverter";

export interface HistoryItem {
  id: string;
  toolType: ToolType;
  prompt: Record<string, string>; // We'll keep it flexible since different tools have different inputs
  result: string;
  timestamp: number;
}
