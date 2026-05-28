import { useState, useCallback, useRef, useEffect } from "react";
import { useHistory } from "@/hooks/use-history";
import type { ToolType } from "@/lib/tools";

interface UseAiToolOptions {
  toolType: ToolType;
}

export function useAiTool({ toolType }: UseAiToolOptions) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const { addHistory } = useHistory();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  const reset = useCallback(() => {
    setResult("");
    setError("");
    setLoading(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const generate = useCallback(
    async (prompt: Record<string, string>) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setLoading(true);
      setResult("");
      setError("");

      let finalResult = "";

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ toolType, prompt }),
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || "Gagal membuat konten.");
        }

        if (!response.body) {
          throw new Error("Stream body tidak tersedia.");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const dataStr = line.slice(6);
              try {
                const data = JSON.parse(dataStr);
                if (data.error) {
                  throw new Error(data.error);
                }
                if (data.done) {
                  // stream complete
                } else if (data.text) {
                  finalResult += data.text;
                  setResult(finalResult);
                }
              } catch (e) {
                console.error("Failed to parse SSE data", e);
              }
            }
          }
        }

        if (finalResult) {
            addHistory({
                toolType,
                prompt,
                result: finalResult
            });
        }

      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") {
          console.log("Request aborted");
        } else {
          setError(err instanceof Error ? err.message : "Terjadi kesalahan");
        }
      } finally {
        setLoading(false);
      }
    },
    [toolType, addHistory]
  );

  const copyResult = useCallback(async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy text", e);
    }
  }, [result]);

  return {
    loading,
    result,
    error,
    copied,
    generate,
    copyResult,
    reset,
  };
}
