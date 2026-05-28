"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, CheckCircle2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";

export function CaptionPromo() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { addHistory } = useHistory();

  const [form, setForm] = useState({
    product: "",
    promoType: "Diskon",
    platform: "Instagram",
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType: "captionPromo", prompt: form }),
      });
      const data = await res.json();
      if (!res.ok || !data.result) {
        throw new Error(data.error || "Gagal membuat konten.");
      }
      setResult(data.result);
      addHistory({ toolType: "captionPromo", prompt: form, result: data.result });
    } catch (e) {
      console.error(e);
      setResult("Maaf, terjadi kesalahan saat membuat caption.");
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
            <label className="block text-sm font-medium mb-1">Nama Produk / Kampanye</label>
            <Input
              placeholder="Contoh: Promo Akhir Tahun Sepatu Kets"
              value={form.product}
              onChange={(e) => setForm({ ...form, product: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Jenis Promo</label>
            <Select value={form.promoType} onValueChange={(val) => setForm({ ...form, promoType: val || "Diskon" })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Jenis Promo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Diskon">Diskon</SelectItem>
                <SelectItem value="Bundling">Bundling</SelectItem>
                <SelectItem value="Produk Baru">Produk Baru</SelectItem>
                <SelectItem value="Flash Sale">Flash Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Platform Sosial Media</label>
            <Select value={form.platform} onValueChange={(val) => setForm({ ...form, platform: val || "Instagram" })}>
              <SelectTrigger>
                <SelectValue placeholder="Pilih Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !form.product}
            className="w-full bg-accent hover:bg-accent/90"
          >
            {loading ? "Memproses..." : "Buat Caption"}
          </Button>
        </div>

        <div className="border rounded-xl p-4 bg-muted/50 flex flex-col">
          <h3 className="font-semibold mb-2">Hasil Caption:</h3>
          <div className="flex-1 bg-card border rounded-lg p-4 mb-4 whitespace-pre-wrap text-sm text-foreground">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/6" />
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
