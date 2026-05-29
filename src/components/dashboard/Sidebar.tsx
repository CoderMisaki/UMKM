"use client";

import type { ReactNode } from "react";
import { MessageSquare, LayoutDashboard, Settings, LifeBuoy, X, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getToolHref } from "@/lib/tools";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {isOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-label="Tutup sidebar"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-2 shadow-sm shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">ReplyUMKM AI</span>
          </Link>
          <button type="button" className="lg:hidden min-h-10 min-w-10 text-slate-500 hover:text-slate-700" onClick={() => setIsOpen(false)} aria-label="Tutup sidebar">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu Utama</p>
            <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" href="/" onNavigate={() => setIsOpen(false)} />
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Balas Chat" href={getToolHref("balasChat")} onNavigate={() => setIsOpen(false)} />
            <NavItem icon={<Sparkles className="w-5 h-5" />} label="Caption Promo" href={getToolHref("captionPromo")} onNavigate={() => setIsOpen(false)} />
            <NavItem icon={<Sparkles className="w-5 h-5" />} label="Semua Alat AI" href="/app" onNavigate={() => setIsOpen(false)} />
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Lainnya</p>
            <NavItem icon={<Settings className="w-5 h-5" />} label="Pengaturan" href="/pengaturan" onNavigate={() => setIsOpen(false)} />
            <NavItem icon={<LifeBuoy className="w-5 h-5" />} label="Bantuan & CS" href="/bantuan" onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, href, onNavigate }: { icon: ReactNode; label: string; href: string; onNavigate: () => void }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname === href.split("?")[0];

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`flex items-center gap-3 px-3 py-2.5 min-h-11 rounded-xl transition-all ${
        active
          ? "bg-emerald-50 text-emerald-700 font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] border border-emerald-100/50"
          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className={active ? "text-emerald-600" : "text-slate-500"}>{icon}</div>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
