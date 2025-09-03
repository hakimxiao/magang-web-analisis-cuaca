"use client";
import React from "react";
import Thermometer from "react-thermometer-component";

interface ThermometerUdaraProps {
  suhu: number;
  max?: number;
  min?: number;
}

const ThermometerUdara: React.FC<ThermometerUdaraProps> = ({ suhu, max = 50, min = 0 }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Thermometer
        theme="light"
        value={suhu}
        max={max}
        min={min}
        steps={5}
        format="°C"
        size="large"
        height={200}
      />
      <p className="mt-2 text-gray-700 dark:text-gray-200 font-semibold">
        Suhu Saat Ini: {suhu}°C
      </p>
    </div>
  );
};

export default ThermometerUdara;
