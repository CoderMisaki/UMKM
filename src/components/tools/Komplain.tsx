"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, CheckCircle2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";

export function Komplain() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { addHistory } = useHistory();

  const [form, setForm] = useState({
    message: "",
    type: "Paket Terlambat",
    solution: "",
    tone: "Empatik",
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType: "komplain", prompt: form }),
      });
      const data = await res.json();
      if (!res.ok || !data.result) {
        throw new Error(data.error || "Gagal membuat konten.");
      }
      setResult(data.result);
      addHistory({ toolType: "komplain", prompt: form, result: data.result });
    } catch (e) {
      console.error(e);
      setResult("Maaf, terjadi kesalahan saat membuat balasan.");
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
            <label className="block text-sm font-medium mb-1">Pesan Komplain</label>
            <Textarea
              placeholder="Contoh: Kok barang saya belum sampai juga ya? Padahal resi udah dari kemarin!"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="h-32"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Jenis Masalah</label>
              <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val || "Lainnya" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paket Terlambat">Paket Terlambat</SelectItem>
                  <SelectItem value="Barang Rusak">Barang Rusak</SelectItem>
                  <SelectItem value="Salah Kirim">Salah Kirim</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Nada Balasan</label>
              <Select value={form.tone} onValueChange={(val) => setForm({ ...form, tone: val || "Empatik" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Nada" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Empatik">Empatik</SelectItem>
                  <SelectItem value="Profesional">Profesional</SelectItem>
                  <SelectItem value="Meminta Maaf">Meminta Maaf</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Solusi yang Ditawarkan</label>
            <Input
              placeholder="Contoh: Akan bantu cek ke ekspedisi / retur gratis"
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !form.message}
            className="w-full bg-accent hover:bg-accent/90"
          >
            {loading ? "Memproses..." : "Buat Solusi"}
          </Button>
        </div>

        <div className="border rounded-xl p-4 bg-muted/50 flex flex-col">
          <h3 className="font-semibold mb-2">Hasil Balasan:</h3>
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
