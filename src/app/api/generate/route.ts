import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { toolType, prompt } = body;

    const apiKey = process.env.GEMINI_AI;

    // Build the system instructions based on tool type
    let systemInstruction = `Kamu adalah asisten operasional untuk UMKM Indonesia.
Tugasmu membantu pemilik usaha kecil dengan bahasa Indonesia yang jelas, sopan, natural, dan profesional.
Jangan membuat klaim berlebihan. Jika informasi kurang lengkap, buat asumsi ringan atau minta data tambahan secara singkat.`;

    let userMessage = "";

    switch (toolType) {
      case "balasChat":
        systemInstruction += `\nFungsi: Membuat balasan chat pelanggan. Output harus singkat, siap copy-paste, natural.`;
        userMessage = `Pesan pelanggan: "${prompt.message}"
Jenis Pertanyaan: ${prompt.type}
Nama Produk: ${prompt.product || "-"}
Nada Balasan: ${prompt.tone}

Buatkan balasan yang sesuai.`;
        break;
      case "komplain":
        systemInstruction += `\nFungsi: Membalas komplain pelanggan. Wajib empatik, tidak defensif, tidak menyalahkan pelanggan.`;
        userMessage = `Pesan Komplain: "${prompt.message}"
Jenis Masalah: ${prompt.type}
Solusi: ${prompt.solution || "Berikan solusi terbaik"}
Nada Balasan: ${prompt.tone}

Buatkan balasan komplain yang solutif.`;
        break;
      case "deskripsiProduk":
        systemInstruction += `\nFungsi: Membuat deskripsi produk. Jelaskan manfaat, tidak hiperbola, singkat, menarik.`;
        userMessage = `Nama Produk: ${prompt.name}
Harga: ${prompt.price || "-"}
Manfaat/Fitur: ${prompt.benefits}
Target Audiens: ${prompt.audience || "-"}

Buatkan deskripsi produk yang menarik untuk toko online.`;
        break;
      case "captionPromo":
        systemInstruction += `\nFungsi: Membuat caption promosi. Sesuaikan dengan platform, sertakan CTA ringan.`;
        userMessage = `Produk/Kampanye: ${prompt.product}
Jenis Promo: ${prompt.promoType}
Platform: ${prompt.platform}

Buatkan caption promosi yang menarik, sertakan hashtag yang relevan jika perlu.`;
        break;
      case "ringkasPesanan":
        systemInstruction += `\nFungsi: Mengekstrak data order dari chat. Format harus rapi (Nama, Produk, Jumlah, Alamat, No HP, Catatan). Jika data tidak ada, tulis "Belum tersedia".`;
        userMessage = `Chat Mentah:
"${prompt.chatText}"

Tolong ekstrak informasi pesanan dari chat di atas ke dalam format daftar yang rapi.`;
        break;

      case "toneConverter":
        systemInstruction += `\nFungsi: Mengubah nada bahasa dari pesan asli ke nada tujuan yang diminta. Pastikan makna asli tetap terjaga, namun gayanya berubah total.`;
        userMessage = `Pesan Asli: "${prompt.message}"
Nada Tujuan: ${prompt.targetTone}

Ubah pesan di atas sesuai nada tujuan.`;
        break;
      default:
        return NextResponse.json({ error: "Invalid toolType" }, { status: 400 });
    }

    if (!apiKey) {
      console.log("No GEMINI_AI key found, using mock fallback.");
      // Fallback delay for realistic UI testing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      let mockResult = "";
      if (toolType === "balasChat") mockResult = `[Mock] Halo Kak! Untuk produk ${prompt.product || 'tersebut'} saat ini stoknya masih tersedia ya. Silakan langsung diorder sebelum kehabisan! 😊`;
      if (toolType === "komplain") mockResult = `[Mock] Mohon maaf atas ketidaknyamanannya Kak terkait ${prompt.type}. Sesuai info, kami akan ${prompt.solution || 'segera bantu cek'}. Mohon ditunggu ya! 🙏`;
      if (toolType === "deskripsiProduk") mockResult = `[Mock] ✨ ${prompt.name} ✨\n\nHarga: ${prompt.price || 'Terbaik di kelasnya'}\n\nKenapa harus beli produk ini?\n${prompt.benefits}\n\nCocok banget buat ${prompt.audience || 'semua kalangan'}. Yuk buruan checkout sekarang! 🛒`;
      if (toolType === "captionPromo") mockResult = `[Mock] 🎉 PROMO ${prompt.promoType} 🎉\n\nDapatkan ${prompt.product} sekarang juga dengan penawaran spesial! Promo terbatas, jangan sampai kehabisan ya bestie!\n\nLangsung klik link di bio untuk order! 🚀\n#Promo #UMKMIndonesia #${prompt.platform.replace(/\s+/g, '')}`;

      if (toolType === "ringkasPesanan") mockResult = `[Mock] 📋 *Ringkasan Pesanan*\n\n- Nama: Budi\n- Produk: Kemeja Flanel Merah\n- Jumlah: 2 (Ukuran L)\n- Alamat: Jl. Sudirman No 10 Jakarta\n- No HP: 0812345678\n- Catatan: -`;
      if (toolType === "toneConverter") mockResult = `[Mock] Selamat pagi/siang. Apakah stok untuk barang tersebut masih tersedia? Saya bermaksud untuk memesan 2 unit. Terima kasih.`;


      return NextResponse.json({ result: mockResult });
    }

    // Call Gemini API
    const ai = new GoogleGenAI({ apiKey });

    // As per the provided documentation structure:
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: userMessage,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    return NextResponse.json({ result: response.text });
  } catch (error) {
    console.error("API Generate Error:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
