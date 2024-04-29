'use client'
import { useState } from "react";
import RoomCard from "./RoomCard";
import CheckAvailableRoom from "./CheckAvailableRoom";
import { useSession } from "next-auth/react";
import deleteRoom from "@/libs/deleteRoom";
import { toast } from "react-toastify";

export default function RoomCatalog({roomItem,hid, profile}:{roomItem:RoomItem[],hid:string,profile: {role:string, hid:{id:string}}}){
    const [roomId, setRoomId] = useState('' as string); 
    const [roomNumber, setRoomNumber] = useState('' as string);
    const { data: session } = useSession();
    const sortedData = roomItem.sort((a, b) => a.roomNo.localeCompare(b.roomNo));
    const [availableRoom, setAvailableRoom] = useState(sortedData);
    
    const findRoom = (room:[]) => {
        setAvailableRoom(room);
    }
    const forRoomId = (id:string,number:string) => {
        setRoomId(id);
        setRoomNumber(number);
    }

    const handleDelete = async (rid:string) => {
        if (window.confirm(`Are you sure you want to delete this room?`) && session) {
            deleteRoom(session.user.token, rid).then(() => {
                toast.success("Room deleted successfully");
                setAvailableRoom(availableRoom.filter((room) => room._id !== rid));
            }).catch((error) => {
                toast.error("Failed to delete room");
                console.log(error);
            })
        }
    }
    
    return (
        <div  className="flex justify-around content-around  w-full pl-10 h-[550px]">
            <div className="ml-auto mt-5
              justify-around content-around p-2.5 w-1/2 h-fit">
                <div className="mx-auto text-center py-2  bg-gray-100 w-1/2 my-2 rounded-xl">
                    <p>
                        Selected Room: {roomNumber}
                    </p>
                </div>
                <CheckAvailableRoom hid={hid} roomid={roomId} find={findRoom} allRoom={sortedData} setRoom={forRoomId}/>
            </div>

            <div className="mt-12 flex flex-row flex-wrap content-around p-2.5 w-1/2 h-3/4 overflow-auto">
            
            {
                availableRoom.sort().map((RoomItem:RoomItem)=>(
                    <div className="w-4/5 py-5 flex flex-col relative" key={RoomItem._id}> 
                    <RoomCard RoomItem={RoomItem} setRoom={forRoomId} removeRoom={handleDelete} profile={profile}/>
                    </div>
                ))
            }
            </div>
        </div>
    )
}