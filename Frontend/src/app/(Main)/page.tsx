'use client'
import Banner from '@/components/Banner'
import HotelCatalog from '@/components/HotelCatalog'
import getHotels from '@/libs/getHotels'
import { Suspense } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { useState } from 'react'
export default function Home() {
  const [search, setSearch] = useState('');
  const hotel = getHotels()
  return (
    <main className="flex flex-col">
      <Banner/>
      <h1 className="flex items-center justify-center text-3xl font-bold text-black mt-10">
        Hotels
      </h1>
      <div>
        <input type="search" placeholder='Searching...' onChange={(e)=>{setSearch(e.target.value)}}/>
        <Suspense fallback = {<h3 className="text-red-400">Loading...<LinearProgress /></h3>}>
            <HotelCatalog hotelJson={hotel} search={search}/>
        </Suspense>
      </div>
    </main>
  )
}
