'use client'
import Image from "next/image";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import EditRoom from "./EditRoom";

export default function RoomCard({ RoomItem, setRoom, removeRoom, profile}: { RoomItem: RoomItem, setRoom: Function, removeRoom: Function, profile: { role: string, hid: { id: string} }}) {
    let hotelString = RoomItem.hotel.toString();
    const [editState, setEditState] = useState('not')
    return (
        <div className="flex flex-col w-full h-64 rounded-lg shadow-lg bg-white">
            <div className="w-full h-[70%] relative rounded-t-lg ">
                <Image src={RoomItem.picture}
                    alt='room'
                    fill={true}
                    className="object-cover rounded-t-lg"
                    sizes="100vh" />
            </div>
            <div className="flex relative p-3 rounded-lg">
                <div className="text-medium text-black mx-5">
                    <div className="">Room Number: {RoomItem.roomNo}</div>
                    <div className="">Room Type: {RoomItem.roomType}</div>
                    <div className="">Price: {RoomItem.price} Baht/Day</div>
                </div>
                <button onClick={() => { setRoom(RoomItem._id, RoomItem.roomNo) }} className="absolute bottom-2 right-2 rounded-xl py-2 px-3 text-white font-medium bg-purple-400 transition duration-100 hover:scale-105">Select</button>
                {profile.role === 'hotelAdmin' && profile.hid.id == hotelString &&
                <div>
                    <button onClick={() => removeRoom(RoomItem._id)} className="text-red-400 absolute bottom-4 right-[6rem]">
                        <HiOutlineTrash size={24} />
                    </button>
                    <button className="block rounded-md transition ease-in-out duration-200 delay-75 bg-violet-950 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm mx-5"
                    onClick={() => setEditState(RoomItem._id)}>Edit</button>
                </div>
                }
            </div>

            {editState === RoomItem._id && <EditRoom closeEdit={() => setEditState('not')} rid={RoomItem._id} 
            roomNo={RoomItem.roomNo} roomType={RoomItem.roomType} price={RoomItem.price} hid={hotelString}/>}
        </div>
    )
}