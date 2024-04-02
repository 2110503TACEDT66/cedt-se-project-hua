import Banner from '@/components/Banner'
import HotelCatalog from '@/components/HotelCatalog'
import getHotels from '@/libs/getHotels'
import { Suspense } from 'react'
import LinearProgress from '@mui/material/LinearProgress'

export default function Home() {
  const hotel = getHotels()
  return (
    <main className="bg-[url('/Images/bg.png')] bg-cover bg-center bg-no-repeat">
      <Banner/>
      <h1 className="flex items-center justify-center text-3xl font-medium text-pink-200">Hotels</h1>
      <Suspense fallback = {<h3 className="text-red-400">Loading...<LinearProgress /></h3>}>
          <HotelCatalog hotelJson={hotel} />
      </Suspense>
    </main>
  )
}
