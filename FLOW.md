# User Flow & Data Flow: ReplyUMKM AI

Dokumen ini memetakan bagaimana pengguna berinteraksi dengan aplikasi dan bagaimana sistem memproses permintaan. Desain alur dibuat seminimal mungkin untuk mengurangi hambatan (*friction*) bagi pemilik UMKM.

## 1. Alur Pengguna (User Journeys)

### Flow A: *Onboarding* & Pendaratan (Landing Page)
1. Pengguna membuka URL aplikasi.
2. Membaca *Value Proposition* di halaman pendaratan.
3. Mencoba fitur pada kotak "Live Demo" langsung di halaman depan.
4. Mengklik tombol **"Mulai Buat Balasan"**.
5. Sistem mengarahkan pengguna ke halaman `/app` (Dashboard) tanpa perlu *login* (Sistem *Frictionless MVP*).

### Flow B: Membuat Balasan Chat (Core Flow)
1. Di Dashboard, pengguna memilih *tab/menu* **"Balas Chat"**.
2. Pengguna menempelkan (*paste*) pesan pelanggan dari WhatsApp ke *AI Input Box*.
3. (Opsional) Pengguna memilih *Tone* (contoh: Ramah) dan Jenis Pertanyaan (contoh: Tanya Stok).
4. Pengguna menekan tombol **"Generate Reply"**.
5. Animasi *loading skeleton* / teks berangsur muncul (*streaming*).
6. Balasan selesai, pengguna menekan tombol **"Copy"**.
7. Sistem memberikan notifikasi visual (Teks "Copied!" dan warna tombol berubah sementara).
8. Data *input/output* disimpan otomatis di *Recent History* (via `localStorage`).

### Flow C: Mengekstrak Data Pesanan (Order Summary Extractor)
1. Pengguna menerima pesan panjang dan berantakan dari pelanggan yang berisi detail order.
2. Pengguna membuka menu **"Ringkas Pesanan"**.
3. Pengguna menempelkan teks mentah ke form input.
4. Menekan tombol **"Ekstrak Data"**.
5. AI menganalisis teks dan mengisi data terstruktur ke dalam tabel (*Field*: Nama, Produk, Alamat, Catatan).
6. Pengguna dapat langsung menyalin ringkasan yang sudah rapi untuk ditempel ke buku catatan digital atau memproses pengiriman.

## 2. Alur Data (Data Flow Architecture)
1. **Client**: Menerima input dari pengguna -> Melakukan validasi awal -> Memanggil *API Route* internal (`/api/generate`).
2. **Server (Next.js API)**: Menerima *request* -> Menyisipkan kredensial rahasia (API Key) -> Menggabungkan input dengan *System Prompt* khusus UMKM -> Mengirim *request* ke AI Provider (OpenAI/Gemini).
3. **AI Provider**: Memproses teks dan mengirimkan *stream* balasan kembali ke Server.
4. **Server (Next.js API)**: Meneruskan *stream* ke Client.
5. **Client**: Menampilkan teks ke layar secara *real-time* -> Menyimpan *state* akhir ke `localStorage` setelah selesai.
