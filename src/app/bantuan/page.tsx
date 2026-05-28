"use client";

import { useState } from "react";
import { Sidebar, TopNavbar } from "@/components/dashboard";
import { LifeBuoy } from "lucide-react";

export default function BantuanPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <div className="bg-white rounded-3xl p-8 border border-slate-200/60 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.02)] flex flex-col items-center justify-center min-h-[500px]">
            <LifeBuoy className="w-16 h-16 text-slate-300 mb-4" />
            <h1 className="text-2xl font-bold text-slate-800 mb-2">Bantuan & CS</h1>
            <p className="text-slate-500">Pusat bantuan sedang dalam pengembangan.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
