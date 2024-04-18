'use client'
import Banner from '@/components/Banner'
import HotelCatalog from '@/components/HotelCatalog'
import getHotels from '@/libs/getHotels'
import { Suspense } from 'react'
import LinearProgress from '@mui/material/LinearProgress'
import { useState, useRef } from 'react'

const hotel = getHotels()

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('');
  // handle search function
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(inputRef.current)
    setSearch(inputRef.current.value);
  };

  return (
    <main className="flex flex-col">
      <Banner/>
      <h1 className="flex items-center justify-center text-3xl font-bold text-black mt-10">
        Hotels
      </h1>
      <div>
        <form className="m-3" onChange={(e)=>{handleSearch(e)}}>
          <input ref={inputRef} type="search" placeholder='Searching...' max={100} className='pl-1'/>
        </form>
        <Suspense fallback = {<h3 className="text-red-400">Loading...<LinearProgress /></h3>}>
            <HotelCatalog hotelJson={hotel} search={search}/>
        </Suspense>
      </div>
    </main>
  )
}
