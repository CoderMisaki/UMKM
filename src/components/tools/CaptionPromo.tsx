"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw } from "lucide-react";
import { useAiTool } from "@/hooks/use-ai-tool";
import { ToolResultPanel } from "@/components/tools/ToolResultPanel";

const INITIAL_FORM = { product: "", promoType: "Diskon", platform: "Instagram" };

export function CaptionPromo() {
  const { loading, result, error, copied, generate, copyResult, reset } = useAiTool({ toolType: "captionPromo" });
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  const handleGenerate = () => {
    if (!form.product.trim()) {
      setValidationError("Nama produk atau kampanye wajib diisi.");
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
          <label className="block text-sm font-medium mb-1" htmlFor="caption-product">Nama Produk / Kampanye *</label>
          <Input id="caption-product" placeholder="Contoh: Promo Akhir Tahun Sepatu Kets" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} aria-invalid={Boolean(validationError)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Jenis Promo</label>
          <Select value={form.promoType} onValueChange={(val) => setForm({ ...form, promoType: val || "Diskon" })}>
            <SelectTrigger><SelectValue placeholder="Pilih Jenis Promo" /></SelectTrigger>
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
            <SelectTrigger><SelectValue placeholder="Pilih Platform" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Instagram">Instagram</SelectItem>
              <SelectItem value="WhatsApp">WhatsApp</SelectItem>
              <SelectItem value="TikTok">TikTok</SelectItem>
              <SelectItem value="Facebook">Facebook</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {validationError ? <p role="alert" className="text-sm text-destructive">{validationError}</p> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-accent hover:bg-accent/90 min-h-10">{loading ? "Memproses..." : "Buat Caption"}</Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full min-h-10"><RotateCcw className="w-4 h-4 mr-2" /> Clear Input/Result</Button>
        </div>
      </div>

      <ToolResultPanel title="Hasil Caption" result={result} error={error} loading={loading} copied={copied} onCopy={copyResult} onClear={reset} />
    </div>
  );
}
