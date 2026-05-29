"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { MessageSquare, LayoutDashboard, History, Trash2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";
import { getToolHref, getToolLabel, TOOL_TYPES } from "@/lib/tools";

export default function AppLayout({ children }: { children: ReactNode }) {
  const { history, clearHistory } = useHistory();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2 min-h-10">
            <div className="bg-primary rounded-lg p-1">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">ReplyUMKM</span>
          </Link>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto" aria-label="Navigasi aplikasi">
          <div className="space-y-1">
            <Link href="/app" className="flex items-center gap-2 px-3 py-2 min-h-10 bg-primary/10 text-primary rounded-lg font-medium">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard AI
            </Link>
            {TOOL_TYPES.map((toolType) => (
              <Link key={toolType} href={getToolHref(toolType)} className="flex items-center gap-2 px-3 py-2 min-h-10 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <MessageSquare className="w-4 h-4" />
                {getToolLabel(toolType)}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between px-3 mb-2 text-sm font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Riwayat (5 Terakhir)
              </div>
              {history.length > 0 && (
                <button type="button" onClick={clearHistory} className="min-h-8 min-w-8 text-destructive hover:underline" title="Hapus Riwayat" aria-label="Hapus riwayat">
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="space-y-2 px-3">
              {history.length === 0 ? (
                <div className="text-sm text-muted-foreground italic">Belum ada riwayat.</div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="text-xs border rounded p-2 bg-secondary text-secondary-foreground truncate" title={item.result}>
                    <span className="font-semibold block mb-1">{getToolLabel(item.toolType)}</span>
                    {item.result.substring(0, 40)}...
                  </div>
                ))
              )}
            </div>
          </div>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="md:hidden border-b bg-card p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 min-h-10">
            <div className="bg-primary rounded-lg p-1">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">ReplyUMKM</span>
          </Link>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
