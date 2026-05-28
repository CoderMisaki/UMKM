"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ShieldAlert, FileText, Share2, ClipboardList } from "lucide-react";
import { BalasChat } from "@/components/tools/BalasChat";
import { Komplain } from "@/components/tools/Komplain";
import { DeskripsiProduk } from "@/components/tools/DeskripsiProduk";
import { CaptionPromo } from "@/components/tools/CaptionPromo";
import { RingkasPesanan } from "@/components/tools/RingkasPesanan";
import { ToneConverter } from "@/components/tools/ToneConverter";
import { Wand2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

const VALID_TOOLS = ["balasChat", "komplain", "deskripsi", "caption", "ringkas", "toneConverter"] as const;

function DashboardContent() {
  const searchParams = useSearchParams();
  const tabFromQuery = searchParams.get("tool");
  const defaultTool = VALID_TOOLS.includes(tabFromQuery as (typeof VALID_TOOLS)[number])
    ? tabFromQuery
    : "balasChat";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard AI</h1>
        <p className="text-muted-foreground">Pilih alat AI yang ingin Anda gunakan hari ini.</p>
      </div>

      <Tabs defaultValue={defaultTool} className="w-full">
        <TabsList className="flex w-full overflow-x-auto snap-x md:grid md:grid-cols-6 h-auto md:h-14 bg-card border shadow-sm rounded-xl mb-6 p-1">
          <TabsTrigger value="balasChat" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
            <MessageSquare className="w-4 h-4 hidden md:block" />
            Balas Chat
          </TabsTrigger>
          <TabsTrigger value="komplain" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
            <ShieldAlert className="w-4 h-4 hidden md:block" />
            Komplain
          </TabsTrigger>
          <TabsTrigger value="deskripsi" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
            <FileText className="w-4 h-4 hidden md:block" />
            Deskripsi
          </TabsTrigger>
          <TabsTrigger value="caption" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
            <Share2 className="w-4 h-4 hidden md:block" />
            Caption
          </TabsTrigger>
          <TabsTrigger value="ringkas" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground py-2 md:py-3 rounded-lg col-span-2 md:col-span-1 whitespace-nowrap">
            <ClipboardList className="w-4 h-4 hidden md:block" />
            Ringkas
          </TabsTrigger>

          <TabsTrigger value="toneConverter" className="flex items-center gap-2 data-[state=active]:bg-accent data-[state=active]:text-accent-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
            <Wand2 className="w-4 h-4 hidden md:block" />
            Ubah Nada
          </TabsTrigger>
        </TabsList>

        <div className="bg-card border rounded-xl p-4 md:p-6 shadow-sm">
          <TabsContent value="balasChat" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <BalasChat />
          </TabsContent>
          <TabsContent value="komplain" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <Komplain />
          </TabsContent>
          <TabsContent value="deskripsi" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <DeskripsiProduk />
          </TabsContent>
          <TabsContent value="caption" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <CaptionPromo />
          </TabsContent>
          <TabsContent value="ringkas" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <RingkasPesanan />
          </TabsContent>
          <TabsContent value="toneConverter" className="m-0 focus-visible:outline-none focus-visible:ring-0">
            <ToneConverter />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Memuat...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
