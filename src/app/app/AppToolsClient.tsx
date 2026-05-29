"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ShieldAlert, FileText, Share2, ClipboardList, Wand2 } from "lucide-react";
import { BalasChat } from "@/components/tools/BalasChat";
import { Komplain } from "@/components/tools/Komplain";
import { DeskripsiProduk } from "@/components/tools/DeskripsiProduk";
import { CaptionPromo } from "@/components/tools/CaptionPromo";
import { RingkasPesanan } from "@/components/tools/RingkasPesanan";
import { ToneConverter } from "@/components/tools/ToneConverter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { normalizeToolTypeOrDefault, isToolType, type ToolType } from "@/lib/tools";

function getActiveTool(toolParam: string | null): ToolType {
  return normalizeToolTypeOrDefault(toolParam);
}

export function AppToolsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTool = getActiveTool(searchParams.get("tool"));

  const handleTabChange = (value: unknown) => {
    if (!isToolType(value)) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("tool", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={activeTool} onValueChange={handleTabChange} className="w-full">
      <TabsList className="flex w-full overflow-x-auto snap-x md:grid md:grid-cols-6 h-auto md:h-14 bg-card border shadow-sm rounded-xl mb-6 p-1">
        <TabsTrigger value="balasChat" className="flex items-center gap-2 data-active:bg-primary data-active:text-primary-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
          <MessageSquare className="w-4 h-4 hidden md:block" />
          Balas Chat
        </TabsTrigger>
        <TabsTrigger value="komplain" className="flex items-center gap-2 data-active:bg-accent data-active:text-accent-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
          <ShieldAlert className="w-4 h-4 hidden md:block" />
          Komplain
        </TabsTrigger>
        <TabsTrigger value="deskripsiProduk" className="flex items-center gap-2 data-active:bg-primary data-active:text-primary-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
          <FileText className="w-4 h-4 hidden md:block" />
          Deskripsi
        </TabsTrigger>
        <TabsTrigger value="captionPromo" className="flex items-center gap-2 data-active:bg-accent data-active:text-accent-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
          <Share2 className="w-4 h-4 hidden md:block" />
          Caption
        </TabsTrigger>
        <TabsTrigger value="ringkasPesanan" className="flex items-center gap-2 data-active:bg-primary data-active:text-primary-foreground py-2 md:py-3 rounded-lg col-span-2 md:col-span-1 whitespace-nowrap">
          <ClipboardList className="w-4 h-4 hidden md:block" />
          Ringkas
        </TabsTrigger>

        <TabsTrigger value="toneConverter" className="flex items-center gap-2 data-active:bg-accent data-active:text-accent-foreground py-2 md:py-3 rounded-lg whitespace-nowrap">
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
        <TabsContent value="deskripsiProduk" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <DeskripsiProduk />
        </TabsContent>
        <TabsContent value="captionPromo" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <CaptionPromo />
        </TabsContent>
        <TabsContent value="ringkasPesanan" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <RingkasPesanan />
        </TabsContent>
        <TabsContent value="toneConverter" className="m-0 focus-visible:outline-none focus-visible:ring-0">
          <ToneConverter />
        </TabsContent>
      </div>
    </Tabs>
  );
}
