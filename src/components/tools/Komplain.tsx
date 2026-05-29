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
  type: "Paket Terlambat",
  solution: "",
  tone: "Empatik",
};

export function Komplain() {
  const { loading, result, error, copied, generate, copyResult, reset } = useAiTool({ toolType: "komplain" });
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  const handleGenerate = () => {
    if (!form.message.trim()) {
      setValidationError("Pesan komplain wajib diisi.");
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
          <label className="block text-sm font-medium mb-1" htmlFor="komplain-message">Pesan Komplain *</label>
          <Textarea id="komplain-message" placeholder="Contoh: Kok barang saya belum sampai juga ya?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="h-32" aria-invalid={Boolean(validationError)} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Masalah</label>
            <Select value={form.type} onValueChange={(val) => setForm({ ...form, type: val || "Lainnya" })}>
              <SelectTrigger><SelectValue placeholder="Pilih Jenis" /></SelectTrigger>
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
              <SelectTrigger><SelectValue placeholder="Pilih Nada" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Empatik">Empatik</SelectItem>
                <SelectItem value="Profesional">Profesional</SelectItem>
                <SelectItem value="Meminta Maaf">Meminta Maaf</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="komplain-solution">Solusi yang Ditawarkan</label>
          <Input id="komplain-solution" placeholder="Contoh: Akan bantu cek ke ekspedisi / retur gratis" value={form.solution} onChange={(e) => setForm({ ...form, solution: e.target.value })} />
        </div>

        {validationError ? <p role="alert" className="text-sm text-destructive">{validationError}</p> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={handleGenerate} disabled={loading} className="w-full bg-accent hover:bg-accent/90 min-h-10">{loading ? "Memproses..." : "Buat Solusi"}</Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full min-h-10"><RotateCcw className="w-4 h-4 mr-2" /> Clear Input/Result</Button>
        </div>
      </div>

      <ToolResultPanel title="Hasil Balasan" result={result} error={error} loading={loading} copied={copied} onCopy={copyResult} onClear={reset} />
    </div>
  );
}
