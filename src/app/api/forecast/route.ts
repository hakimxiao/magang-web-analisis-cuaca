import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const {
            provinsi, kabupaten, kecamatan, kelurahan,
            waktu, keadaanCuaca, suhu, kelembapan, visibility,
            angin, arahAngin, derajatAngin, analisis
        } = body;

        const analisisList = Array.isArray(analisis) ? analisis : [];

        const userContent = `
            📍 Lokasi: ${kelurahan}, Kecamatan ${kecamatan}, Kabupaten ${kabupaten}, Provinsi ${provinsi}
            🕒 Waktu saat ini: ${waktu}
            🌤️ Kondisi: ${keadaanCuaca}
            🌡️ Suhu: ${suhu}°C | 💧 Kelembapan: ${kelembapan}%
            👀 Jarak pandang: ${visibility} m
            💨 Angin: ${angin} m/s, arah ${arahAngin}, ${derajatAngin}°

            📅 Prakiraan hari ini:
            ${analisisList.length ? analisisList.map((a: any) => `Jam ${a[0]} — ${a[1]} — ${a[2]}°C`).join("\n") : "Tidak ada data prakiraan per jam."}
`;

        const prompt = `
            Kamu adalah pesenter pembawa informasi ramalan cuaca gunakan suara jelas dan menarik. Kemudian anda bacakan dengan detail dan tersusun rapi
            semua naskah yang ada disini, jangan baca spesial karakter dan gunakan bahasa yang mudah dipahami. semua informasi anda bacakan ya,
            kemudian akhiri sesi dengan mengucapkan semua data bersumber dari BMKG sumatera selatan
            ${userContent}
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const result = await model.generateContent(prompt);

        const forecastText = result.response.text().trim() || "Ramalan cuaca tidak tersedia.";
        return NextResponse.json({ forecastText });
    } catch (e: any) {
        console.error("Gemini error:", e);
        return NextResponse.json({ error: e.message ?? String(e) }, { status: 500 });
    }
}
