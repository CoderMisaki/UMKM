"use client";


import { MessageSquare, LayoutDashboard, Settings, LifeBuoy, X, Sparkles, ChevronRight } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-[4px_0_24px_rgba(0,0,0,0.02)] flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo area */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl p-2 shadow-sm shadow-emerald-500/20">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600">
              ReplyUMKM AI
            </span>
          </Link>
          <button
            className="lg:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu Utama</p>
            <NavItem icon={<LayoutDashboard className="w-5 h-5" />} label="Dashboard" href="/" active />
            <NavItem icon={<MessageSquare className="w-5 h-5" />} label="Balasan Cerdas" href="/app?tool=balasChat" />
            <NavItem icon={<Sparkles className="w-5 h-5" />} label="Alat Konten" href="/app?tool=caption" />
          </div>

          <div className="space-y-1">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Lainnya</p>
            <NavItem icon={<Settings className="w-5 h-5" />} label="Pengaturan" href="/pengaturan" />
            <NavItem icon={<LifeBuoy className="w-5 h-5" />} label="Bantuan & CS" href="/bantuan" />
          </div>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center justify-between w-full p-2 rounded-xl hover:bg-slate-50 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 font-bold shadow-sm">
                R
              </div>
              <div className="text-left">
                <p className="text-sm font-semibold text-slate-800">Raden Store</p>
                <p className="text-xs text-slate-500">raden@store.com</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({ icon, label, href, active = false }: { icon: React.ReactNode; label: string; href: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
        active
          ? "bg-emerald-50 text-emerald-700 font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.5)] border border-emerald-100/50"
          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
      }`}
    >
      <div className={`${active ? "text-emerald-600" : "text-slate-400"}`}>
        {icon}
      </div>
      <span className="text-sm">{label}</span>
    </Link>
  );
}
