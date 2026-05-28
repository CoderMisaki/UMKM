import { useCallback, useEffect, useState } from "react";
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
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  window.dispatchEvent(new CustomEvent<HistoryItem[]>(HISTORY_CHANGED_EVENT, { detail: history }));
}

export function useHistory() {
  const [history, setHistory] = useState<HistoryItem[]>(() => readHistory());

  useEffect(() => {
    const handleHistoryChanged = (event: Event) => {
      const customEvent = event as CustomEvent<HistoryItem[]>;
      setHistory(customEvent.detail ?? readHistory());
    };

    const handleStorageChanged = (event: StorageEvent) => {
      if (event.key === HISTORY_KEY) {
        setHistory(readHistory());
      }
    };

    window.addEventListener(HISTORY_CHANGED_EVENT, handleHistoryChanged);
    window.addEventListener("storage", handleStorageChanged);

    return () => {
      window.removeEventListener(HISTORY_CHANGED_EVENT, handleHistoryChanged);
      window.removeEventListener("storage", handleStorageChanged);
    };
  }, []);

  const addHistory = useCallback((item: Omit<HistoryItem, "id" | "timestamp">) => {
    const newItem: HistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      const updated = [newItem, ...prev].slice(0, MAX_HISTORY);
      try {
        writeHistory(updated);
      } catch (e) {
        console.error("Failed to save history", e);
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(HISTORY_KEY);
      window.dispatchEvent(new CustomEvent<HistoryItem[]>(HISTORY_CHANGED_EVENT, { detail: [] }));
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  }, []);

  return { history, addHistory, clearHistory };
}
