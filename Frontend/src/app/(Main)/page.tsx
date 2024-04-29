'use client'
import Banner from '@/components/Banner'
import HotelCatalog from '@/components/HotelCatalog'
import getHotels from '@/libs/getHotels'
import { useEffect } from 'react'
import { useState, useRef } from 'react'

export default function Home() {
  const [hotels, setHotels] = useState(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('');

  useEffect(() => {
    getHotels().then((data) => setHotels(data));
  }, []);
  
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
        <div className="flex justify-center">
      <div className="relative w-1/2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
          <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input 
          type="search" 
          id="search-box" 
	        ref={inputRef}
	        max={100}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50" 
          placeholder="Enter hotel name!!"  
          
        />
      </div>
    </div>

        </form>
          <HotelCatalog hotelJson={hotels} search={search}/>
      </div>
    </main>
  )
}
