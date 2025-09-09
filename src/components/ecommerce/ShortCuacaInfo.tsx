import { getCurrentTime } from "@/lib/utils";
import { IoLocationOutline, IoWaterOutline } from "react-icons/io5";
import { MdOutlineVisibility } from "react-icons/md";
import { TiWeatherWindy } from "react-icons/ti";
import ApexChart from "../LineChart";
import { CuacaProps } from "../../../types";

function getLabelByHour(hour: number): "Pagi" | "Siang" | "Sore" | "Malam" {
  if (hour >= 1 && hour < 10) return "Pagi";
  if (hour >= 10 && hour < 15) return "Siang";
  if (hour >= 15 && hour < 18) return "Sore";
  return "Malam";
}

export default function ShortCuacaInfo({ cuaca }: { cuaca: CuacaProps }) {
  const currentTime = getCurrentTime();

  // mapping data BMKG → tempData sesuai jam
  const tempData = cuaca.data[0].cuaca[0].map((item) => {
    const date = new Date(item.local_datetime); // "2025-09-09 07:00:00"
    const hour = date.getHours();
    const label = getLabelByHour(hour);
    return {
      label,
      value: item.t,
    };
  });

  // optional: filter supaya tiap label hanya ambil 1 data (misal yg pertama)
  const uniqueTempData = Object.values(
    tempData.reduce((acc, curr) => {
      if (!acc[curr.label]) acc[curr.label] = curr;
      return acc;
    }, {} as Record<string, { label: string; value: number }>)
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 pb-5 bg-gradient-to-b from-sky-300 via-sky-100 to-white sm:p-2 text-black">
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[650px] xl:min-w-full">
          <div className="flex flex-row gap-0.5">
            <div className="w-full h-[280px] flex flex-col">
              <div className="ml-3 mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <IoLocationOutline className="size-6" />
                  <h3 className="ml-2">{cuaca.data[0].lokasi.desa}</h3>
                </div>
                <div className="flex items-center">
                  <h3 className="font-light text-slate-500 text-sm">
                    Hari Ini {currentTime} WIB
                  </h3>
                </div>
              </div>
              <div className="relative flex flex-col items-center mx-auto h-[100px]">
                <h1 className="text-8xl font-extralight mt-6 mb-4">
                  {cuaca.data[0].cuaca[0][0].t}
                  <span className="absolute top-5 text-5xl">°</span>
                </h1>
                <p className="font-light text-md text-slate-500">
                  {cuaca.data[0].cuaca[0][0].weather_desc}
                </p>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <TiWeatherWindy className="size-6" />
                    <h3>{cuaca.data[0].cuaca[0][0].ws}km/h</h3>
                  </div>
                  <div className="ml-2 flex items-center">
                    <IoWaterOutline className="size-6" />
                    <h3>{cuaca.data[0].cuaca[0][0].hu}%</h3>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineVisibility className="size-6" />
                    <p>{cuaca.data[0].cuaca[0][0].vs_text}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-[280px]">
              <div className="h-[240px] w-[280px] mt-6 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-m">
                <div className="flex flex-col">
                  <ApexChart title="Temperature" data={uniqueTempData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
