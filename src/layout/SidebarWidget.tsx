import React from "react";

export default function SidebarWidget() {
  return (
    <div
      className={`
        mx-auto w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-left dark:bg-white/[0.03]`}
    >
      <p className="mb-4 text-gray-500 text-theme-sm dark:text-gray-400">
        © 2025 Tailadmin. Data & Analisis oleh BMKG | OpenWeather |
      </p>
      <a
        href="https://www.bmkg.go.id/"
        target="_blank"
        className="flex items-center justify-center p-3 font-medium text-slate-600 rounded-lg border border-black
             hover:opacity-90 transition"
      >
        KUNJUNGI BMKG RESMI
      </a>

    </div>
  );
}
