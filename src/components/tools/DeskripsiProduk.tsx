"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, CheckCircle2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";

export function DeskripsiProduk() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { addHistory } = useHistory();

  const [form, setForm] = useState({
    name: "",
    price: "",
    benefits: "",
    audience: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType: "deskripsiProduk", prompt: form }),
      });
      const data = await res.json();
      if (!res.ok || !data.result) {
        throw new Error(data.error || "Gagal membuat konten.");
      }
      setResult(data.result);
      addHistory({ toolType: "deskripsiProduk", prompt: form, result: data.result });
    } catch (e) {
      console.error(e);
      setResult("Maaf, terjadi kesalahan saat membuat deskripsi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Produk</label>
            <Input
              placeholder="Contoh: Kemeja Flanel Merah Pria"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Harga (Opsional)</label>
            <Input
              placeholder="Contoh: Rp 150.000"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Manfaat / Fitur Utama</label>
            <Textarea
              placeholder="Contoh: Bahan adem, tidak mudah kusut, cocok untuk kerja dan santai"
              value={form.benefits}
              onChange={(e) => setForm({ ...form, benefits: e.target.value })}
              className="h-24"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Target Audiens (Opsional)</label>
            <Input
              placeholder="Contoh: Mahasiswa, Karyawan Muda"
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !form.name || !form.benefits}
            className="w-full"
          >
            {loading ? "Memproses..." : "Buat Deskripsi"}
          </Button>
        </div>

        <div className="border rounded-xl p-4 bg-muted/50 flex flex-col">
          <h3 className="font-semibold mb-2">Hasil Deskripsi:</h3>
          <div className="flex-1 bg-card border rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm text-foreground">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/6" />
              </div>
            ) : result ? (
              result
            ) : (
              <span className="text-muted-foreground italic">Hasil akan muncul di sini...</span>
            )}
          </div>
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!result || loading}
            className="w-full bg-card"
          >
            {copied ? <><CheckCircle2 className="w-4 h-4 mr-2 text-primary" /> Disalin!</> : <><Copy className="w-4 h-4 mr-2" /> Salin Teks</>}
          </Button>
        </div>
      </div>
    </div>
  );
}
