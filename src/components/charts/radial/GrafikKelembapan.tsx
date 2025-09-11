"use client";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget({ hu, lokasi }: { hu: number, waktu: string, lokasi: string }) {
  const options: ApexOptions = {
    colors: ["#465FFF"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "radialBar",
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: "80%",
        },
        track: {
          background: "#E4E7EC",
          strokeWidth: "100%",
          margin: 5, // margin is in pixels
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: "36px",
            fontWeight: "600",
            offsetY: -40,
            color: "#1D2939",
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "solid",
      colors: ["#465FFF"],
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Progress"],
  };


  return (
    <div className="rounded-2xl mt-1">
      <div className=" rounded-2xl flex flex-col items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Kelurahan {lokasi}
        </h2>
        <p className="text-sm font-light text-gray-500 mt-1">
          Kelembapan {hu}%
        </p>

        <div className="relativ">
          <div className="max-h-[350px] mt-3">
            <ReactApexChart
              options={options}
              series={[hu]}
              type="radialBar"
              height={250}
            />
          </div>


        </div>
      </div>
    </div>
  );
}
