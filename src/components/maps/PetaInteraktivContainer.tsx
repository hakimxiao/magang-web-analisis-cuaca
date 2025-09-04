"use client";
import dynamic from "next/dynamic";
import Jam from "../jam/Jam";


const RainMap = dynamic(() => import("./PetaInteraktiv"), { ssr: false });

const PetaInteraktivContainer = () => {
     

     
  return (
    <main>
        <div className="flex justify-between items-center">
       <h1 className="text-2xl font-semibold mb-4">Peta Hujan</h1>
        <Jam />
        </div>
      <RainMap height="70vh" />
    </main>
  )
}

export default PetaInteraktivContainer