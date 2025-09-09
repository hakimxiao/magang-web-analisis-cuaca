"use client";

import React from "react";
import ApexCharts from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TemperatureData {
  label: string; // misal: "Pagi"
  value: number; // misal: 15
}

interface TemperatureChartProps {
  title?: string;
  data: TemperatureData[];
}

const TemperatureChart: React.FC<TemperatureChartProps> = ({
  title = "Temperature",
  data,
}) => {
  // Daftar label tetap
  const fixedLabels = ["Pagi", "Siang", "Sore", "Malam"];

  // Normalisasi data → kalau tidak ada, set value = 0
  const normalizedData: TemperatureData[] = fixedLabels.map((label) => {
    const found = data.find((d) => d.label === label);
    return { label, value: found ? found.value : 0 };
  });

  const series = [
    {
      name: "Temperature",
      data: normalizedData.map((d) => d.value),
    },
  ];

  const options: ApexCharts.ApexOptions = {
    chart: {
      type: "line",
      height: 180,
      toolbar: { show: false },
      sparkline: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    markers: {
      size: 5,
      colors: ["#fff"],
      strokeColors: "#3b82f6",
      strokeWidth: 2,
    },
    xaxis: {
      categories: normalizedData.map((d) => d.label),
      labels: {
        style: { colors: "#64748b", fontSize: "12px" },
      },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: {
        formatter: (val: number) => `${val}°`,
        style: { fontSize: "12px", colors: "#64748b" },
      },
      min: Math.min(...normalizedData.map((d) => d.value)) - 2,
      max: Math.max(...normalizedData.map((d) => d.value)) + 2,
    },
    title: {
      text: title,
      align: "left",
      style: { fontSize: "16px", fontWeight: "bold", color: "#334155" },
    },
    grid: {
      borderColor: "#e2e8f0",
      strokeDashArray: 4,
    },
    tooltip: {
      enabled: true,
    },
  };

  return (
    <div className="h-[230px] w-[310px] ml-4 bg-white/30 backdrop-blur-md rounded-xl shadow-md p-4">
      <Chart options={options} series={series} type="line" height={150} />
      <div className="flex items-center justify-center mt-2 gap-11">
        {normalizedData.map((d) => (
          <div key={d.label} className="text-slate-800 flex flex-col items-center">
            <h3>{d.label}</h3>
            <p>{d.value === 0 ? "-" : d.value}°</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemperatureChart;
