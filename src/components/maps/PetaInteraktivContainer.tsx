"use client";
import dynamic from "next/dynamic";
import Jam from "../jam/Jam";
import { motion } from "framer-motion";
import { CloudRain } from "lucide-react";

const RainMap = dynamic(() => import("./PetaInteraktiv"), { ssr: false });

const PetaInteraktivContainer = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-100 p-4 md:p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
        <div className="flex items-center gap-2">
          <CloudRain className="w-6 h-6 text-blue-500" />
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 relative">
            Peta Hujan
            <span className="block w-16 h-1 mt-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></span>
          </h1>
        </div>
        <Jam />
      </div>

      {/* Card Map */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl shadow-blue-100/50 border border-white/40 overflow-hidden hover:scale-[1.01] hover:shadow-2xl transition-all duration-500"
      >
        <RainMap height="65vh" />

        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/10 via-transparent to-blue-500/10 pointer-events-none" />
      </motion.div>
    </main>
  );
};

export default PetaInteraktivContainer;
