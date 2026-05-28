import { useCallback, useSyncExternalStore } from "react";
import type { HistoryItem } from "@/lib/types";

const HISTORY_KEY = "replyumkm_history";
const HISTORY_CHANGED_EVENT = "replyumkm_history_changed";
const MAX_HISTORY = 5;

function readHistory(): HistoryItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) {
      return [];
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
}

function writeHistory(history: HistoryItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent<HistoryItem[]>(HISTORY_CHANGED_EVENT, { detail: history }));
}

function subscribe(callback: () => void) {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(HISTORY_CHANGED_EVENT, callback);
  window.addEventListener("storage", (e) => {
    if (e.key === HISTORY_KEY) callback();
  });

  return () => {
    window.removeEventListener(HISTORY_CHANGED_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

let cachedHistory: HistoryItem[] | null = null;
let lastStoredValue: string | null = null;

function getSnapshot() {
  if (typeof window === "undefined") return [];

  const stored = localStorage.getItem(HISTORY_KEY);
  if (stored !== lastStoredValue) {
    lastStoredValue = stored;
    cachedHistory = readHistory();
  }
  return cachedHistory || [];
}

function getServerSnapshot() {
  return [];
}

export function useHistory() {
  const history = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const addHistory = useCallback((item: Omit<HistoryItem, "id" | "timestamp">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
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
