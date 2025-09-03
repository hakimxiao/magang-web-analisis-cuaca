import React from "react";

interface WindCardProps {
  location: string;
  windSpeed: number; // km/h
  direction: number; // derajat arah angin
  wd: string;
  wd_to: string;
}

const WindCard: React.FC<WindCardProps> = ({ location, windSpeed, direction, wd, wd_to  }) => {
  return (
    <div className="w-full rounded-2xl mt-1">
      <div className="flex flex-col items-center gap-1">
        {/* Lokasi */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Kota {location}</h2>

        {/* Kecepatan angin */}
        <p className="text-lg font-bold text-blue-500"><span className="text-sm font-light text-gray-500">Kecepatan Angin</span> {windSpeed} km/h</p>

        {/* Arah angin */}
        <div className="flex flex-col items-center mt-1">
          <div className="relative w-28 h-28 flex items-center justify-center">
            {/* Lingkaran kompas */}
            <div className="absolute w-full h-full border-4 border-dotted border-gray-300 rounded-full"></div>

            {/* Panah arah angin */}
            <div
              className="w-0 h-0 border-l-4 border-r-4 border-b-[16px] border-transparent border-b-blue-600 transition-transform duration-500"
              style={{ transform: `rotate(${direction}deg)` }}
            ></div>

            {/* Label arah */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 p-1 dark:text-white">N</span>
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 text-xs font-bold text-gray-700 p-1 dark:text-white">S</span>
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 p-1 dark:text-white">W</span>
            <span className="absolute right-0 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-700 p-1 dark:text-white">E</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {direction}° arah angin ~ Dari <span className="text-blue-500">{wd}</span> &raquo; <span className="text-blue-400">{wd_to}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WindCard;
