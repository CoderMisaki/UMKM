"use client";

import { Menu, Search, Bell, Zap } from "lucide-react";

import { Input } from "@/components/ui/input";

interface TopNavbarProps {
  setSidebarOpen: (isOpen: boolean) => void;
}

export function TopNavbar({ setSidebarOpen }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-20 px-6 bg-white/70 backdrop-blur-xl border-b border-slate-200/50">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search Bar - hidden on very small screens */}
        <div className="hidden sm:flex items-center relative group">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 group-focus-within:text-emerald-500 transition-colors" />
          <Input
            placeholder="Cari fitur atau pelanggan..."
            className="pl-9 w-[280px] bg-slate-50/50 border-slate-200 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 rounded-xl transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Credit Usage Widget */}
        <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 bg-slate-50 border border-slate-200/60 rounded-full shadow-sm">
          <div className="bg-amber-100 text-amber-600 p-1 rounded-full">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none">Kredit AI</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-slate-800 leading-none mt-0.5">120</span>
              <span className="text-[10px] text-slate-400">/ 500</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <button className="relative p-2.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
        </button>
      </div>
    </header>
  );
}
