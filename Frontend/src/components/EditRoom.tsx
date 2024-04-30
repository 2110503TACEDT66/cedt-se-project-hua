"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputCompo from "./InputCompo";
import { useSession } from "next-auth/react";
import getRoomForHotel from "@/libs/getRoom";
import editRoom from "@/libs/editRoom";
import { toast } from "react-toastify";

type ErrorType = {
  roomNo?: string;
  roomType?: string;
  price?: string;
}

export default function EditRoom({ closeEdit, rid, roomNo, roomType, price, hid }:
  {closeEdit: Function, rid:string,roomNo:string,roomType:string,price:string, hid:string}) {
    const InitForm = {
      roomNo,
      roomType,
      price,
  }
  const { data: session } = useSession();
  const [form, setForm] = useState(InitForm);
  const [errors, setErrors] = useState<ErrorType>({});
  const [takenRoomNumbers, setTakenRoomNumbers] = useState<string[]>([]);

  useEffect(() => {
      getRoomForHotel(hid).then((response) => {
          const rooms = response.data.map((room: { roomNo: string; }) => room.roomNo);
          setTakenRoomNumbers(rooms);
      });
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({
          ...form,
          [e.target.name]: e.target.value,
      });
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setForm({
          ...form,
          roomType: e.target.value,
      });
  }

  const handleSubmit = (e: React.MouseEvent) => {
      e.preventDefault();
      const validationErrors: ErrorType = {};
      if (!form.roomNo.trim()) {
          validationErrors.roomNo = "Room Number is required";
      } else if (isNaN(Number(form.roomNo)) || form.roomNo.trim().length !== 3) {
          validationErrors.roomNo = "Room Number must be a 3-digit number";
      } else if (takenRoomNumbers.includes(form.roomNo) && form.roomNo !== roomNo) {
          validationErrors.roomNo = "Room Number is already taken";
      }

      if (!form.roomType.trim()) {
          validationErrors.roomType = "Room Type is required";
      }

      if (!form.price.trim()) {
          validationErrors.price = "Price is required";
      } else if (isNaN(Number(form.price))) {
          validationErrors.price = "Price must be a number";
      }

      setErrors(validationErrors);

      if (Object.keys(validationErrors).length === 0) {
          let roomPic;
          if (form.roomType === 'Standard') {
              roomPic = '/Images/room/room-stand.jpg';
          } else {
              roomPic = '/Images/room/room-lux.jpg';
          }

          // Create the payload
          const payload = {
              roomNo: form.roomNo,
              roomType: form.roomType,
              price: form.price,
              picture: roomPic
          };

          if (session) {
              const token = session.user.token;
          
              // Call the addRoom function
              editRoom({payload, rid, token})
              .then(() => {
                  toast.success('Edit Room Success');
                  setTimeout(() => {
                    closeEdit();
                    window.location.reload();
                  }, 1000)
              })
              .catch((err) => {
                  toast.error('Edit Room Failed');
                  console.log(err);
          })
          }
      }
  }
  

  const router = useRouter();

  return (
    <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40" 
        onClick={(e) => closeEdit()}>
      <div className="bg-white rounded-lg p-4 w-[25em] text-black flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="text-2xl text-blue-700 ml-[30%] font-extrabold">Edit room: {roomNo}</div>
        <InputCompo name="roomNo" text="Room Number" type="text" handleChange={handleChange} error={errors.roomNo} initial={form.roomNo}/>
        <div className="flex justify-center items-center my-3 flex-col">
          <select onChange={handleSelectChange}
               className='bg-gray-50 border-2 border-gray-700 text-gray-700 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-[80%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
              <option hidden>Select Room Type</option>
              <option key="Standard" value="Standard">Standard Room</option>
              <option key="Luxury" value="Luxury">Luxury Room</option>
          </select>
          {errors.roomType && <span className="text-red-500 text-sm">{errors.roomType}</span>}
        </div>
        <InputCompo name="price" text="Price" type="text" handleChange={handleChange} error={errors.price} initial={form.price}/>
        <button type="submit" className="bg-black hover:scale-105 transition duration-100 w-[55%] ml-[23%]
          text-white p-2 font-medium rounded-full px-5 text-xl flex items-center justify-center gap-1 my-4"
          onClick={handleSubmit}>Update Room</button>
      </div>
    </div>
  );
}