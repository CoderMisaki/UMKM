"use client";

import Link from "next/link";
import { MessageSquare, LayoutDashboard, History, Trash2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { history, clearHistory } = useHistory();

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - Desktop */}
      <aside className="w-64 border-r bg-card hidden md:flex flex-col">
        <div className="p-4 border-b">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">ReplyUMKM</span>
          </Link>
        </div>

        <nav className="p-4 flex-1">
          <div className="space-y-1">
            <Link href="/app" className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg font-medium">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          <div className="mt-8">
            <div className="flex items-center justify-between px-3 mb-2 text-sm font-semibold text-muted-foreground">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4" />
                Riwayat (5 Terakhir)
              </div>
              {history.length > 0 && (
                <button onClick={clearHistory} className="text-destructive hover:underline" title="Hapus Riwayat">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="space-y-2 px-3">
              {history.length === 0 ? (
                <div className="text-sm text-muted-foreground italic">Belum ada riwayat.</div>
              ) : (
                history.map((item) => (
                  <div key={item.id} className="text-xs border rounded p-2 bg-secondary text-secondary-foreground truncate">
                    <span className="font-semibold block mb-1">
                      {item.toolType === "balasChat" ? "Balas Chat" :
                       item.toolType === "komplain" ? "Komplain" :
                       item.toolType === "deskripsiProduk" ? "Deskripsi" :
                       item.toolType === "captionPromo" ? "Caption" :
                       item.toolType === "toneConverter" ? "Ubah Nada" : "Ringkasan"}
                    </span>
                    {item.result.substring(0, 40)}...
                  </div>
                ))
              )}
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden border-b bg-card p-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-lg p-1">
              <MessageSquare className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">ReplyUMKM</span>
          </Link>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
