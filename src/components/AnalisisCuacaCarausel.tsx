"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CuacaProps } from "../../types";
import Jam from "./jam/Jam";
import { Badge } from "@/components/ui/badge";

const AnalisisCuacaCarausel = ({ dataCuaca }: { dataCuaca: CuacaProps }) => {
  const now = new Date();

  // helper cek apakah item ini "Sekarang"
  const isNowTime = (localDatetime: string, now: Date) => {
    const itemDate = new Date(localDatetime);
    const sameDate =
      itemDate.getFullYear() === now.getFullYear() &&
      itemDate.getMonth() === now.getMonth() &&
      itemDate.getDate() === now.getDate();

    if (!sameDate) return false;

    const diffMinutes = Math.abs(
      (now.getTime() - itemDate.getTime()) / (1000 * 60)
    );
    return diffMinutes <= 30; // threshold 30 menit
  };

  return (
    <div className="w-full">
      {/* Jam di atas */}
      <div className="flex items-center justify-center mb-6">
        <Jam />
      </div>

      {/* Carousel */}
      <Carousel className="w-full">
        <CarouselContent>
          {dataCuaca.data[0].cuaca.map((hari, hariIndex) => (
            <CarouselItem key={hariIndex}>
              <div
                className="
                  p-6 rounded-2xl shadow-lg 
                  bg-white/50 dark:bg-slate-900/40
                  backdrop-blur-md border border-slate-200 dark:border-slate-700
                  transition-all duration-500
                "
              >
                <div className="grid gap-3">
                  {hari?.map((item, index) => {
                    const timeStr = item.local_datetime
                      .split(" ")[1]
                      .slice(0, 5);

                    const nowStatus = isNowTime(item.local_datetime, now);

                    return (
                      <div
                        key={index}
                        className={`
                          grid grid-cols-[auto_1fr_auto_auto] items-center gap-3
                          px-3 py-2 rounded-xl
                          transition-all duration-300
                          ${
                            nowStatus
                              ? "bg-gradient-to-r from-sky-400/30 to-sky-200/30 dark:from-sky-600/30 dark:to-sky-500/20"
                              : "hover:bg-slate-200/40 dark:hover:bg-slate-800/40"
                          }
                        `}
                      >
                        {/* Waktu / Sekarang */}
                        <div>
                          {nowStatus ? (
                            <Badge className="bg-sky-500 text-white">
                              Sekarang
                            </Badge>
                          ) : (
                            <h5 className="font-medium text-slate-700 dark:text-slate-200">
                              {timeStr}
                            </h5>
                          )}
                        </div>

                        {/* Deskripsi cuaca */}
                        <p
                          className="
                            text-slate-600 dark:text-slate-300 text-sm
                            whitespace-normal
                            md:truncate md:whitespace-nowrap
                          "
                        >
                          {item.weather_desc}
                        </p>

                        {/* Suhu */}
                        <h5 className="font-semibold text-slate-800 dark:text-slate-100">
                          {item.t}°
                        </h5>

                        {/* Icon cuaca */}
                        <Image
                          src={item.image}
                          alt={item.weather_desc}
                          width={40}
                          height={40}
                          className="drop-shadow-md"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default AnalisisCuacaCarausel;
