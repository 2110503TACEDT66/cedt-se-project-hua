import RoomCatalog from "@/components/RoomCatalog";
import getHotel from "@/libs/getHotel";
import getRoomForHotel from "@/libs/getRoom";
import Image from "next/image";

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    const hotelDetail = await getHotel(params.hid)
    const roomDetail = await getRoomForHotel(params.hid)

    return(
        <main className="bg-[url('/Images/bg.png')] bg-cover bg-center bg-no-repeat">
            <div className="text-white flex flex-row mt-5">
                <div className="flex  mt-7 ml-40"><Image src={hotelDetail.data.picture}
                alt="Hotel"
                width={0}
                height={0}
                sizes="400vw"
                className="rounded-lg w-80 h-40 text-sky-400" />
                </div>
                <div className="mt-7 ml-10">
                    <div className="text-bold text-white text-xl">{hotelDetail.data.name} </div>
                    <div className="text-bold text-white text-xl"> address : {hotelDetail.data.address}</div>
                    <div className="text-bold text-white text-xl"> tel : {hotelDetail.data.tel}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <RoomCatalog roomJson={roomDetail} />
            </div>
        </main>
    )
}