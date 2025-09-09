"use client";

import { MdOutlineRecordVoiceOver } from "react-icons/md";
import { GiVillage } from "react-icons/gi";
import { PiCityLight } from "react-icons/pi";

import { Dropdown } from "../ui/dropdown/Dropdown";
import { useState } from "react";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import AnalisisCuacaCarausel from "../AnalisisCuacaCarausel";
import { CuacaProps } from "../../../types";

export default function MonthlyTarget({ cuaca }: {cuaca: CuacaProps}) {

  const [isOpen, setIsOpen] = useState(false);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  return (
    <div className="h-[940px] p-5 rounded-4xl text-black dark:text-white border-2 border-gray-400shadow-md">
      <div className="px-5 pt-5 rounded-2xl pb-11 dark:bg-transparent sm:px-6 sm:pt-6 bg-gradient-to-br">
        <div className="flex items-center justify-between mb-7">
          <div>
              <div className="flex items-center gap-2 ">
                <PiCityLight className="size-7"/>
                <span className="font-outfit font-bold text-xl">Kecamatan {cuaca.lokasi.kecamatan}</span> 
              </div>
            
            <div className="ml-5 flex items-center gap-2 ">
                <GiVillage className="text-slate-500 size-5" />
                <h3 className="text-slate-500">Kelurahan {cuaca.lokasi.desa}</h3>
            </div>
          
          </div>
          <div className="relative inline-block">
            <button onClick={toggleDropdown} className="dropdown-toggle">
              <MdOutlineRecordVoiceOver className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 w-[25px] h-[25px]" />
            </button>
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="w-40 p-2"
            >
              <DropdownItem
                tag="a"
                onItemClick={closeDropdown}
                className="flex w-full font-normal text-left text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
              >
                Baca Oleh AI
              </DropdownItem>
            </Dropdown>
          </div>
        </div>
        <div>
            <AnalisisCuacaCarausel dataCuaca={cuaca} />
        </div>
      </div>


    </div>
  );
}
