# Developer Documentation: ReplyUMKM AI

## 1. Ikhtisar Proyek
ReplyUMKM AI adalah aplikasi web *mobile-first* untuk membantu pemilik UMKM mengelola komunikasi pelanggan, menangani pesanan, dan membuat konten promosi menggunakan AI. (Lihat `DESIGN.md` untuk desain dan `FLOW.md` untuk alur pengguna).

## 2. Tech Stack Utama
- **Framework**: Next.js (App Router)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui & Radix UI
- **AI Integration**: Gemini API / OpenAI API / Groq
- **Deployment**: Vercel
- **Storage**: `localStorage` (MVP)

## 3. Struktur Direktori
```text
├── app/
│   ├── (dashboard)/        # Layout dan rute untuk Dashboard (Balas Chat, Komplain, dll)
│   ├── api/                # API Routes untuk koneksi aman ke LLM
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Landing Page
├── components/             # Reusable UI (Button, Input, Card, AI Output)
├── lib/                    # Utilitas (Prompt Logic, Formatting, Tailwind merge)
└── public/                 # Aset statis (Logo, Ikon)
