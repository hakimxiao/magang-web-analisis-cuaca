import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface WindCardProps {
  location: string;
  windSpeed: number; // km/h
  direction: number; // derajat arah angin
  wd: string;
  wd_to: string;
}

const WindCard: React.FC<WindCardProps> = ({ location, windSpeed, direction, wd, wd_to  }) => {
  return (
    <Card className="w-full rounded-2xl shadow-md bg-white">
      <CardContent className="flex flex-col items-center gap-3">
        {/* Lokasi */}
        <h2 className="text-lg font-semibold text-gray-800">{location}</h2>

        {/* Kecepatan angin */}
        <p className="text-lg font-bold text-blue-500"><span className="text-sm font-light text-gray-500">Kecepatan Angin</span> {windSpeed} km/h</p>

        {/* Arah angin */}
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 flex items-center justify-center">
            {/* Lingkaran kompas */}
            <div className="absolute w-full h-full border-4 border-dotted border-gray-300 rounded-full"></div>

            {/* Panah arah angin */}
            <div
              className="w-0 h-0 border-l-4 border-r-4 border-b-[16px] border-transparent border-b-blue-600 transition-transform duration-500"
              style={{ transform: `rotate(${direction}deg)` }}
            ></div>

            {/* Label arah */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 p-1">N</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 p-1">S</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 p-1">W</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 p-1">E</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {direction}° arah angin ~ Dari <span className="text-blue-500">{wd}</span> &raquo; <span className="text-blue-400">{wd_to}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WindCard;
