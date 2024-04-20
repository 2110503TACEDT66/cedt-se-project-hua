import RoomCatalog from "@/components/RoomCatalog";
import getHotel from "@/libs/getHotel";
import getRoomForHotel from "@/libs/getRoom";
import Image from "next/image";

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    const hotelDetail = await getHotel(params.hid)
    const roomDetail = await getRoomForHotel(params.hid)

    return(
        <main className="bg-cover bg-center bg-no-repeat">
            <div className="text-white flex justify-center align-middle w-[100vw] p-3 h-96 ">
                <div className="flex flex-row gap-4 shadow-lg shadow-purple-300 p-5 rounded-xl">
                    <img src={hotelDetail.data.picture}
                    alt="Hotel picture"
                    className="rounded-lg object-cover" 
                    />
                    <div className="flex flex-col justify-center text-bold text-black text-2xl ">
                        <p className="">{hotelDetail.data.name} </p>
                        <p className=""> Address : {hotelDetail.data.address}</p>
                        <p className=""> Tel : {hotelDetail.data.tel}</p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row">
                <RoomCatalog roomJson={roomDetail} hid={params.hid} />
            </div>
        </main>
    )
}