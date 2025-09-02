"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { ArrowDownIcon, ArrowUpIcon, BoxIconLine, GroupIcon, } from "@/icons";
import { TiWeatherWindyCloudy, TiWeatherWindy, TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti"
import {flatWeather} from "../../../constant";
import WindCompass from "../WindCompass";
import GrafikKelembapan from "../charts/radial/GrafikKelembapan";


export const CuacaContainer = () => {
    return (
        <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 md:gap-2">
            {/* <!-- Arah Angin --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherWindy className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p> <span className="text-blue-500 font-bold">A</span>rah <span className="text-blue-500 font-bold">A</span>ngin
                    </p>
                </div>

                <div className="w-full">
                  <WindCompass direction={flatWeather.cuaca[0].wd_deg} location="Palembang" windSpeed={flatWeather.cuaca[0].ws} wd={flatWeather.cuaca[0].wd} wd_to={flatWeather.cuaca[0].wd_to}  />
                </div>
            </div>
            {/* <!-- Arah Angin --> */}

            {/* <!-- Kelembapan Udara --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherWindyCloudy className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p> <span className="text-blue-500 font-bold">K</span>elembapan <span className="text-blue-500 font-bold">U</span>dara
                    </p>
                </div>

                <div className="w-full">
                  <GrafikKelembapan hu={flatWeather.cuaca[0].hu} lokasi={flatWeather.lokasi.desa} waktu={flatWeather.cuaca[0].local_datetime} />
                </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherPartlySunny className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p> <span className="text-blue-500 font-bold">T</span>utupan <span className="text-blue-500 font-bold">A</span>wan
                    </p>
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Tutupan Awan
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            3,782
                        </h4>
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        11.01%
                    </Badge>
                </div>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherSunny className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p> <span className="text-blue-500 font-bold">S</span>uhu <span className="text-blue-500 font-bold">U</span>dara
                    </p>
                </div>

                <div className="flex items-end justify-between mt-5">
                    <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Suhu Udara
                        </span>
                        <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                            3,782
                        </h4>
                    </div>
                    <Badge color="success">
                        <ArrowUpIcon />
                        11.01%
                    </Badge>
                </div>
            </div>   
            {/* <!-- parameter udara END --> */}
        </div>
    );
};
