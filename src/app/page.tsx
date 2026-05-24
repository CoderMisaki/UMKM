import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare, ShieldAlert, FileText, Share2, ClipboardList } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col min-h-screen bg-background">
      <header className="px-6 py-4 border-b bg-card flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1">
            <MessageSquare className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">ReplyUMKM AI</span>
        </div>
        <Link href="/app">
          <Button>Buka Aplikasi</Button>
        </Link>
      </header>

      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-secondary to-background">
        <h1 className="text-4xl md:text-6xl font-extrabold text-foreground tracking-tight max-w-4xl mb-6">
          Asisten AI Operasional <br /> <span className="text-primary">Untuk UMKM Indonesia</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Kelola chat pelanggan, tangani komplain, dan buat konten promosi lebih cepat, rapi, dan profesional.
        </p>
        <Link href="/app">
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
            Mulai Gratis Sekarang <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </section>

      <section className="py-20 px-6 max-w-6xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Semua Fitur yang UMKM Butuhkan</h2>
          <p className="text-muted-foreground">Otomatiskan operasional harian toko Anda dengan satu klik.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<MessageSquare className="w-8 h-8 text-primary" />}
            title="Balas Chat"
            description="Jawab pertanyaan pelanggan seperti harga, stok, dan pengiriman dengan bahasa yang natural."
          />
          <FeatureCard
            icon={<ShieldAlert className="w-8 h-8 text-accent" />}
            title="Tangani Komplain"
            description="Ubah pesan komplain menjadi solusi yang sopan, empatik, dan menjaga nama baik toko Anda."
          />
          <FeatureCard
            icon={<FileText className="w-8 h-8 text-primary" />}
            title="Deskripsi Produk"
            description="Buat deskripsi produk yang menarik dan menjelaskan manfaat tanpa berlebihan."
          />
          <FeatureCard
            icon={<Share2 className="w-8 h-8 text-accent" />}
            title="Caption Promosi"
            description="Generate caption untuk Instagram, TikTok, atau WhatsApp Story yang sesuai dengan target audiens."
          />
          <FeatureCard
            icon={<ClipboardList className="w-8 h-8 text-primary" />}
            title="Ringkas Pesanan"
            description="Otomatis ekstrak data pelanggan dari chat yang berantakan menjadi format yang rapi."
          />
        </div>
      </section>

      <footer className="bg-card border-t py-8 mt-auto">
        <div className="max-w-6xl mx-auto px-6 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} ReplyUMKM AI. Dibuat untuk UMKM Indonesia.
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="bg-secondary w-14 h-14 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
