"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/10 mb-8"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4">
        <div className="w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Abstract Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjE1KSIvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay"></div>

      <div className="relative p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-sm font-medium text-white mb-6 shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>AI Assistant Aktif & Siap Membantu</span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight drop-shadow-sm">
            Tingkatkan Penjualan Anda <br className="hidden lg:block" />
            <span className="text-emerald-100">Tanpa Ribet Operasional</span>
          </h1>

          <p className="text-emerald-50 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
            Biarkan AI cerdas kami yang menangani chat pelanggan, komplain, dan pembuatan konten promosi. Fokus saja pada strategi bisnis.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 shadow-lg shadow-black/5 rounded-xl h-12 px-6 font-semibold transition-all group">
              Mulai Sesi AI
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>

            <div className="flex items-center gap-4 text-sm font-medium text-emerald-100 ml-2">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4" />
                <span>+24% Efisiensi</span>
              </div>
              <div className="flex items-center gap-1.5 hidden sm:flex">
                <Users className="w-4 h-4" />
                <span>1.2k+ Pengguna</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating UI Element Illustration */}
        <div className="hidden lg:flex relative w-[320px] h-[240px] items-center justify-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute z-20 top-4 right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-white/40 w-48"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                <span className="text-xs font-bold text-emerald-600">AI</span>
              </div>
              <div className="flex-1">
                <div className="h-2 w-16 bg-slate-200 rounded-full mb-1"></div>
                <div className="h-1.5 w-10 bg-slate-100 rounded-full"></div>
              </div>
            </div>
            <div className="h-12 w-full bg-emerald-50 rounded-lg border border-emerald-100/50"></div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
            className="absolute z-10 bottom-4 left-0 bg-white/80 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-white/40 w-56"
          >
            <div className="h-2 w-20 bg-slate-200 rounded-full mb-3"></div>
            <div className="space-y-2">
              <div className="h-1.5 w-full bg-slate-100 rounded-full"></div>
              <div className="h-1.5 w-3/4 bg-slate-100 rounded-full"></div>
            </div>
          </motion.div>

          {/* Glowing orb behind */}
          <div className="absolute inset-0 bg-emerald-300/30 blur-3xl rounded-full scale-150"></div>
        </div>
      </div>
    </motion.section>
  );
}
