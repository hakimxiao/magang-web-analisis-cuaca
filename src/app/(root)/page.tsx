"use client";

import { useState, useEffect } from "react";
import { CuacaContainer } from "@/components/ecommerce/CuacaContainer";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import ShortCuacaInfo from "@/components/ecommerce/ShortCuacaInfo";
import ForecastClient from "@/components/ForecastClient";
import { hasilAnalisisCuaca } from "../../../lib/api/data.action";
import { CuacaProps } from "../../../types";

// Mapping kecamatan → kelurahan dengan kode BMKG
const dataWilayah: Record<
  string,
  { label: string; value: string; kelurahan: { label: string; value: string }[] }
> = {
  ilirBaratII: {
    label: "Ilir Barat II",
    value: "01",
    kelurahan: [
      { label: "35 Ilir", value: "1001" },
      { label: "32 Ilir", value: "1002" },
      { label: "30 Ilir", value: "1003" },
      { label: "29 Ilir", value: "1004" },
      { label: "28 Ilir", value: "1005" },
      { label: "27 Ilir", value: "1006" },
      { label: "Kemang Manis", value: "1007" },
    ],
  },
  seberangUluI: {
    label: "Seberang Ulu I",
    value: "02",
    kelurahan: [
      { label: "1 Ulu", value: "1002" },
      { label: "2 Ulu", value: "1003" },
      { label: "3/4 Ulu", value: "1004" },
      { label: "5 Ulu", value: "1005" },
      { label: "7 Ulu", value: "1006" },
    ],
  },
  seberangUluII: {
    label: "Seberang Ulu II",
    value: "03",
    kelurahan: [
      { label: "11 Ulu", value: "1001" },
      { label: "12 Ulu", value: "1002" },
      { label: "13 Ulu", value: "1003" },
      { label: "14 Ulu", value: "1004" },
      { label: "16 Ulu", value: "1005" },
      { label: "Tangga Takat", value: "1006" },
      { label: "Sentosa", value: "1007" },
    ],
  },
  ilirBaratI: {
    label: "Ilir Barat I",
    value: "04",
    kelurahan: [
      { label: "Bukit Lama", value: "1001" },
      { label: "Lorok Pakjo", value: "1002" },
      { label: "26 Ilir D-I", value: "1003" },
      { label: "Siring Agung", value: "1004" },
      { label: "Demang Lebar Daun", value: "1005" },
      { label: "Bukit Baru", value: "1006" },
    ],
  },
  ilirTimurI: {
    label: "Ilir Timur I",
    value: "05",
    kelurahan: [
      { label: "18 Ilir", value: "1001" },
      { label: "16 Ilir", value: "1002" },
      { label: "13 Ilir", value: "1003" },
      { label: "14 Ilir", value: "1004" },
      { label: "15 Ilir", value: "1005" },
      { label: "17 Ilir", value: "1006" },
      { label: "20 Ilir D-III", value: "1007" },
      { label: "20 Ilir D-IV", value: "1008" },
      { label: "20 Ilir D-I", value: "1009" },
      { label: "Sungai Pangeran", value: "1010" },
      { label: "Kepandean Baru", value: "1011" },
    ],
  },
  ilirTimurII: {
    label: "Ilir Timur II",
    value: "06",
    kelurahan: [
      { label: "5 Ilir", value: "1005" },
      { label: "3 Ilir", value: "1006" },
      { label: "1 Ilir", value: "1007" },
      { label: "2 Ilir", value: "1008" },
      { label: "Lawang Kidul", value: "1009" },
      { label: "Sei Buah", value: "1012" },
    ],
  },
  sukarami: {
    label: "Sukarami",
    value: "07",
    kelurahan: [
      { label: "Talang Betutu", value: "1002" },
      { label: "Sukajaya", value: "1004" },
      { label: "Suka Rami", value: "1005" },
      { label: "Kebun Bunga", value: "1007" },
      { label: "Suka Bangun", value: "1009" },
      { label: "Talang Jambe", value: "1010" },
      { label: "Sukodadi", value: "1011" },
    ],
  },
  sako: {
    label: "Sako",
    value: "08",
    kelurahan: [
      { label: "Suka Maju", value: "1001" },
      { label: "Sako", value: "1002" },
      { label: "Sialang", value: "1006" },
      { label: "Sako Baru", value: "1007" },
    ],
  },
  kemuning: {
    label: "Kemuning",
    value: "09",
    kelurahan: [
      { label: "20 Ilir D-II", value: "1001" },
      { label: "Ario Kemuning", value: "1002" },
      { label: "Sekip Jaya", value: "1003" },
      { label: "Pahlawan", value: "1004" },
      { label: "Pipa Reja", value: "1005" },
      { label: "Talang Aman", value: "1006" },
    ],
  },
  kalidoni: {
    label: "Kalidoni",
    value: "10",
    kelurahan: [
      { label: "Bukit Sangkal", value: "1001" },
      { label: "Kalidoni", value: "1002" },
      { label: "Sei Selayur", value: "1003" },
      { label: "Sei Selincah", value: "1004" },
      { label: "Sei Lais", value: "1005" },
    ],
  },
  bukitKecil: {
    label: "Bukit Kecil",
    value: "11",
    kelurahan: [
      { label: "19 Ilir", value: "1001" },
      { label: "22 Ilir", value: "1002" },
      { label: "23 Ilir", value: "1003" },
      { label: "24 Ilir", value: "1004" },
      { label: "26 Ilir", value: "1005" },
      { label: "Talang Semut", value: "1006" },
    ],
  },
  gandus: {
    label: "Gandus",
    value: "12",
    kelurahan: [
      { label: "Gandus", value: "1001" },
      { label: "Karang Anyar", value: "1002" },
      { label: "36 Ilir", value: "1003" },
      { label: "Karang Jaya", value: "1004" },
      { label: "Pulo Kerto", value: "1005" },
    ],
  },
  kertapati: {
    label: "Kertapati",
    value: "13",
    kelurahan: [
      { label: "Kemas Rindo", value: "1001" },
      { label: "Kemang Agung", value: "1002" },
      { label: "Keramasan", value: "1003" },
      { label: "Kertapati", value: "1004" },
      { label: "Karya Jaya", value: "1005" },
      { label: "Ogan Baru", value: "1005" },
    ],
  },
  plaju: {
    label: "Plaju",
    value: "14",
    kelurahan: [
      { label: "Plaju Ulu", value: "1001" },
      { label: "Plaju Darat", value: "1002" },
      { label: "Plaju Ilir", value: "1003" },
      { label: "Bagus Kuning", value: "1004" },
      { label: "Komperta", value: "1005" },
      { label: "Talang Putri", value: "1006" },
      { label: "Talang Bubuk", value: "1007" },
    ],
  },
  alangAlangLebar: {
    label: "Alang-alang Lebar",
    value: "15",
    kelurahan: [
      { label: "Alang-Alang Lebar", value: "1001" },
      { label: "Sri Jaya", value: "1002" },
      { label: "Talang Kelapa", value: "1003" },
      { label: "Karya Baru", value: "1004" },
    ],
  },
  sematangBorang: {
    label: "Sematang Borang",
    value: "16",
    kelurahan: [
      { label: "Sri Mulya", value: "1001" },
      { label: "Sukamulya", value: "1002" },
      { label: "Lebung Gajah", value: "1003" },
      { label: "Karya Mulia", value: "1005" },
    ],
  },
  jakabaring: {
    label: "Jakabaring",
    value: "17",
    kelurahan: [
      { label: "8 Ulu", value: "1001" },
      { label: "9-10 Ulu", value: "1002" },
      { label: "15 Ulu", value: "1003" },
      { label: "Silaberanti", value: "1004" },
      { label: "Tuan Kentang", value: "1005" },
    ],
  },
  ilirTimurTiga: {
    label: "Ilir Timur Tiga",
    value: "18",
    kelurahan: [
      { label: "8 Ilir", value: "1001" },
      { label: "9 Ilir", value: "1002" },
      { label: "10 Ilir", value: "1003" },
      { label: "11 Ilir", value: "1004" },
      { label: "Kuto Batu", value: "1005" },
      { label: "Duku", value: "1006" },
    ],
  },
};

