"use client";

import type { ReactNode } from "react";
import dynamic from "next/dynamic";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, ShieldAlert, FileText, Share2, ClipboardList, Wand2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { TOOL_DEFINITIONS, TOOL_TYPES, normalizeToolTypeOrDefault, isToolType, type ToolType } from "@/lib/tools";

const BalasChat = dynamic(() => import("@/components/tools/BalasChat").then((mod) => mod.BalasChat));
const Komplain = dynamic(() => import("@/components/tools/Komplain").then((mod) => mod.Komplain));
const DeskripsiProduk = dynamic(() => import("@/components/tools/DeskripsiProduk").then((mod) => mod.DeskripsiProduk));
const CaptionPromo = dynamic(() => import("@/components/tools/CaptionPromo").then((mod) => mod.CaptionPromo));
const RingkasPesanan = dynamic(() => import("@/components/tools/RingkasPesanan").then((mod) => mod.RingkasPesanan));
const ToneConverter = dynamic(() => import("@/components/tools/ToneConverter").then((mod) => mod.ToneConverter));

const TOOL_ICONS: Record<ToolType, ReactNode> = {
  balasChat: <MessageSquare className="w-4 h-4 hidden md:block" />,
  komplain: <ShieldAlert className="w-4 h-4 hidden md:block" />,
  deskripsiProduk: <FileText className="w-4 h-4 hidden md:block" />,
  captionPromo: <Share2 className="w-4 h-4 hidden md:block" />,
  ringkasPesanan: <ClipboardList className="w-4 h-4 hidden md:block" />,
  toneConverter: <Wand2 className="w-4 h-4 hidden md:block" />,
};

const TOOL_COMPONENTS: Record<ToolType, ReactNode> = {
  balasChat: <BalasChat />,
  komplain: <Komplain />,
  deskripsiProduk: <DeskripsiProduk />,
  captionPromo: <CaptionPromo />,
  ringkasPesanan: <RingkasPesanan />,
  toneConverter: <ToneConverter />,
};

export function AppToolsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTool = normalizeToolTypeOrDefault(searchParams.get("tool"));

  const handleTabChange = (value: unknown) => {
    if (!isToolType(value)) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("tool", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={activeTool} onValueChange={handleTabChange} className="w-full">
      <TabsList className="flex w-full overflow-x-auto snap-x md:grid md:grid-cols-6 h-auto md:h-14 bg-card border shadow-sm rounded-xl mb-6 p-1" aria-label="Pilih alat AI">
        {TOOL_TYPES.map((toolType, index) => (
          <TabsTrigger
            key={toolType}
            value={toolType}
            className={`flex items-center gap-2 py-2 md:py-3 rounded-lg whitespace-nowrap min-h-10 snap-start ${index % 2 === 0 ? "data-active:bg-primary data-active:text-primary-foreground" : "data-active:bg-accent data-active:text-accent-foreground"}`}
          >
            {TOOL_ICONS[toolType]}
            {TOOL_DEFINITIONS[toolType].shortLabel}
          </TabsTrigger>
        ))}
      </TabsList>

      <div className="bg-card border rounded-xl p-4 md:p-6 shadow-sm overflow-x-hidden">
        {TOOL_TYPES.map((toolType) => (
          <TabsContent key={toolType} value={toolType} className="m-0 focus-visible:outline-none focus-visible:ring-0">
            {TOOL_COMPONENTS[toolType]}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
