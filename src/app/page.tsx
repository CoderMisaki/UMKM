"use client";

import { useState } from "react";
import { Sidebar, TopNavbar, HeroSection, AIToolsGrid, WidgetsSection } from "@/components/dashboard";

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto">
          <HeroSection />
          <AIToolsGrid />
          <WidgetsSection />
        </main>
      </div>
    </div>
  );
}
