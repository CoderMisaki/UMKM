import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";
import { normalizeToolType, type ToolType } from "@/lib/tools";

type Prompt = Record<string, string>;

const MAX_FIELD_LENGTH = 2_000;
const GEMINI_MODEL = "gemini-2.5-flash";

function isPrompt(value: unknown): value is Prompt {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value) &&
    Object.values(value).every((field) => typeof field === "string")
  );
}

function cleanPrompt(prompt: Prompt): Prompt {
  return Object.fromEntries(
    Object.entries(prompt).map(([key, value]) => [key, value.trim().slice(0, MAX_FIELD_LENGTH)])
  );
}

function hasRequiredFields(toolType: ToolType, prompt: Prompt) {
  switch (toolType) {
    case "balasChat":
    case "komplain":
      return Boolean(prompt.message);
    case "deskripsiProduk":
      return Boolean(prompt.name && prompt.benefits);
    case "captionPromo":
      return Boolean(prompt.product);
    case "ringkasPesanan":
      return Boolean(prompt.chatText);
  }
}

function buildMessages(toolType: ToolType, prompt: Prompt) {
  let systemInstruction = `Kamu adalah asisten operasional untuk UMKM Indonesia.
Tugasmu membantu pemilik usaha kecil dengan bahasa Indonesia yang jelas, sopan, natural, dan profesional.
Jangan membuat klaim berlebihan. Jika informasi kurang lengkap, buat asumsi ringan atau minta data tambahan secara singkat.`;

  let userMessage = "";

  switch (toolType) {
    case "balasChat":
      systemInstruction += "\nFungsi: Membuat balasan chat pelanggan. Output harus singkat, siap copy-paste, natural.";
      userMessage = `Pesan pelanggan: "${prompt.message}"
Jenis Pertanyaan: ${prompt.type || "Lainnya"}
Nama Produk: ${prompt.product || "-"}
Nada Balasan: ${prompt.tone || "Ramah"}

Buatkan balasan yang sesuai.`;
      break;
    case "komplain":
      systemInstruction += "\nFungsi: Membalas komplain pelanggan. Wajib empatik, tidak defensif, tidak menyalahkan pelanggan.";
      userMessage = `Pesan Komplain: "${prompt.message}"
Jenis Masalah: ${prompt.type || "Lainnya"}
Solusi: ${prompt.solution || "Berikan solusi terbaik"}
Nada Balasan: ${prompt.tone || "Empatik"}

Buatkan balasan komplain yang solutif.`;
      break;
    case "deskripsiProduk":
      systemInstruction += "\nFungsi: Membuat deskripsi produk. Jelaskan manfaat, tidak hiperbola, singkat, menarik.";
      userMessage = `Nama Produk: ${prompt.name}
Harga: ${prompt.price || "-"}
Manfaat/Fitur: ${prompt.benefits}
Target Audiens: ${prompt.audience || "-"}

Buatkan deskripsi produk yang menarik untuk toko online.`;
      break;
    case "captionPromo":
      systemInstruction += "\nFungsi: Membuat caption promosi. Sesuaikan dengan platform, sertakan CTA ringan.";
      userMessage = `Produk/Kampanye: ${prompt.product}
Jenis Promo: ${prompt.promoType || "Promo"}
Platform: ${prompt.platform || "Media sosial"}

Buatkan caption promosi yang menarik, sertakan hashtag yang relevan jika perlu.`;
      break;
    case "ringkasPesanan":
      systemInstruction += '\nFungsi: Mengekstrak data order dari chat. Format harus rapi (Nama, Produk, Jumlah, Alamat, No HP, Catatan). Jika data tidak ada, tulis "Belum tersedia".';
      userMessage = `Chat Mentah:
"${prompt.chatText}"

Tolong ekstrak informasi pesanan dari chat di atas ke dalam format daftar yang rapi.`;
      break;
  }

  return { systemInstruction, userMessage };
}

function createMockResult(toolType: ToolType, prompt: Prompt) {
  switch (toolType) {
    case "balasChat":
      return `[Mock] Halo Kak! Untuk produk ${prompt.product || "tersebut"} saat ini stoknya masih tersedia ya. Silakan langsung diorder sebelum kehabisan! 😊`;
    case "komplain":
      return `[Mock] Mohon maaf atas ketidaknyamanannya Kak terkait ${prompt.type || "pesanan"}. Sesuai info, kami akan ${prompt.solution || "segera bantu cek"}. Mohon ditunggu ya! 🙏`;
    case "deskripsiProduk":
      return `[Mock] ✨ ${prompt.name} ✨\n\nHarga: ${prompt.price || "Terbaik di kelasnya"}\n\nKenapa harus beli produk ini?\n${prompt.benefits}\n\nCocok banget buat ${prompt.audience || "semua kalangan"}. Yuk buruan checkout sekarang! 🛒`;
    case "captionPromo":
      return `[Mock] 🎉 PROMO ${prompt.promoType || "SPESIAL"} 🎉\n\nDapatkan ${prompt.product} sekarang juga dengan penawaran spesial! Promo terbatas, jangan sampai kehabisan ya bestie!\n\nLangsung klik link di bio untuk order! 🚀\n#Promo #UMKMIndonesia #${(prompt.platform || "SosialMedia").replace(/\s+/g, "")}`;
    case "ringkasPesanan":
      return "[Mock] 📋 *Ringkasan Pesanan*\n\n- Nama: Budi\n- Produk: Kemeja Flanel Merah\n- Jumlah: 2 (Ukuran L)\n- Alamat: Jl. Sudirman No 10 Jakarta\n- No HP: 0812345678\n- Catatan: -";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { toolType?: unknown; prompt?: unknown };
    const toolType = normalizeToolType(body.toolType);

    if (!toolType) {
      return NextResponse.json({ error: "Tipe alat tidak valid." }, { status: 400 });
    }

    if (!isPrompt(body.prompt)) {
      return NextResponse.json({ error: "Format prompt tidak valid." }, { status: 400 });
    }

    const prompt = cleanPrompt(body.prompt);

    if (!hasRequiredFields(toolType, prompt)) {
      return NextResponse.json({ error: "Data wajib belum lengkap." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_AI || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return NextResponse.json({ result: createMockResult(toolType, prompt) });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { systemInstruction, userMessage } = buildMessages(toolType, prompt);

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: userMessage,
      config: {
        systemInstruction,
      },
    });

    const result = response.text?.trim();

    if (!result) {
      return NextResponse.json({ error: "AI tidak mengembalikan hasil." }, { status: 502 });
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error("API Generate Error:", error);
    return NextResponse.json({ error: "Gagal membuat konten." }, { status: 500 });
  }
}
