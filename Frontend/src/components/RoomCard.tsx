
import Image from "next/image";
import RoomInteract from "./RoomInteract";
import Link from "next/link";


export default function RoomCard({RoomItem}:{RoomItem:RoomItem}){
    return(
            // <RoomInteract>
            <div className="flex flex-col w-full h-64 rounded-lg shadow-lg bg-white">
                <div className="w-full h-[70%] relative rounded-t-lg ">
                <Image src={RoomItem.picture}
                alt='room'
                fill={true}
                className="object-cover rounded-t-lg"/>
                </div>
                <div className="flex relative p-3 rounded-lg">
                    <div className="text-medium text-black mx-5">
                        <div className="">Room Number : {RoomItem.roomNo}</div>
                        <div className="">Room Type : {RoomItem.roomType}</div>
                        <div className="">Price : {RoomItem.price}</div>
                    </div>
                    <Link href={`/booking/${RoomItem.hotel._id}/${RoomItem._id}`}>
                        <button className="absolute bottom-2 right-2 rounded-xl py-2 px-3 text-white font-medium bg-purple-400 transition duration-100 hover:scale-105">Booking</button>
                    </Link>
                </div>
            </div>

    )

}