export default function HomePage() {
  const [adm3, setAdm3] = useState(""); // kode kecamatan
  const [adm4, setAdm4] = useState(""); // kode kelurahan
  const [data, setData] = useState<CuacaProps | null>(null);

  // fetch data ketika adm3 & adm4 dipilih
  useEffect(() => {
    if (!adm3 || !adm4) return;

    async function fetchData() {
      const result = await hasilAnalisisCuaca(adm3, adm4);
      setData(result);
    }
    fetchData();
  }, [adm3, adm4]);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6 w-full">
      {/* Bagian utama */}
      <div className={`col-span-12 ${data ? "xl:col-span-7" : "xl:col-span-12"} space-y-6`}>
        {/* Select Kecamatan & Kelurahan */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Kecamatan */}
          <select
            value={adm3}
            onChange={(e) => setAdm3(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/2"
          >
            <option value="">📍 Pilih Kecamatan</option>
            {Object.values(dataWilayah).map((kec) => (
              <option key={kec.value} value={kec.value}>
                {kec.label}
              </option>
            ))}
          </select>

          {/* Kelurahan */}
          <select
            value={adm4}
            onChange={(e) => setAdm4(e.target.value)}
            className="border p-2 rounded w-full sm:w-1/2"
            disabled={!adm3}
          >
            <option value="">🏘️ Pilih Kelurahan</option>
            {adm3 &&
              Object.values(dataWilayah)
                .find((kec) => kec.value === adm3)
                ?.kelurahan.map((kel) => (
                  <option key={kel.value} value={kel.value}>
                    {kel.label}
                  </option>
                ))}
          </select>
        </div>

        {/* Render hanya kalau data sudah ada */}
        {data ? (
          <>
            <ShortCuacaInfo cuaca={data} />
            <CuacaContainer cuaca={data} />
          </>
        ) : (
          <section className="w-full">
            <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-200 mb-6 text-center">
              🌦️ Pusat Informasi Cuaca
            </h2>

            <div className="grid grid-cols-12 gap-6 auto-rows-[220px] w-full">
              {/* Video utama */}
              <div className="col-span-12 md:col-span-7 row-span-2 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.3)] relative group">
                <video
                  src="/video/hujan.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/60 via-black/20 to-transparent backdrop-blur-md p-4">
                  <h3 className="text-white text-xl font-semibold drop-shadow-xl tracking-wide">
                    Informasi Hujan di Palembang
                  </h3>
                  <p className="text-slate-200/90 text-sm">Update setiap 10 menit</p>
                </div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-400/50 rounded-3xl transition-all duration-500"></div>
              </div>

              {/* Video 2 */}
              <div className="col-span-12 md:col-span-5 row-span-3 rounded-3xl overflow-hidden shadow-lg relative group">
                <video
                  src="/video/temperatur.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 w-full bg-black/40 backdrop-blur-sm p-3">
                  <h3 className="text-white font-semibold drop-shadow">🌡️ Suhu & Kelembapan</h3>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-purple-400/50 rounded-3xl transition-all duration-500"></div>
              </div>

              {/* Video 3 */}
              <div className="col-span-12 md:col-span-7 row-span-1 rounded-3xl overflow-hidden shadow-lg relative group">
                <video
                  src="/video/angin.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-between px-6 bg-black/30 backdrop-blur-sm">
                  <h3 className="text-white text-lg font-bold drop-shadow">💨 Arah Angin</h3>
                  <span className="text-white/80 text-sm">Data BMKG</span>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-blue-400/50 rounded-3xl transition-all duration-500"></div>
              </div>

              {/* Video 4 */}
              <div className="col-span-12 row-span-1 rounded-3xl overflow-hidden shadow-lg relative group">
                <video
                  src="/video/analisis.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 w-full bg-black/50 backdrop-blur-sm p-4">
                  <h3 className="text-white font-semibold tracking-wide">
                    ⏰ Ramalan 3 Jam & 3 Hari Kedepan
                  </h3>
                </div>
                <div className="absolute inset-0 border border-transparent group-hover:border-emerald-400/50 rounded-3xl transition-all duration-500"></div>
              </div>
            </div>
          </section>

        )}
      </div>

      {/* Sidebar kanan hanya muncul kalau ada data */}
      {data && (
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget cuaca={data} />
        </div>
      )}

      <div className="col-span-12">{data && <ForecastClient cuaca={data} />}</div>
    </div>
  );

}
