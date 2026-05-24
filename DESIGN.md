# Design Specifications: ReplyUMKM AI

Dokumen ini menguraikan pedoman desain UI/UX dan arsitektur visual untuk ReplyUMKM AI. Fokus utama adalah menciptakan antarmuka yang bersih, modern, dan sangat intuitif bagi pemilik UMKM yang mungkin tidak terlalu melek teknologi.

## 1. Konsep Visual & Tema
- **Style Utama**: Modern, Bersih, Ramah, *Mobile-First*.
- **Kesan**: Profesional namun tidak kaku (bukan *corporate-heavy*).
- **Aksesibilitas**: Kontras teks yang tinggi dan ukuran *tap target* yang besar untuk kemudahan di perangkat seluler.

## 2. Palet Warna (Color System)
Warna dipilih untuk memberikan kesan hangat, terpercaya, dan energik.

| Elemen | Warna (Hex) | Penggunaan Utama |
| :--- | :--- | :--- |
| **Primary** | `#10B981` (Emerald) | Tombol utama, ikon aktif, CTA *generate*. |
| **Primary Dark** | `#059669` | Efek *hover* pada tombol utama. |
| **Secondary** | `#FFF7ED` (Soft Beige) | Latar belakang *card* atau elemen *highlight* ringan. |
| **Accent** | `#F97316` (Orange) | Notifikasi, label *urgent*, atau *badge* promo. |
| **Background** | `#F8FAFC` (Slate 50) | Warna latar belakang utama aplikasi (Dashboard). |
| **Surface/Card** | `#FFFFFF` (White) | Latar belakang form, tabel, dan area input/output. |
| **Text Main** | `#0F172A` (Slate 900)| Teks utama (Heading, Paragraf). |
| **Text Muted** | `#64748B` (Slate 500)| Teks sekunder, *placeholder*, label input. |

## 3. Tipografi
- **Font Utama**: Inter atau Plus Jakarta Sans (mendukung keterbacaan tinggi di layar kecil).
- **Heading**: Bold (700), ukuran proporsional untuk hierarki yang jelas.
- **Body**: Regular (400) & Medium (500), ukuran minimum 14px untuk *mobile readability*.

## 4. Komponen UI Utama (Berbasis shadcn/ui)
- **Sidebar/Bottom Nav**: Navigasi responsif (Sidebar di Desktop, Bottom Nav/Hamburger di Mobile).
- **AI Input Box**: Area teks dengan indikator fokus dan *clear button*.
- **Tone Selector**: *Pills* atau *Chips* (Ramah, Formal, Santai) yang dapat di-tap cepat.
- **Generated Output Card**: Kotak hasil AI dengan penekanan visual dan tombol `Copy` satu klik (*One-Click Copy*).
- **Empty State & Loading**: Animasi *skeleton loading* saat AI memproses data (menghindari kesan aplikasi *lag*).

## 5. Layout Sistem
Aplikasi menggunakan sistem satu halaman (Single Page Dashboard) dengan *tab routing* untuk mempercepat perpindahan antar fitur (Balas Chat, Komplain, Deskripsi, dsb) tanpa proses *reload* halaman yang berat.
