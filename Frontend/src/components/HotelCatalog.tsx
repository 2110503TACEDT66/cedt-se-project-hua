import Card from "./Card";
import Link from "next/link";

export default async function HotelCatalog({hotelJson, search}:{hotelJson:Promise<HotelJson>, search?:String}){
    const hotelJsonReady = await hotelJson
    
    return(

      <div className="m-5 flex flex-row flex-wrap justify-around content-around p-2.5">
        {
            hotelJsonReady.data.filter((HotelItems)=>{
              return search?.toLocaleLowerCase() === '' || search === undefined ? HotelItems : HotelItems.name.toLocaleLowerCase().includes(search?.toLocaleLowerCase())
            }).map((HotelItems)=>(
                <Link href={`/hotel/${HotelItems.id}`} className="w-full text-black sm:w-[50%] ms:w-[30%] lg:w-[25%] p-2 sm:p-4 md:p-4 lg:p-8" key={HotelItems.id}>
                  <Card hotelName={HotelItems.name} imgSrc={HotelItems.picture} />
                </Link>
                ))
        }
      </div>
    )
}