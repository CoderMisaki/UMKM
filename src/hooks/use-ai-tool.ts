import { useState, useCallback, useRef, useEffect } from "react";
import { useHistory } from "@/hooks/use-history";
import type { ToolType } from "@/lib/tools";

interface UseAiToolOptions {
  toolType: ToolType;
  saveHistory?: boolean;
}

function parseSseData(line: string) {
  try {
    return JSON.parse(line.slice(6)) as { text?: string; done?: boolean; error?: string };
  } catch {
    throw new Error("Format stream AI tidak valid. Silakan coba lagi.");
  }
}

async function copyTextWithFallback(text: string) {
  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fallback manual untuk browser/perizinan yang memblokir Clipboard API.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Gagal menyalin teks. Silakan blok dan salin manual.");
  }
}

export function useAiTool({ toolType, saveHistory = true }: UseAiToolOptions) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const { addHistory } = useHistory();
  const abortControllerRef = useRef<AbortController | null>(null);
  const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
      if (copiedTimeoutRef.current) {
        clearTimeout(copiedTimeoutRef.current);
      }
    };
  }, []);

  const clearCopiedTimer = useCallback(() => {
    if (copiedTimeoutRef.current) {
      clearTimeout(copiedTimeoutRef.current);
      copiedTimeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    clearCopiedTimer();
    setResult("");
    setError("");
    setCopied(false);
    setLoading(false);
  }, [clearCopiedTimer]);

  const generate = useCallback(
    async (prompt: Record<string, string>) => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setResult("");
      setError("");
      setCopied(false);

      let finalResult = "";
      let streamDone = false;

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ toolType, prompt }),
          signal: controller.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            typeof errorData.error === "string" ? errorData.error : "Gagal membuat konten. Silakan coba lagi."
          );
        }

        if (!response.body) {
          throw new Error("Stream AI tidak tersedia. Silakan coba lagi.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (!streamDone) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const events = buffer.split("\n\n");
          buffer = events.pop() || "";

          for (const event of events) {
            const line = event.split("\n").find((item) => item.startsWith("data: "));
            if (!line) continue;

            const data = parseSseData(line);
            if (typeof data.error === "string" && data.error) {
              throw new Error(data.error);
            }

            if (data.done) {
              streamDone = true;
              break;
            }

            if (typeof data.text === "string") {
              finalResult += data.text;
              setResult(finalResult);
            }
          }
        }

        if (finalResult && saveHistory) {
          addHistory({ toolType, prompt, result: finalResult });
        }
      } catch (err: unknown) {
        if (!(err instanceof Error && err.name === "AbortError")) {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan. Silakan coba lagi.");
        }
      } finally {
        setLoading(false);
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    [addHistory, saveHistory, toolType]
  );

  const copyResult = useCallback(async () => {
    if (!result) return;

    try {
      await copyTextWithFallback(result);
      setError("");
      setCopied(true);
      clearCopiedTimer();
      copiedTimeoutRef.current = setTimeout(() => {
        setCopied(false);
        copiedTimeoutRef.current = null;
      }, 2_000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal menyalin teks.");
    }
  }, [clearCopiedTimer, result]);

  return { loading, result, error, copied, generate, copyResult, reset };
}
