import { Suspense } from "react";
import { AppToolsClient } from "./AppToolsClient";

function ToolsFallback() {
  return <div className="h-96 rounded-xl border bg-card animate-pulse" aria-label="Memuat alat AI" />;
}

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard AI</h1>
        <p className="text-muted-foreground">Pilih alat AI yang ingin Anda gunakan hari ini.</p>
      </div>

      <Suspense fallback={<ToolsFallback />}>
        <AppToolsClient />
      </Suspense>
    </div>
  );
}
