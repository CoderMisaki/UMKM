"use client";

import { motion } from "framer-motion";
import { MessageSquare, ShieldAlert, FileText, Share2, ClipboardList, Wand2, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    title: "Balas Chat",
    description: "Jawab pertanyaan harga, stok, dan info produk otomatis.",
    icon: <MessageSquare className="w-6 h-6" />,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-50 text-blue-600",
    href: "/app?tool=balasChat"
  },
  {
    title: "Komplain Assist",
    description: "Ubah komplain menjadi solusi sopan dan empatik.",
    icon: <ShieldAlert className="w-6 h-6" />,
    color: "from-rose-400 to-red-500",
    bgColor: "bg-rose-50 text-rose-600",
    href: "/app?tool=komplain"
  },
  {
    title: "Deskripsi Produk",
    description: "Buat deskripsi persuasif untuk marketplace.",
    icon: <FileText className="w-6 h-6" />,
    color: "from-amber-400 to-orange-500",
    bgColor: "bg-amber-50 text-amber-600",
    href: "/app?tool=deskripsi"
  },
  {
    title: "Caption Promosi",
    description: "Generate caption IG/TikTok untuk menarik pelanggan.",
    icon: <Share2 className="w-6 h-6" />,
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50 text-violet-600",
    href: "/app?tool=caption"
  },
  {
    title: "Ringkas Pesanan",
    description: "Ekstrak otomatis data pesanan dari chat berantakan.",
    icon: <ClipboardList className="w-6 h-6" />,
    color: "from-emerald-400 to-emerald-600",
    bgColor: "bg-emerald-50 text-emerald-600",
    href: "/app?tool=ringkas"
  },
  {
    title: "Tone Converter",
    description: "Ubah nada bahasa pesan menjadi formal atau santai.",
    icon: <Wand2 className="w-6 h-6" />,
    color: "from-cyan-400 to-cyan-600",
    bgColor: "bg-cyan-50 text-cyan-600",
    href: "/app"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export function AIToolsGrid() {
  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Alat AI Cerdas</h2>
          <p className="text-sm text-slate-500 mt-1">Pilih asisten yang Anda butuhkan saat ini.</p>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {features.map((feature, idx) => (
          <motion.div key={idx} variants={item}>
            <Link
              href={feature.href}
              className="block group relative bg-white rounded-2xl p-5 border border-slate-200/60 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-300/60 transition-all duration-300 overflow-hidden"
            >
              {/* Subtle hover gradient background */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-[0.03] bg-gradient-to-br ${feature.color} transition-opacity duration-500`}></div>

              <div className="flex justify-between items-start mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-1.5">{feature.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed pr-4">
                {feature.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
