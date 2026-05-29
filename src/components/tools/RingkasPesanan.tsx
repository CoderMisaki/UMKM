"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RotateCcw } from "lucide-react";
import { useAiTool } from "@/hooks/use-ai-tool";
import { ToolResultPanel } from "@/components/tools/ToolResultPanel";

const INITIAL_FORM = { chatText: "" };

export function RingkasPesanan() {
  const { loading, result, error, copied, generate, copyResult, reset } = useAiTool({ toolType: "ringkasPesanan", saveHistory: false });
  const [form, setForm] = useState(INITIAL_FORM);
  const [validationError, setValidationError] = useState("");

  const handleGenerate = () => {
    if (!form.chatText.trim()) {
      setValidationError("Teks chat mentah wajib diisi.");
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
          <label className="block text-sm font-medium mb-1" htmlFor="ringkas-chat">Teks Chat Mentah *</label>
          <Textarea
            id="ringkas-chat"
            placeholder="Contoh: pesen kemeja flanel merah 2 yg ukuran L ya, kirim ke jl. sudirman no 10 jakarta, an. budi hp 0812345678. thx"
            value={form.chatText}
            onChange={(e) => setForm({ chatText: e.target.value })}
            className="h-48"
            aria-invalid={Boolean(validationError)}
          />
          <p className="mt-2 text-xs text-muted-foreground">Demi privasi, ringkasan pesanan tidak disimpan ke riwayat lokal secara default.</p>
        </div>

        {validationError ? <p role="alert" className="text-sm text-destructive">{validationError}</p> : null}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <Button onClick={handleGenerate} disabled={loading} className="w-full min-h-10">{loading ? "Memproses..." : "Ekstrak Pesanan"}</Button>
          <Button type="button" variant="outline" onClick={handleClear} className="w-full min-h-10"><RotateCcw className="w-4 h-4 mr-2" /> Clear Input/Result</Button>
        </div>
      </div>

      <ToolResultPanel
        title="Hasil Ekstraksi"
        result={result}
        error={error}
        loading={loading}
        copied={copied}
        onCopy={copyResult}
        onClear={reset}
        skeletonLines={5}
        emptyText="Format daftar pesanan akan muncul di sini..."
        privacyNote="Tidak otomatis disimpan ke riwayat lokal."
      />
    </div>
  );
}
