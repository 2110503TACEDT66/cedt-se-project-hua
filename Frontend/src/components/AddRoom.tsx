'use client'

import { useState } from "react"
import InputCompo from "./InputCompo"
/*import addRoomDB from "@/libs/addRoomDB";*/
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default async function AddRoom({hid}:{hid:string}) {
    const { data: session } = useSession();
    const token = session?.user.token;
    const router = useRouter();



    const InitForm = {
        roomNo: '',
        roomType: '',
        price: '',
    
    }
    const [form, setForm] = useState(InitForm);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (form.roomNo && form.roomType && form.price) 
        {
            // Create the payload
            const payload = {
                roomNo: form.roomNo,
                hotel: hid,
                roomType: form.roomType,
                price: form.price,
                picture: '/Images/room/room-stand.jpg',
                booked: false
                
            };
            if (token) {
                addRoomDB(token, payload)
                .then(() => {
                    toast.success('Add Hotel Successfully');
                    setTimeout(() => {
                        router.push('/')
                    }, 1000)
                })
                .catch((err) => {
                    toast.error('Add Hotel Failed');
                    console.log(err);
                })
            }
        }
    }
    return (
        <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40" >
            <div className="bg-white rounded-lg p-8 w-[30em] text-black">
                <div className="text-xl text-blue-700 text-center font-bold">Add Room</div>
                <div className="my-4">
                    <InputCompo name="roomNO" text="Room Number" type="text" handleChange={handleChange}/>
                    <InputCompo name="roomType" text="Room Type" type="text" handleChange={handleChange}/>
                    <InputCompo name="price" text="Price" type="text" handleChange={handleChange}/>

                    <div className="flex flex-col items-center justify-center">
                        <button type="submit" className="bg-black hover:scale-105 transition duration-100 
                        text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1 my-4"
                        onClick={handleSubmit}>Add</button>
                        <Link href="/" className="bg-black hover:scale-105 transition duration-100 
                        text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1" >
                            <IoMdArrowRoundBack/> Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}