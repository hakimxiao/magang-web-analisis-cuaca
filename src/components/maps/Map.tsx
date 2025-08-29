"use client";

import dynamic from "next/dynamic";

const Map = dynamic(() => import("./LeafLet"), {
    ssr: false,
})

const Page = () => {
  return (
    <Map />
  )
}

export default Page;