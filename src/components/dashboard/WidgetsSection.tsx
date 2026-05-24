"use client";

import { motion } from "framer-motion";
import { Clock, Lightbulb, Copy, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export function WidgetsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Recent Activity */}
      <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/60 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.02)] p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-slate-400" />
            <h3 className="font-bold text-slate-800 text-lg">Aktivitas Terakhir</h3>
          </div>
          <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
            Lihat Semua
          </button>
        </div>

        <div className="space-y-4">
          <ActivityItem
            title="Balasan Chat Dibuat"
            desc="Pertanyaan tentang ongkos kirim ke Surabaya"
            time="2 menit yang lalu"
            type="chat"
          />
          <ActivityItem
            title="Caption Promosi IG"
            desc="Promo akhir bulan untuk produk Sepatu Sneakers"
            time="1 jam yang lalu"
            type="promo"
          />
          <ActivityItem
            title="Komplain Terselesaikan"
            desc="Barang diterima dalam kondisi cacat box"
            time="Kemarin, 14:30"
            type="complain"
          />
        </div>
      </div>

      {/* AI Tips Widget */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100/50 shadow-[0_2px_20px_-3px_rgba(0,0,0,0.02)] p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Lightbulb className="w-24 h-24 text-indigo-500" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-indigo-100 p-2 rounded-xl text-indigo-600">
              <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-indigo-900 text-lg">Tips AI Hari Ini</h3>
          </div>

          <p className="text-indigo-800/80 text-sm leading-relaxed mb-6">
            Tambahkan detail seperti ukuran atau bahan baku saat meminta AI membuat deskripsi produk untuk hasil yang lebih akurat.
          </p>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-100">
            <p className="text-xs font-medium text-indigo-900 mb-2">Contoh Prompt:</p>
            <div className="flex items-start justify-between gap-2">
              <p className="text-xs text-indigo-700/80 italic">&quot;Buat deskripsi untuk Tas Selempang Kanvas, warna hitam, anti air, cocok untuk kuliah.&quot;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityItem({ title, desc, time, type }: { title: string, desc: string, time: string, type: 'chat' | 'promo' | 'complain' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all"
    >
      <div className="flex items-start gap-4">
        <div className={`mt-1 sm:mt-0 w-2 h-2 rounded-full ${type === 'chat' ? 'bg-blue-500' : type === 'promo' ? 'bg-violet-500' : 'bg-rose-500'}`}></div>
        <div>
          <h4 className="text-sm font-bold text-slate-800">{title}</h4>
          <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">{desc}</p>
          <span className="text-xs text-slate-400 mt-2 block sm:hidden">{time}</span>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 pl-6 sm:pl-0">
        <span className="text-xs text-slate-400 hidden sm:block whitespace-nowrap">{time}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-all shadow-sm"
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600">Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Salin</span>
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}
