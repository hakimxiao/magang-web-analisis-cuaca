// Lokasi umum (bisa untuk root maupun data.lokasi)
export interface Lokasi {
  adm1: string;
  adm2: string;
  adm3: string;
  adm4: string;
  provinsi: string;
  kotkab: string;
  kecamatan: string;
  desa: string;
  lon: number;
  lat: number;
  timezone: string;
  type?: string; // optional, karena hanya ada di data.lokasi
}

// Data cuaca per jam
export interface Cuaca {
  datetime: string; // ISO string
  t: number; // suhu
  tcc: number; // total cloud cover (%)
  tp: number; // curah hujan (mm)
  weather: number; // kode cuaca
  weather_desc: string;
  weather_desc_en: string;
  wd_deg: number; // arah angin (derajat)
  wd: string; // arah angin dari
  wd_to: string; // arah angin ke
  ws: number; // kecepatan angin
  hu: number; // kelembaban (%)
  vs: number; // visibility (m)
  vs_text: string; // deskripsi visibility
  time_index: string;
  analysis_date: string; // ISO string
  image: string; // URL icon cuaca
  utc_datetime: string;
  local_datetime: string;
}

// Data per wilayah (lokasi + array cuaca harian)
export interface DataWilayah {
  lokasi: Lokasi;
  cuaca: Cuaca[][];
}

// Root props (yang akan dipakai untuk komponen)
export interface CuacaProps {
  lokasi: Lokasi;
  data: DataWilayah[];
}
