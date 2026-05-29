"use client";

import Hero from "@/components/ui/animated-shader-hero";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();

  return (
    <div className="mb-8 rounded-3xl overflow-hidden shadow-xl">
      <Hero
        headline={{
          line1: "Tingkatkan Penjualan Anda",
          line2: "Tanpa Ribet Operasional"
        }}
        subtitle="Biarkan AI cerdas kami yang menangani chat pelanggan, komplain, dan pembuatan konten promosi. Fokus saja pada strategi bisnis."
        buttons={{
          primary: {
            text: "Mulai Sesi AI",
            onClick: () => router.push('/app')
          }
        }}
      />
    </div>
  );
}
