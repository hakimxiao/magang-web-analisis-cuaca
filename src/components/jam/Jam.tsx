"use client";

import { useEffect, useState } from "react";

const Jam = () => {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      };
      setTime(now.toLocaleString("id-ID", options) + " WIB");
    };

    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className="
        px-2 py-2 rounded-2xl shadow-lg border 
        backdrop-blur-xl transition-all duration-500
        bg-white/40 border-slate-200 
        dark:bg-slate-900/40 dark:border-slate-700
      "
    >
      <p
        className="
          text-center font-mono font-semibold tracking-wide 
          text-slate-800 dark:text-slate-100 
          text-md md:text-md drop-shadow-sm
        "
      >
        {time}
      </p>
    </div>
  );
};

export default Jam;
