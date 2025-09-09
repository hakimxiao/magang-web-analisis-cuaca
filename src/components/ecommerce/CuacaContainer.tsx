"use client";
import React from "react";
import { TiWeatherWindyCloudy, TiWeatherWindy, TiWeatherPartlySunny, TiWeatherSunny } from "react-icons/ti"
import WindCompass from "../WindCompass";
import GrafikKelembapan from "../charts/radial/GrafikKelembapan";
import KetebalanAwan from "../card-cuaca-info/KetebalanAwan";
import ThermometerUdara from "../card-cuaca-info/ThermometerUdara";
import { CuacaProps } from "../../../types";



export const CuacaContainer = ({cuaca}: {cuaca: CuacaProps}) => {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-4">
            {/* <!-- Arah Angin Start --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherWindy className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p>Arah Angin
                    </p>
                </div>

                <div className="w-full">
                    <WindCompass direction={cuaca.data[0].cuaca[0][0].wd_deg} location="Palembang" windSpeed={cuaca.data[0].cuaca[0][0].ws} wd={cuaca.data[0].cuaca[0][0].wd} wd_to={cuaca.data[0].cuaca[0][0].wd_to} />
                </div>
            </div>
            {/* <!-- Arah Angin End --> */}

            {/* <!-- Kelembapan Udara --> */}
            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherWindyCloudy className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p>Kelembapan Udara
                    </p>
                </div>

                <div className="w-full">
                    <GrafikKelembapan hu={cuaca.data[0].cuaca[0][0].hu} lokasi={cuaca.lokasi.desa} waktu={cuaca.data[0].cuaca[0][0].local_datetime} />
                </div>
            </div>
            {/* <!-- Kelembapan Udara End --> */}

            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherPartlySunny className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p>Tutupan Awan
                    </p>
                </div>

                <div className="w-full">
                    <KetebalanAwan visibility_nm={cuaca.data[0].cuaca[0][0].vs} tutupan={cuaca.data[0].cuaca[0][0].tcc} visibility={cuaca.data[0].cuaca[0][0].vs_text} />
                </div>
            </div>


            <div className="rounded-2xl border border-gray-200 bg-white p-1 dark:border-gray-800 dark:bg-white/[0.03] md:p-2.5">
                <div className="flex items-center justify-center h-11 bg-gray-100 rounded-xl dark:bg-gray-800 dark:text-white/90">
                    <TiWeatherSunny className="text-gray-800 size-8 dark:text-white/90 mr-1" />
                    <p>Suhu dara</p>
                </div>

                <div className="w-full">
                    <ThermometerUdara suhu={cuaca.data[0].cuaca[0][0].t} />
                </div>
            </div>
            {/* <!-- parameter udara END --> */}
        </div>
    );
};
