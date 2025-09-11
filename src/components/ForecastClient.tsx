"use client";

import { useState } from "react";
import PresenterComponent from "@/components/PresenterComponent";
import { CuacaProps } from "../../types";
import Lottie from "lottie-react";
import ai from "../../constant/animations/Dancing Robot.json";

type Props = {
  cuaca: CuacaProps;
};

export default function ForecastClient({ cuaca }: Props) {
  const [loading, setLoading] = useState(false);
  const [forecastText, setForecastText] = useState<string>("");

  const handleFetchForecast = async () => {
    setLoading(true);

    const provinsi = cuaca.lokasi.provinsi;
    const kabupaten = cuaca.lokasi.kotkab;
    const kecamatan = cuaca.lokasi.kecamatan;
    const kelurahan = cuaca.lokasi.desa;

    const keadaanCuaca = cuaca.data[0].cuaca[0][0].weather_desc;
    const waktu = cuaca.data[0].cuaca[0][0].local_datetime;
    const visibility = cuaca.data[0].cuaca[0][0].vs;
    const suhu = cuaca.data[0].cuaca[0][0].t;
    const kelembapan = cuaca.data[0].cuaca[0][0].hu;
    const angin = cuaca.data[0].cuaca[0][0].ws;
    const arahAngin = cuaca.data[0].cuaca[0][0].wd_to;
    const derajatAngin = cuaca.data[0].cuaca[0][0].wd_deg;

    // analisis hari ini
    const prakiraanHarian = cuaca.data[0].cuaca;
    const today = new Date().toISOString().split("T")[0];
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

    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL ||
        process.env.BASE_URL ||
        "http://localhost:3000";

      const resp = await fetch(`${baseUrl}/api/forecast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provinsi,
          kabupaten,
          kecamatan,
          kelurahan,
          waktu,
          keadaanCuaca,
          suhu,
          kelembapan,
          visibility,
          angin,
          arahAngin,
          derajatAngin,
          analisis,
        }),
      });

      const dataForecast = await resp.json();
      if (!resp.ok) {
        setForecastText(
          dataForecast?.forecastText ||
            `Ramalan cuaca tidak tersedia (${dataForecast?.error || "error"})`
        );
      } else {
        setForecastText(
          dataForecast?.forecastText || "Ramalan cuaca tidak tersedia."
        );
      }
    } catch (err: any) {
      setForecastText("Ramalan cuaca gagal diambil dari server.");
      console.error("Fetch /api/forecast failed:", err?.message ?? err);
    } finally {
      setLoading(false);
    }
  };

  return ( 
   <div className="p-6 rounded-2xl shadow-lg space-y-4 border border-gray-200 bg-white bg-gradient-to-b from-sky-300 via-sky-100 to-white sm:p-4 text-black">
    {/* Header */}
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      <h2 className="text-lg sm:text-xl font-bold text-gray-800 flex items-center gap-2">
        📡 AI Presenter
      </h2>

      <Lottie
        animationData={ai}
        loop
        autoplay
        className="w-12 h-12 sm:w-[70px] sm:h-[70px]"
      />

      <button
        onClick={handleFetchForecast}
        className="px-4 py-2 sm:px-5 sm:py-2.5 bg-gradient-to-r from-sky-400 to-sky-600 text-white font-medium rounded-xl shadow hover:opacity-90 disabled:opacity-50 transition text-sm sm:text-base"
        disabled={loading}
      >
        {loading ? "⏳ Memuat..." : "🔍 Ambil Ramalan"}
      </button>
    </div>

    {/* Forecast Result */}
    {forecastText && (
      <div className="space-y-4 max-w-md mx-auto w-full">
        <div className="p-3 sm:p-4 bg-gray-50 rounded-xl border text-sm sm:text-base text-gray-700 max-h-60 overflow-y-auto">
          {forecastText}
        </div>
        <PresenterComponent text={forecastText} />
      </div>
    )}
  </div>
  );
}
