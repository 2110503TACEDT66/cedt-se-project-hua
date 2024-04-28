"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import InputCompo from "./InputCompo";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function EditRoom({ rid, roomNo, roomType, price }:{rid:string,roomNo:string,roomType:string,price:string}) {
  const [newRoomNo, setRoomNo] = useState(roomNo);
  const [newRoomType, setRoomType] = useState(roomType);
  const [newPrice,setPrice]= useState(price);
  

  const router = useRouter();

  const handleSubmit = async (e:React.MouseEvent) => {
    e.preventDefault();

    try {
        /*ใส่link สำหรับ fetch */ 
      const res = await fetch(`${rid}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({newRoomNo ,newRoomType,newPrice  }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    
    <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-8 w-[30em] text-black">
        <div className="text-xl text-blue-700 text-center font-bold">Edit Room</div>
        <div className="my-4">
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomNo(e.target.value)} value={roomNo} name="roomNO"  type="text" placeholder="Room Number" />
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRoomType(e.target.value)} value={roomType} name="roomType"  type="text" placeholder="Room Type"/>
          <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value)} value={price} name="price"  type="text" placeholder="Price"/>
          
          


          <div className="flex flex-col items-center justify-center">
            <button
              type="submit"
              className="bg-black hover:scale-105 transition duration-100 text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1 my-4"
              onClick={handleSubmit}
            >
              Update
            </button>
            <button
              type="button"
              className="bg-black hover:scale-105 transition duration-100 text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1"
              onClick={() => router.back()}
            >
              <IoMdArrowRoundBack /> Back
            </button>
          </div>
        </div>
      </div>
    </div>

  
  );
}