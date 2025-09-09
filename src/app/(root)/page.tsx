import { CuacaContainer } from "@/components/ecommerce/CuacaContainer";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import ShortCuacaInfo from "@/components/ecommerce/ShortCuacaInfo";
import { hasilAnalisisCuaca } from "../../lib/api/data.action";


export default async function HomePage() {

  const data = await hasilAnalisisCuaca();
  console.log("data cuaca:", data);

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <ShortCuacaInfo cuaca={data}  />

          <CuacaContainer cuaca={data} />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <MonthlyTarget cuaca={data} />
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
