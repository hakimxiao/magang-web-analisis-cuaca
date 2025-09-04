import React from 'react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image';

const page = () => {
  return (
    
    <div className='flex items-center justify-center'><Carousel className='flex items-center justify-center w-full'>
  <CarouselContent >
    <CarouselItem>
        <Image src="/general/jk.png" alt='jaka' width={700} height={450} />
    </CarouselItem>
    <CarouselItem>
        <Image src="/general/jk.png" alt='jaka' width={700} height={450} />
    </CarouselItem>
    <CarouselItem>
        <Image src="/general/jk.png" alt='jaka' width={700} height={450} />
    </CarouselItem>
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel></div>
  )
}

export default page;