"use client";
import React from "react";
import Map from "../maps/Map";
import {IoMapOutline} from "react-icons/io5";

export const EcommerceMetrics = () => {
  return (
    <div>
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <div className="flex">

          <IoMapOutline className="text-gray-800 size-6 dark:text-white/90" />
          </div>
        </div>

        <Map />
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
};
