"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RotateCcw, Wand2 } from "lucide-react";
import { useAiTool } from "@/hooks/use-ai-tool";
import { ToolResultPanel } from "@/components/tools/ToolResultPanel";

const INITIAL_FORM = { message: "", targetTone: "Formal" };

export function ToneConverter() {
  const { loading, result, error, copied, generate, copyResult, reset } = useAiTool({ toolType: "toneConverter" });
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  const handleGenerate = () => {
    if (!form.message.trim() || !form.targetTone.trim()) {
      setValidationError("Pesan asli dan nada tujuan wajib diisi.");
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
      <div className="flex flex-col h-full space-y-4">
        <div>
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><Wand2 className="w-5 h-5 text-primary" /> Ubah Nada</h2>
          <p className="text-sm text-muted-foreground">Ubah nada bahasa pesan tanpa mengubah makna aslinya.</p>
        </div>

        <div className="flex-1 space-y-4 flex flex-col">
          <div className="flex-1 min-h-[150px] flex flex-col">
            <label className="block text-sm font-medium mb-1" htmlFor="tone-message">Pesan Asli *</label>
            <Textarea id="tone-message" placeholder="Contoh: gan barangnya masih ada ga ya, mau pesen 2 nih" className="flex-1 resize-none" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={Boolean(validationError && !form.message.trim())} />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Nada Tujuan *</label>
            <Select value={form.targetTone} onValueChange={(val) => setForm({ ...form, targetTone: val || "Formal" })}>
              <SelectTrigger><SelectValue placeholder="Pilih Nada Tujuan" /></SelectTrigger>
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

        {validationError ? <p role="alert" className="text-sm text-destructive">{validationError}</p> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={handleGenerate} disabled={loading} className="w-full min-h-10" size="lg">{loading ? "Memproses..." : "Ubah Nada Pesan"}</Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full min-h-10" size="lg"><RotateCcw className="w-4 h-4 mr-2" /> Clear Input/Result</Button>
        </div>
      </div>

      <ToolResultPanel title="Hasil Konversi" result={result} error={error} loading={loading} copied={copied} onCopy={copyResult} onClear={reset} emptyText="Masukkan pesan untuk melihat hasil konversi." loadingText="AI sedang menyusun ulang nada pesan..." />
    </div>
  );
}
