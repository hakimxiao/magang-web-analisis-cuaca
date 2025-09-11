// file: app/(dashboard)/page.tsx  (atau lokasi HomePage-mu)
import { CuacaContainer } from "@/components/ecommerce/CuacaContainer";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import ShortCuacaInfo from "@/components/ecommerce/ShortCuacaInfo";
import { hasilAnalisisCuaca } from "../../../lib/api/data.action";
import PresenterComponent from "@/components/PresenterComponent";
import { CuacaProps } from "../../../types";

export default async function HomePage() {
  const data: CuacaProps = await hasilAnalisisCuaca();

  const provinsi = data.lokasi.provinsi;
  const kabupaten = data.lokasi.kotkab;
  const kecamatan = data.lokasi.kecamatan;
  const kelurahan = data.lokasi.desa;

  const keadaanCuaca = data.data[0].cuaca[0][0].weather_desc;
  const waktu = data.data[0].cuaca[0][0].local_datetime;
  const visibility = data.data[0].cuaca[0][0].vs;
  const suhu = data.data[0].cuaca[0][0].t;
  const kelembapan = data.data[0].cuaca[0][0].hu;
  const angin = data.data[0].cuaca[0][0].ws;
  const arahAngin = data.data[0].cuaca[0][0].wd_to;
  const derajatAngin = data.data[0].cuaca[0][0].wd_deg;

  const prakiraanHarian = data.data[0].cuaca;
  const today = new Date().toISOString().split("T")[0];

  // simpan prakiraan hanya untuk hari ini
  const analisis: (string | number)[][] = [];
  if (prakiraanHarian && prakiraanHarian.length > 0) {
    for (let i = 0; i < prakiraanHarian.length; i++) {
      const prakiraanPerJam = prakiraanHarian[i];
      for (const jam of prakiraanPerJam) {
        const jamTanggal = jam.local_datetime.split(" ")[0];
        if (jamTanggal === today) {
          analisis.push([jam.local_datetime, jam.weather_desc, jam.t]);
        }
      }
    }
  }

  // Gunakan base URL yang aman (fallback ke localhost)
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";
  console.log("DEBUG BASE_URL:", baseUrl);

  let forecastText = "Ramalan cuaca belum tersedia.";

  try {
    const resp = await fetch(`${baseUrl}/api/forecast`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        provinsi, kabupaten, kecamatan, kelurahan,
        waktu, keadaanCuaca, suhu, kelembapan, visibility,
        angin, arahAngin, derajatAngin, analisis,
      }),
      // supaya tidak di-cache pada SSR
      cache: "no-store",
    });

    const dataForecast = await resp.json();
    console.log("DEBUG /api/forecast response:", dataForecast);

    if (!resp.ok) {
      // tampilkan error di server console; tetap pakai fallback
      console.error("Forecast API returned error:", dataForecast);
      forecastText = dataForecast?.forecastText || `Ramalan cuaca tidak tersedia (${dataForecast?.error || "error"})`;
    } else {
      forecastText = dataForecast?.forecastText || "Ramalan cuaca tidak tersedia.";
    }
  } catch (err: any) {
    console.error("Fetch /api/forecast failed:", err?.message ?? err);
    forecastText = "Ramalan cuaca gagal diambil dari server.";
  }

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <ShortCuacaInfo cuaca={data} />
        <CuacaContainer cuaca={data} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget cuaca={data} />
      </div>

      <div className="col-span-12">
        {/* Sekarang selalu ada string minimal pada forecastText */}
        <PresenterComponent text={forecastText} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
