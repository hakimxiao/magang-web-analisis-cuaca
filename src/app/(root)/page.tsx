"use client";

import { CuacaContainer } from "@/components/ecommerce/CuacaContainer";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import FadeContent from "@/components/Animations/FadeContent/FadeContent";
import { flatWeather } from "../../../constant";
import ShortCuacaInfo from "@/components/ecommerce/ShortCuacaInfo";


export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <ShortCuacaInfo cuaca={flatWeather}  />

        <FadeContent blur duration={1000} delay={500}>
          <CuacaContainer />

        </FadeContent>
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget cuaca={flatWeather} />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
    </div>
  );
}
