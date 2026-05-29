# Manual QA Checklist ReplyUMKM AI

Gunakan checklist ini sebelum deploy production.

## Routing dan Tab
- [ ] `/app` terbuka dan tab aktif fallback ke **Balas Chat**.
- [ ] `/app?tool=balasChat` membuka **Balas Chat**.
- [ ] `/app?tool=komplain` membuka **Komplain**.
- [ ] `/app?tool=deskripsiProduk` membuka **Deskripsi Produk**.
- [ ] `/app?tool=captionPromo` membuka **Caption Promo**.
- [ ] `/app?tool=ringkasPesanan` membuka **Ringkas Pesanan**.
- [ ] `/app?tool=toneConverter` membuka **Ubah Nada**.
- [ ] `/app?tool=unknown` fallback ke **Balas Chat** tanpa crash.
- [ ] Alias lama tetap jalan: `deskripsi`, `caption`, `ringkas`, dan `tone`.
- [ ] Klik tab mengubah URL tanpa full reload dan tanpa scroll reset.

## Generate dan Validasi
- [ ] Generate **Balas Chat** dengan input valid.
- [ ] Generate **Komplain** dengan input valid.
- [ ] Generate **Deskripsi Produk** dengan input valid.
- [ ] Generate **Caption Promo** dengan input valid.
- [ ] Generate **Ringkas Pesanan** dengan input valid.
- [ ] Generate **Ubah Nada** dengan input valid.
- [ ] Semua fitur menampilkan validasi ringan saat input wajib kosong.
- [ ] Saat API key tidak ada, UI menampilkan error jelas dari `/api/generate`.
- [ ] Simulasi rate limit: request ke-21 dalam 1 menit dari IP yang sama mengembalikan 429.

## UX, Privasi, dan Mobile
- [ ] Copy result berhasil; fallback copy dapat digunakan saat Clipboard API diblokir.
- [ ] Status copy kembali normal setelah 2 detik.
- [ ] Tombol Clear input/result membersihkan input atau output sesuai konteks.
- [ ] Clear history menghapus riwayat lokal.
- [ ] Ringkas Pesanan tidak otomatis tersimpan ke history lokal.
- [ ] Sidebar mobile bisa dibuka dan ditutup lewat tombol close/backdrop.
- [ ] Layout mobile tidak overflow horizontal selain scroll tab yang disengaja.

## Build Production
- [ ] `npm run lint` berhasil.
- [ ] `npm run build` berhasil.
