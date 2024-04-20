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
        <div className="m-5 flex flex-row flex-wrap justify-around content-around p-2.5 w-full">
        {roomId}
        <CheckAvailableRoom hid={hid} roomid={roomId} find={findRoom} allRoom={sortedData}/>
        {
            availableRoom.sort().map((RoomItem:RoomItem)=>(
                <div className="w-4/5 py-5 flex flex-col relative" key={RoomItem._id}> 
                  <RoomCard RoomItem={RoomItem} setRoom={forRoomId} />
                </div>
            ))
        }
        </div>
    )
}