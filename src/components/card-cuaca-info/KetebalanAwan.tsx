import React from 'react'
import awan from '../../../constant/animations/awan.json'
import Lottie from "lottie-react";


const KetebalanAwan = ({visibility, tutupan, visibility_nm}: {visibility: string, tutupan: number, visibility_nm: number}) => {
    return (
        <div className="flex flex-col gap-0 items-center justify-center mt-1">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Tutupan Awan {tutupan}%</h2>
            <p className="text-sm font-light mt-1 text-gray-500">
                Kejelasan Arah Pandang {visibility}
            </p>
            <Lottie animationData={awan} loop autoplay className="size-48 mt-0" />

            <p className="text-sm text-gray-500">
            Arah Pandang Dalam Angka {visibility_nm}
          </p>
        </div>
    )
}

export default KetebalanAwan