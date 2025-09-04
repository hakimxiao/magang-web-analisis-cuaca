"use client";

import { useEffect, useState } from 'react'

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
    <div>
        {time}
      </div>
  )
}

export default Jam