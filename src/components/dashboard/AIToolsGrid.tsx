"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MessageSquare, ShieldAlert, FileText, Share2, ClipboardList, ArrowUpRight, Wand2 } from "lucide-react";
import Link from "next/link";
import { getToolHref, TOOL_DEFINITIONS, TOOL_TYPES, type ToolType } from "@/lib/tools";

const toolStyles: Record<ToolType, { icon: ReactNode; color: string; bgColor: string }> = {
  balasChat: { icon: <MessageSquare className="w-6 h-6" />, color: "from-blue-500 to-indigo-500", bgColor: "bg-blue-50 text-blue-600" },
  komplain: { icon: <ShieldAlert className="w-6 h-6" />, color: "from-rose-400 to-red-500", bgColor: "bg-rose-50 text-rose-600" },
  deskripsiProduk: { icon: <FileText className="w-6 h-6" />, color: "from-amber-400 to-orange-500", bgColor: "bg-amber-50 text-amber-600" },
  captionPromo: { icon: <Share2 className="w-6 h-6" />, color: "from-violet-500 to-purple-600", bgColor: "bg-violet-50 text-violet-600" },
  ringkasPesanan: { icon: <ClipboardList className="w-6 h-6" />, color: "from-emerald-400 to-emerald-600", bgColor: "bg-emerald-50 text-emerald-600" },
  toneConverter: { icon: <Wand2 className="w-6 h-6" />, color: "from-cyan-400 to-cyan-600", bgColor: "bg-cyan-50 text-cyan-600" },
};

export function AIToolsGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Alat AI Cerdas</h2>
          <p className="text-sm text-slate-500 mt-1">Pilih asisten yang Anda butuhkan saat ini.</p>
        </div>
      </div>

      <motion.div
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: reduceMotion ? 0 : 0.06 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {TOOL_TYPES.map((toolType) => {
          const style = toolStyles[toolType];
          const definition = TOOL_DEFINITIONS[toolType];
          return (
            <motion.div key={toolType} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <Link
                href={getToolHref(toolType)}
                className="block group relative bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-300/60 transition-all duration-300 overflow-hidden min-h-40"
              >
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-gradient-to-br ${style.color} transition-opacity duration-500`} />
                <div className="flex justify-between items-start mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${style.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    {style.icon}
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-1.5">{definition.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed pr-4">{definition.description}</p>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
