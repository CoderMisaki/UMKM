"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { RotateCcw } from "lucide-react";
import { useAiTool } from "@/hooks/use-ai-tool";
import { ToolResultPanel } from "@/components/tools/ToolResultPanel";

const INITIAL_FORM = { name: "", price: "", benefits: "", audience: "" };

export function DeskripsiProduk() {
  const { loading, result, error, copied, generate, copyResult, reset } = useAiTool({ toolType: "deskripsiProduk" });
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  const handleGenerate = () => {
    if (!form.name.trim() || !form.benefits.trim()) {
      setValidationError("Nama produk dan manfaat/fitur utama wajib diisi.");
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
          <label className="block text-sm font-medium mb-1" htmlFor="produk-name">Nama Produk *</label>
          <Input id="produk-name" placeholder="Contoh: Kemeja Flanel Merah Pria" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={Boolean(validationError && !form.name.trim())} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="produk-price">Harga (Opsional)</label>
          <Input id="produk-price" placeholder="Contoh: Rp 150.000" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="produk-benefits">Manfaat / Fitur Utama *</label>
          <Textarea id="produk-benefits" placeholder="Contoh: Bahan adem, tidak mudah kusut, cocok untuk kerja dan santai" value={form.benefits} onChange={(e) => setForm({ ...form, benefits: e.target.value })} className="h-24" aria-invalid={Boolean(validationError && !form.benefits.trim())} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="produk-audience">Target Audiens (Opsional)</label>
          <Input id="produk-audience" placeholder="Contoh: Mahasiswa, Karyawan Muda" value={form.audience} onChange={(e) => setForm({ ...form, audience: e.target.value })} />
        </div>

        {validationError ? <p role="alert" className="text-sm text-destructive">{validationError}</p> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={handleGenerate} disabled={loading} className="w-full min-h-10">{loading ? "Memproses..." : "Buat Deskripsi"}</Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full min-h-10"><RotateCcw className="w-4 h-4 mr-2" /> Clear Input/Result</Button>
        </div>
      </div>

      <ToolResultPanel title="Hasil Deskripsi" result={result} error={error} loading={loading} copied={copied} onCopy={copyResult} onClear={reset} skeletonLines={5} />
    </div>
  );
}
