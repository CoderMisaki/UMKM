"use client";

import type { ReactNode } from "react";
import { CheckCircle2, Copy, RotateCcw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ToolResultPanelProps {
  title: string;
  result: string;
  error: string;
  loading: boolean;
  copied: boolean;
  onCopy: () => void;
  onClear: () => void;
  emptyText?: string;
  loadingText?: string;
  skeletonLines?: number;
  privacyNote?: ReactNode;
}

export function ToolResultPanel({
  title,
  result,
  error,
  loading,
  copied,
  onCopy,
  onClear,
  emptyText = "Hasil akan muncul di sini...",
  loadingText = "AI sedang memproses...",
  skeletonLines = 4,
  privacyNote,
}: ToolResultPanelProps) {
  return (
    <div className="border rounded-xl p-4 bg-muted/50 flex flex-col min-h-[320px]">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {privacyNote ? <div className="mt-1 text-xs text-muted-foreground">{privacyNote}</div> : null}
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={loading && !result && !error}
          aria-label="Bersihkan hasil"
          className="min-h-9"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Clear
        </Button>
      </div>

      {error ? (
        <div role="alert" className="mb-3 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      ) : null}

      <div className="flex-1 bg-card border rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm text-foreground min-h-48" aria-live="polite">
        {loading && !result ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground animate-pulse">
              <Sparkles className="h-4 w-4" />
              {loadingText}
            </div>
            {Array.from({ length: skeletonLines }).map((_, index) => (
              <Skeleton key={index} className={`h-4 ${index % 3 === 0 ? "w-full" : index % 3 === 1 ? "w-5/6" : "w-4/6"}`} />
            ))}
          </div>
        ) : result ? (
          result
        ) : (
          <span className="text-muted-foreground italic">{emptyText}</span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button type="button" variant="outline" onClick={onCopy} disabled={!result || loading} className="w-full bg-card min-h-10">
          {copied ? (
            <>
              <CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Disalin!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" /> Salin Teks
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onClear} disabled={loading && !result && !error} className="w-full bg-card min-h-10">
          <RotateCcw className="w-4 h-4 mr-2" /> Bersihkan
        </Button>
      </div>
    </div>
  );
}
