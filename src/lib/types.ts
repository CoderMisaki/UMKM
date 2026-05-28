import type { ToolType } from "@/lib/tools";

export type { ToolType };

export interface HistoryItem {
  id: string;
  toolType: ToolType;
  prompt: Record<string, string>;
  result: string;
  timestamp: number;
}
