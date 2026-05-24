# Security Policies: ReplyUMKM AI

Keamanan data adalah prioritas, meskipun aplikasi pada tahap MVP tidak memerlukan autentikasi kompleks. Dokumen ini menjelaskan bagaimana ReplyUMKM AI menangani data pengguna, input AI, dan kredensial sistem.

## 1. Manajemen API Key
- **Strict Environment Variables**: Kunci API untuk layanan AI (Gemini / OpenAI / Groq) **TIDAK BOLEH** diekspos ke *client-side*. 
- Semua pemanggilan API AI harus disalurkan melalui *Backend/Serverless Functions* (misal: Next.js API Routes / Vercel Edge Functions).
- Gunakan file `.env.local` untuk pengembangan lokal dan atur Environment Variables dengan aman di *dashboard deployment* (Vercel).

## 2. Privasi & Penyimpanan Data Pengguna (Data Handling)
- **Local-First Storage**: Pada fase MVP, riwayat balasan (*Recent History*) dan profil bisnis disimpan sepenuhnya menggunakan `localStorage` di sisi *client*. Tidak ada data pribadi atau chat pelanggan yang disimpan di *database server* terpusat.
- **No PII Transmission**: AI dilarang meminta atau memproses data sensitif secara persisten. Data yang diekstrak (seperti fitur *Order Summary Extractor*) hanya diproses secara *stateless* dan langsung dikembalikan ke perangkat pengguna.

## 3. Mitigasi Prompt Injection
- **Input Sanitization**: Semua input pelanggan (*customer message*) yang dimasukkan oleh pengguna UMKM akan disanitasi sebelum digabungkan ke dalam *System Prompt*.
- **Role Boundary**: Prompt sistem secara ketat membatasi peran AI hanya sebagai "Asisten Operasional UMKM". AI diinstruksikan untuk menolak instruksi (*jailbreak*) yang berusaha mengubah perilakunya di luar konteks e-commerce/UMKM.

## 4. Rate Limiting & Proteksi DDoS
- Implementasikan *Rate Limiting* pada endpoint API (misalnya maksimal 20 *request* per menit per IP) untuk mencegah penyalahgunaan API AI yang dapat menyebabkan lonjakan biaya (Spam / Botting).

## 5. Pelaporan Celah Keamanan
Untuk pelaporan isu keamanan, silakan hubungi tim pengembang melalui jalur komunikasi tertutup. Jangan membuat *issue* publik untuk kerentanan yang belum ditambal.
