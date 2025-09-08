"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CuacaProps } from "../../types";

const AnalisisCuacaCarausel = () => {
  const [cuacaDalam3Hari, setCuacaDalam3Hari] = useState<CuacaProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=16.71.15.1001"
        );
        const data: CuacaProps = await res.json();
        setCuacaDalam3Hari(data);
      } catch (err) {
        console.error("Gagal fetch cuaca:", err);
      }
    };

    fetchData();
  }, []);

  const now = new Date();

// helper cek apakah item ini "Sekarang"
const isNowTime = (localDatetime: string, now: Date) => {
  const itemDate = new Date(localDatetime); // langsung parse full datetime dari API

  // pastikan tanggal sama
  const sameDate =
    itemDate.getFullYear() === now.getFullYear() &&
    itemDate.getMonth() === now.getMonth() &&
    itemDate.getDate() === now.getDate();

  if (!sameDate) return false;

  // cek selisih menit
  const diffMinutes = Math.abs((now.getTime() - itemDate.getTime()) / (1000 * 60));
  return diffMinutes <= 30; // threshold 30 menit
};

  if (!cuacaDalam3Hari) {
    return <div>Loading data cuaca...</div>;
  }

  return (
    <div className="w-full h-[820px]">
      <h1>{cuacaDalam3Hari.data[0].cuaca[0][0].local_datetime}</h1>
      <Carousel className="w-full">
        <CarouselContent>
          {cuacaDalam3Hari.data[0].cuaca.map((hari, hariIndex) => (
            <CarouselItem key={hariIndex}>
              <div className="p-6 rounded-2xl shadow">
                <div className="grid grid-rows-1 gap-1">
                  {hari &&
                    hari.map((item, index) => {
                      const timeStr = item.local_datetime
                        .split(" ")[1]
                        .slice(0, 5);
                      return (
                        <div
                          className="grid grid-cols-4 my-2 w-full"
                          key={index}
                        >
                          <h5>
                            {isNowTime(item.local_datetime, now)
                              ? "Sekarang"
                              : timeStr}
                          </h5>
                          <h5>{item.t}°</h5>
                          <h5>{item.weather_desc}</h5>
                          <Image
                            src={item.image}
                            alt={item.weather_desc}
                            width={35}
                            height={35}
                            className="ml-12"
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
