import { useCallback, useSyncExternalStore } from "react";
import { normalizeToolType, type ToolType } from "@/lib/tools";
import type { HistoryItem } from "@/lib/types";

const HISTORY_KEY = "replyumkm_history";
const HISTORY_CHANGED_EVENT = "replyumkm_history_changed";
const MAX_HISTORY = 5;
const EMPTY_HISTORY: HistoryItem[] = [];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function normalizeStringRecord(value: unknown): Record<string, string> {
  if (!isRecord(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter((entry): entry is [string, string] => typeof entry[1] === "string")
  );
}

function createHistoryId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function normalizeHistoryItem(value: unknown): HistoryItem | null {
  if (!isRecord(value)) {
    return null;
  }

  const toolType = normalizeToolType(value.toolType);
  if (!toolType || typeof value.result !== "string") {
    return null;
  }

  return {
    id: typeof value.id === "string" ? value.id : createHistoryId(),
    toolType,
    prompt: normalizeStringRecord(value.prompt),
    result: value.result,
    timestamp: typeof value.timestamp === "number" ? value.timestamp : Date.now(),
  };
}

function readHistory(): HistoryItem[] {
  if (typeof window === "undefined") {
    return EMPTY_HISTORY;
  }

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) {
      return EMPTY_HISTORY;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      return EMPTY_HISTORY;
    }

    return parsed.map(normalizeHistoryItem).filter((item): item is HistoryItem => item !== null);
  } catch (e) {
    console.error("Failed to load history", e);
    return EMPTY_HISTORY;
  }
}

function writeHistory(history: HistoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent<HistoryItem[]>(HISTORY_CHANGED_EVENT, { detail: history }));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  const handleStorage = (event: StorageEvent) => {
    if (event.key === HISTORY_KEY) callback();
  };

  window.addEventListener(HISTORY_CHANGED_EVENT, callback);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(HISTORY_CHANGED_EVENT, callback);
    window.removeEventListener("storage", handleStorage);
  };
}

let cachedHistory: HistoryItem[] = EMPTY_HISTORY;
let lastStoredValue: string | null = null;

function getSnapshot() {
  if (typeof window === "undefined") return EMPTY_HISTORY;

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored !== lastStoredValue) {
      lastStoredValue = stored;
      cachedHistory = readHistory();
    }
  } catch (e) {
    console.error("Failed to read history snapshot", e);
    cachedHistory = EMPTY_HISTORY;
    lastStoredValue = null;
  }

  return cachedHistory;
}

function getServerSnapshot() {
  return EMPTY_HISTORY;
}

export function useHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addHistory = useCallback((item: Omit<HistoryItem, "id" | "timestamp">) => {
    const toolType: ToolType | null = normalizeToolType(item.toolType);
    if (!toolType) {
      console.warn("Skipping history item with invalid toolType", item.toolType);
      return;
    }

    const newItem: HistoryItem = {
      ...item,
      toolType,
      id: createHistoryId(),
      timestamp: Date.now(),
    };

    const currentHistory = readHistory();
    const updated = [newItem, ...currentHistory].slice(0, MAX_HISTORY);
    try {
      writeHistory(updated);
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, []);

  const clearHistory = useCallback(() => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(HISTORY_KEY);
        window.dispatchEvent(new CustomEvent<HistoryItem[]>(HISTORY_CHANGED_EVENT, { detail: [] }));
      }
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  }, []);

  return { history, addHistory, clearHistory };
}
