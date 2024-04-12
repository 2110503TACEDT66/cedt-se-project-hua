import RoomCatalog from "@/components/RoomCatalog";
import getHotel from "@/libs/getHotel";
import getRoomForHotel from "@/libs/getRoom";
import Image from "next/image";

export default async function HotelDetailPage({params}:{params:{hid:string}}){
    const hotelDetail = await getHotel(params.hid)
    const roomDetail = await getRoomForHotel(params.hid)

    return(
        <main className="bg-cover bg-center bg-no-repeat">
            
            <div className="text-white flex flex-row justify-center align-middle p-10 gap-5">
                <div className="">
                <Image src={hotelDetail.data.picture}
                alt="Hotel picture"
                width={0}
                height={0}
                sizes="400vw"
                className="rounded-lg w-80 h-40 text-sky-400" />
                </div>
                <div className="flex flex-col justify-center text-bold text-white text-2xl">
                    <div className="">{hotelDetail.data.name} </div>
                    <div className=""> address : {hotelDetail.data.address}</div>
                    <div className=""> tel : {hotelDetail.data.tel}</div>
                </div>
            </div>
            <div className="flex flex-row">
                <RoomCatalog roomJson={roomDetail} />
            </div>
        </main>
    )
}