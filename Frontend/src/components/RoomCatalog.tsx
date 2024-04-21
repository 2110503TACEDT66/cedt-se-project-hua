'use client'
import { useState } from "react";
import RoomCard from "./RoomCard";
import CheckAvailableRoom from "./CheckAvailableRoom";

export default function RoomCatalog({roomJson,hid}:{roomJson:RoomJson,hid:string}){
    const roomJsonReady = roomJson
    const [roomId, setRoomId] = useState('' as string);
    const [roomData, setRoomData] = useState('' as string);   
    const findRoom = (room:[]) => {
        setAvailableRoom(room);
    }
    const forRoomId = (id:string) => {
        setRoomId(id);
    }
    
    const sortedData = roomJsonReady.data.sort((a, b) => a.roomNo.localeCompare(b.roomNo));
    const [availableRoom, setAvailableRoom] = useState(sortedData);
    return (
        <div  className="flex justify-around content-around p-2.5 w-full pl-10 h-[550px]">
            <div className="ml-auto mt-5
             flex flex-row  justify-around content-around p-2.5 w-1/2 h-fit">
                {roomId}
                <CheckAvailableRoom hid={hid} roomid={roomId} find={findRoom} allRoom={sortedData}/>
            </div>

            <div className="m-5 flex flex-row flex-wrap content-around p-2.5 w-1/2 h-3/4 overflow-auto">
            
            {
                availableRoom.sort().map((RoomItem:RoomItem)=>(
                    <div className="w-4/5 py-5 flex flex-col relative" key={RoomItem._id}> 
                    <RoomCard RoomItem={RoomItem} setRoom={forRoomId} />
                    </div>
                ))
            }
            </div>
        </div>
    )
}