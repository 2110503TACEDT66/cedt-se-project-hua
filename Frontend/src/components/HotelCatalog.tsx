'use client'
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";

export default function HotelCatalog({hotelJson, search}:{hotelJson:Promise<HotelJson>, search:String}){
    // const hotelJsonReady = await hotelJson
    const [filteredHotels, setFilteredHotels] = useState<HotelItem[]>([]);

  useEffect(() => {
    async function filterHotels() {
      const data = await hotelJson;
      // filter hotels based on search if search is not empty or undefined return all hotels, else return searched hotels
      setFilteredHotels(
        data.data.filter((hotelItem) =>
          search?.toLocaleLowerCase() === '' || search === undefined ? hotelItem : hotelItem.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
        )
      );
    }

    filterHotels();
  }, [hotelJson, search]);
    
    return(

      <div className="m-5 flex flex-row flex-wrap justify-around content-around p-2.5">
        {
          filteredHotels.length === 0 ? <h1 className="text-2xl shadow-lg p-5 shadow-red-400/50 rounded-lg font-medium text-red-400">No Hotels Found</h1> :
            filteredHotels.map((HotelItems)=>(
                <Link href={`/hotel/${HotelItems.id}`} className="w-full text-black sm:w-[50%] ms:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={HotelItems.id}>
                  <Card hotelName={HotelItems.name} imgSrc={HotelItems.picture} />
                </Link>
                ))
        }
      </div>
    )
}