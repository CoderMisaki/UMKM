"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Copy, CheckCircle2, Wand2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useHistory } from "@/hooks/use-history";

export function ToneConverter() {
  const { addHistory } = useHistory();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({
    message: "",
    targetTone: "Formal",
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType: "toneConverter", prompt: form }),
      });

      const data = await response.json();
      setResult(data.result);
      addHistory({ toolType: "toneConverter", prompt: form, result: data.result });
    } catch (error) {
      console.error(error);
      setResult("Terjadi kesalahan saat menghubungi AI. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      {/* Input Section */}
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Wand2 className="w-5 h-5 text-primary" />
            Tone Converter
          </h2>
          <p className="text-sm text-muted-foreground">Ubah nada bahasa pesan Anda menjadi lebih formal, santai, atau profesional.</p>
        </div>

        <div className="flex-1 space-y-4 flex flex-col">
          <div className="flex-1 min-h-[150px] flex flex-col">
            <label className="block text-sm font-medium mb-1">Pesan Asli</label>
            <Textarea
              placeholder="Contoh: gan barangnya masih ada ga ya, mau pesen 2 nih"
              className="flex-1 resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nada Tujuan</label>
              <Select value={form.targetTone} onValueChange={(val) => setForm({ ...form, targetTone: val || "Formal" })}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih Nada Tujuan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Formal">Formal & Sopan</SelectItem>
                  <SelectItem value="Profesional">Profesional (B2B)</SelectItem>
                  <SelectItem value="Santai">Santai / Kasual</SelectItem>
                  <SelectItem value="Ramah">Ramah & Antusias</SelectItem>
                  <SelectItem value="Tegas">Tegas / Menagih</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={loading || !form.message}
          className="w-full"
          size="lg"
        >
          {loading ? "Memproses..." : "Ubah Nada Pesan"}
        </Button>
      </div>

      {/* Output Section */}
      <div className="flex flex-col h-full border rounded-xl bg-slate-50/50 overflow-hidden">
        <div className="p-4 border-b bg-white flex items-center justify-between">
          <span className="font-semibold text-sm">Hasil Conversi</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            disabled={!result}
            className="h-8"
          >
            {copied ? <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Tersalin" : "Salin"}
          </Button>
        </div>
        <div className="p-4 flex-1 overflow-auto whitespace-pre-wrap text-sm leading-relaxed">
          {loading ? (
            <div className="h-full flex items-center justify-center text-muted-foreground animate-pulse">
              AI sedang menyusun kata-kata...
            </div>
          ) : result ? (
            result
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground text-center px-8">
              <Wand2 className="w-12 h-12 mb-3 text-slate-200" />
              <p>Masukkan pesan di samping untuk melihat hasil konversi.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
