"use client"

import { getCurrentTime } from "@/lib/utils";
import { IoLocationOutline, IoWaterOutline } from "react-icons/io5";
import { MdOutlineVisibility } from "react-icons/md";
import { TiWeatherWindy } from "react-icons/ti";
import ApexChart from "../LineChart";


export default function ShortCuacaInfo({ lokasi, suhu, keadaan, angin, kelembapan, visibility }: { lokasi: string, suhu: number, keadaan: string, angin: number, kelembapan: number, visibility: string }) {
  const currentTime = getCurrentTime();
  const tempData = [
    { label: "Pagi", value: 15 },
    { label: "Siang", value: 14 },
    { label: "Sore", value: 16 },
    { label: "Malam", value: 12 },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 pb-5 bg-gradient-to-b from-sky-300 via-sky-100 to-white sm:p-2 text-black">

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="min-w-[650px] xl:min-w-full">
          <div className="flex flex-row gap-0.5">

            <div className="w-full h-[280px] flex flex-col">
              <div className="ml-3 mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <IoLocationOutline className="size-6" />
                  <h3 className="ml-2">{lokasi}</h3>
                </div>
                <div className=" flex items-center">
                  <h3 className="font-light text-slate-500 text-sm">Hari Ini {currentTime} WIB</h3>
                </div>

              </div>
              <div className="relative flex flex-col items-center mx-auto h-[100px]">
                <h1 className="text-8xl font-extralight mt-6 mb-4">{suhu}<span className="absolute top-5 text-5xl">°</span></h1>
                <p className="font-light text-md text-slate-500">{keadaan}</p>
                <div className="mt-10 grid grid-cols-3 gap-3">
                  <div className="flex items-center">
                    <TiWeatherWindy className="size-6" />
                    <h3>{angin}km/h</h3>
                  </div>
                  <div className="ml-2 flex items-center">
                    <IoWaterOutline className="size-6" />
                    <h3>{kelembapan}%</h3>
                  </div>
                  <div className="flex items-center">
                    <MdOutlineVisibility className="size-6" />
                    <h3>{visibility}</h3>
                  </div>

                </div>
              </div>
            </div>
            <div className="w-full h-[280px]">
              <div className="h-[240px] w-[280px] mt-6 bg-white-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-m">
                <div className="flex flex-col">
                  <ApexChart title="Temperature" data={tempData} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
