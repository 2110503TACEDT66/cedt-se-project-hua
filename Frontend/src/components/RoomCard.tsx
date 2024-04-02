
import Image from "next/image";
import RoomInteract from "./RoomInteract";
import Link from "next/link";


export default function RoomCard({RoomItem}:{RoomItem:RoomItem}){
  
    return(
            <RoomInteract>
                <div className="w-full h-[70%] relative rounded-t-lg">
                <Image src={RoomItem.picture}
                alt='room'
                fill={true}
                className="object-cover rounded-t-lg"/>
                </div>
                <div>
                    <div className="text-medium text-black mx-5">Room Number : {RoomItem.roomNo}</div>
                    <div className="text-medium text-black mx-5">Room Type : {RoomItem.roomType}</div>
                    <div className="text-medium text-black mx-5">Price : {RoomItem.price}</div>
                    <Link href={`/booking/${RoomItem.hotel._id}/${RoomItem._id}`}>
                    <button className="absolute bottom-7 z-30 bg-black right-5 rounded-xl p-2 bg-cyan-600">Booking</button>
                    </Link>
                </div>
           </RoomInteract>  
    )

}