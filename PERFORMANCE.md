# Performance Optimization: ReplyUMKM AI

Mengingat target pengguna UMKM seringkali mengakses aplikasi melalui perangkat seluler kelas menengah (*mid-range smartphones*) dan jaringan seluler, performa adalah kunci.

## 1. Target Metrik (Lighthouse)
- **Performance**: > 90
- **Accessibility**: > 95
- **Best Practices**: > 95
- **SEO**: > 90

## 2. Strategi Rendering & Pemuatan Cepat
- **Next.js App Router**: Gunakan *Server-Side Rendering (SSR)* untuk mempercepat *First Contentful Paint (FCP)* pada *Landing Page*, dan *Client-Side Rendering (CSR)* untuk interaktivitas dinamis di dalam *Dashboard*.
- **Code Splitting**: Pastikan fitur-fitur yang tidak langsung digunakan (misal: *Template Library*) di-muat secara lambat (*Lazy Loading*).

## 3. Optimasi Respons AI (Latency Handling)
- **Server-Sent Events (SSE) / Streaming UI**: Alih-alih menunggu seluruh teks balasan AI selesai di-generate, gunakan API *streaming* agar pengguna dapat melihat teks muncul kata per kata. Ini mengurangi persepsi waktu tunggu (*perceived latency*) dari 3-4 detik menjadi kurang dari 1 detik.
- **Edge Functions**: Deploy fungsi pemanggilan AI di *Edge Network* (Vercel Edge) untuk meminimalkan *cold start* dan mendekatkan proses komputasi dengan lokasi geografis pengguna (Indonesia).

## 4. Efisiensi Aset & Bundle Size
- **Minifikasi & Kompresi**: Aktifkan kompresi Gzip/Brotli.
- **Optimasi Font**: Gunakan format `woff2` dan teknik *font-display: swap* agar teks tetap terbaca sebelum font selesai diunduh.
- **UI Component Bundling**: Hanya *import* komponen `shadcn/ui` dan *icons* yang benar-benar digunakan untuk menjaga ukuran JavaScript *bundle* tetap kecil.

## 5. Offline & Caching
- Implementasikan *caching* sederhana untuk memori navigasi dan status *Tone* pilihan terakhir dengan `localStorage` agar *user experience* terasa instan saat membuka ulang aplikasi.
