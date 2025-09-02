"use client";
// import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import dynamic from "next/dynamic";
// Dynamically import the ReactApexChart component
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function MonthlyTarget({hu, waktu, lokasi}: {hu: number, waktu: string, lokasi: string}) {
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
      <div className=" rounded-2xl  flex flex-col items-center">    
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Kelurahan {lokasi}
            </h2>
            <p className="text-lg font-bold text-blue-500">
              <span className="text-sm font-light text-gray-500">Persentase Humadity</span> {hu}%
          </p>

        <div className="relative">
          <div className="max-h-[350px] mt-1">
            <ReactApexChart
              options={options}
              series={[hu]}
              type="radialBar"
              height={250}
            />
          </div>

          <span className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] rounded-full bg-success-50 px-3 py-1 text-xs font-medium text-success-600 dark:bg-success-500/15 dark:text-success-500">
            {waktu}
          </span>
        </div>
      </div>
    </div>
  );
}
