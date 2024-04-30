'use client'
import { useEffect, useState } from "react";
import Card from "./Card";
import Link from "next/link";
import { Bars, TailSpin } from 'react-loading-icons'


export default function HotelCatalog({hotelJson, search}:{hotelJson:HotelJson | null, search:String}){
    // use for filtering hotels
    const [filteredHotels, setFilteredHotels] = useState<HotelItem[]>([]);
    const [data, setData] = useState<HotelJson | null | null>(null);
    const [searchHotel, setSearchHotel] = useState<String>("");
    const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await hotelJson;
      setData(data);
      setFilteredHotels(data?.data ?? []);
      setLoading(false);
    }
    fetchData();
  }, [hotelJson]);

  useEffect(() => {
    setSearchHotel(search);
  }, [search]);

  useEffect(() => {
    function filterHotels() {
      // const data = await hotelJson;
      // filter hotels based on search if search is not empty or undefined return all hotels, else return searched hotels
      const filtered = (data?.data ?? []).filter((hotelItem) =>
        searchHotel?.toLocaleLowerCase() === '' || searchHotel === undefined ? hotelItem : hotelItem.name.toLocaleLowerCase().includes(searchHotel?.toLocaleLowerCase())
      );
      setFilteredHotels(filtered);
      setLoading(false);
    }
    filterHotels();
  }, [hotelJson, searchHotel]);
    
    return(
      <div className="m-5 flex flex-row flex-wrap justify-around content-around p-2.5">
        {
          loading ? (
            <div>
              <TailSpin stroke="#BAA9D6"/>
            </div>
          ) : filteredHotels.length === 0  ? (
            <h1 className="text-2xl shadow-lg p-5 shadow-red-400/50 rounded-lg font-medium text-red-400">No Hotels Found</h1>
          ) : (
            filteredHotels.map((HotelItems)=>(
              <Link href={`/hotel/${HotelItems.id}`} className="w-full text-black sm:w-[50%] ms:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={HotelItems.id}>
                <Card hotelName={HotelItems.name} imgSrc={HotelItems.picture} hotelBooking ={HotelItems.bookings}/>
              </Link>
            ))
          )
        }
      </div>
    )
}