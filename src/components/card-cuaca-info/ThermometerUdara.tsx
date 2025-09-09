"use client";

import { useTheme } from "@/context/ThemeContext";
import React from "react";
import Thermometer from "react-thermometer-component";

interface ThermometerUdaraProps {
  suhu: number;
  max?: number;
  min?: number;
}

const ThermometerUdara: React.FC<ThermometerUdaraProps> = ({ suhu, max = 50, min = 10 }) => {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col items-center justify-center mt-1">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Temperatur Udara</h2>
      <p className="text-sm font-light text-gray-500 mt-1">
        Derajat Suhu Udara {suhu}°F
      </p>

      <div className="m-[15px]">
        <Thermometer
          theme={theme}
          value={suhu}
          max={max}
          min={min}
          steps={2}
          format="°C"
          size="medium"
          height={160}
        />

      </div>
      <p className="text-sm text-gray-500 mt-1">
        Suhu Saat Ini: {suhu}°C
      </p>
    </div>
  );
};

export default ThermometerUdara;
