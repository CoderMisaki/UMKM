"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Copy, CheckCircle2 } from "lucide-react";
import { useHistory } from "@/hooks/use-history";

export function RingkasPesanan() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const { addHistory } = useHistory();

  const [form, setForm] = useState({
    chatText: "",
  });

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolType: "ringkasPesanan", prompt: form }),
      });
      const data = await res.json();
      setResult(data.result);
      addHistory({ toolType: "ringkasPesanan", prompt: form, result: data.result });
    } catch (e) {
      console.error(e);
      setResult("Maaf, terjadi kesalahan saat meringkas pesanan.");
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Teks Chat Mentah</label>
            <Textarea
              placeholder="Contoh: pesen kemeja flanel merah 2 yg ukuran L ya, kirim ke jl. sudirman no 10 jakarta, an. budi hp 0812345678. thx"
              value={form.chatText}
              onChange={(e) => setForm({ ...form, chatText: e.target.value })}
              className="h-48"
            />
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading || !form.chatText}
            className="w-full"
          >
            {loading ? "Memproses..." : "Ekstrak Pesanan"}
          </Button>
        </div>

        <div className="border rounded-xl p-4 bg-muted/50 flex flex-col">
          <h3 className="font-semibold mb-2">Hasil Ekstraksi:</h3>
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
              <span className="text-muted-foreground italic">Format tabel/list akan muncul di sini...</span>
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
