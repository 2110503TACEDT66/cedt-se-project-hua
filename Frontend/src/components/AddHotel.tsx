'use client'

import { useState } from "react"
import InputCompo from "./InputCompo"
import addHotelDB from "@/libs/addHotelDB";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AddHotel() {
    const { data: session } = useSession();
    const token = session?.user.token;
    const router = useRouter();

    const InitForm = {
        name: '',
        address: '',
        district: '',
        province: '',
        postalcode: '',
        tel: '',
        region: ''
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

        if (form.name && form.address && form.district && form.province && form.postalcode
            && form.tel && form.region) 
        {
            // Create the payload
            const payload = {
                name: form.name,
                address: form.address,
                district: form.district,
                province: form.province,
                postalcode: form.postalcode,
                tel: form.tel,
                region: form.region,
                picture: '/Images/hotel/hotel4.jpg'
            };
            if (token) {
                addHotelDB(token, payload)
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
                <div className="text-xl text-blue-700 text-center font-bold">Add Hotel</div>
                <div className="my-4">
                    <InputCompo name="name" text="Hotel Name" type="text" handleChange={handleChange}/>
                    <InputCompo name="address" text="Address" type="text" handleChange={handleChange}/>
                    <InputCompo name="district" text="District" type="text" handleChange={handleChange}/>
                    <InputCompo name="province" text="Province" type="text" handleChange={handleChange}/>
                    <InputCompo name="postalcode" text="Postal Code" type="text" handleChange={handleChange}/>
                    <InputCompo name="tel" text="Telephone" type="tel" handleChange={handleChange}/>
                    <InputCompo name="region" text="Region" type="text" handleChange={handleChange}/>
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