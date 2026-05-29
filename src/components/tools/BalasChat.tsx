"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { useAiTool } from "@/hooks/use-ai-tool";
import { ToolResultPanel } from "@/components/tools/ToolResultPanel";

const INITIAL_FORM = {
  message: "",
  type: "Tanya Stok",
  product: "",
  tone: "Ramah",
};

export function BalasChat() {
  const { loading, result, error, copied, generate, copyResult, reset } = useAiTool({ toolType: "balasChat" });
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  const handleGenerate = () => {
    if (!form.message.trim()) {
      setValidationError("Pesan pelanggan wajib diisi.");
      return;
    }
    setValidationError("");
    generate(form);
  };

  const handleClear = () => {
    setForm(INITIAL_FORM);
    setValidationError("");
    reset();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="balas-message">Pesan Pelanggan *</label>
          <Textarea
            id="balas-message"
            placeholder="Contoh: Min, baju yang warna merah ukuran L masih ada gak ya?"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="h-32"
            aria-invalid={Boolean(validationError)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Pertanyaan</label>
            <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val || "Lainnya" })}>
              <SelectTrigger><SelectValue placeholder="Pilih Jenis" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Tanya Stok">Tanya Stok</SelectItem>
                <SelectItem value="Tanya Harga">Tanya Harga</SelectItem>
                <SelectItem value="Tanya Pengiriman">Tanya Pengiriman</SelectItem>
                <SelectItem value="Lainnya">Lainnya</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nada Balasan</label>
            <Select value={form.tone} onValueChange={(val) => setForm({ ...form, tone: val || "Ramah" })}>
              <SelectTrigger><SelectValue placeholder="Pilih Nada" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Ramah">Ramah</SelectItem>
                <SelectItem value="Profesional">Profesional</SelectItem>
                <SelectItem value="Santai">Santai</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="balas-product">Nama Produk (Opsional)</label>
          <Input id="balas-product" placeholder="Contoh: Kemeja Flanel Merah" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} />
        </div>

        {validationError ? <p role="alert" className="text-sm text-destructive">{validationError}</p> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={handleGenerate} disabled={loading} className="w-full min-h-10">
            {loading ? "Memproses..." : "Buat Balasan"}
          </Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full min-h-10">
            <RotateCcw className="w-4 h-4 mr-2" /> Clear Input/Result
          </Button>
        </div>
      </div>

      <ToolResultPanel title="Hasil Balasan" result={result} error={error} loading={loading} copied={copied} onCopy={copyResult} onClear={reset} />
    </div>
  );
}
