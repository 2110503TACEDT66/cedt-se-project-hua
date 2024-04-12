import Banner from '@/components/Banner'
import HotelCatalog from '@/components/HotelCatalog'
import getHotels from '@/libs/getHotels'
import { Suspense } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

export default function Home() {
  const hotel = getHotels()
  return (
    <main className="flex flex-col">
      <Banner/>
      <h1 className="flex items-center justify-center text-3xl font-bold text-black mt-10">
        Hotels
      </h1>
      <div>
        <Suspense fallback = {<h3 className="text-red-400">Loading...<LinearProgress /></h3>}>
            <HotelCatalog hotelJson={hotel} />
        </Suspense>
      </div>
    </main>
  )
}
