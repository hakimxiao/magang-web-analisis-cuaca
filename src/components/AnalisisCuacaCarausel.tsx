import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { CuacaProps } from "../../types";

const AnalisisCuacaCarausel = ({dataCuaca}: {dataCuaca: CuacaProps}) => {

  const now = new Date();

// helper cek apakah item ini "Sekarang"
const isNowTime = (localDatetime: string, now: Date) => {
  const itemDate = new Date(localDatetime); // langsung parse full datetime dari API


  const sameDate =
    itemDate.getFullYear() === now.getFullYear() &&
    itemDate.getMonth() === now.getMonth() &&
    itemDate.getDate() === now.getDate();

  if (!sameDate) return false;

  // cek selisih menit
  const diffMinutes = Math.abs((now.getTime() - itemDate.getTime()) / (1000 * 60));
  return diffMinutes <= 30; // threshold 30 menit
};


  return (
    <div className="w-full">
      <div className="border border-slate-400 flex items-center justify-center w-1/2 mx-auto">
        <h1>{dataCuaca.data[0].cuaca[0][0].local_datetime}</h1>
        </div>
      <Carousel className="w-full">
        <CarouselContent>
          {dataCuaca.data[0].cuaca.map((hari, hariIndex) => (
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
                            width={40}
                            height={40}
                            className="ml-14"
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
