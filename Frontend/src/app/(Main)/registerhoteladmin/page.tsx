"use client"
import { redirect } from "next/navigation";
import { useState,useEffect } from "react";
import getHotels from "@/libs/getHotels";

export default async function RegisterPage() {
    const hotel=getHotels()
    const hotelJson:HotelJson = await hotel
    const [item,setItems] = useState<HotelItem[]>([])
    setItems(hotelJson.data)
    const RegisterUser = async (addRegisterForm: FormData) => {
       "use server"
        const name = addRegisterForm.get('name');
        const email = addRegisterForm.get('email');
        const tel = addRegisterForm.get('tel');
        const password = addRegisterForm.get('password');
        const hotelId = addRegisterForm.get('hotelId')

        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    tel: tel,
                    password: password,
                    hid : hotelId,
                    role : "hotelAdmin"
                })
            });

            if (!response.ok) throw new Error("Registration failed");
            console.log("Register Success");
        } catch (err) {
            console.log(err);
        }
        redirect('./')
    }

    return (
        <body className="flex justify-center items-center h-scree bg-cover bg-center bg-no-repeat">
        <form action={RegisterUser} className="bg-white/30 backdrop-blur-sm rounded-lg my-5 py-3 w-[20%] text-center h-[60%] absolute top-5">
            <div className="text-5xl text-center text-white font-bold">Register</div>
            <div className="flex justify-center items-center w-full  my-7">
                
                <input type="text" required id='name' name="name" placeholder="Enter name"
                className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
            </div>
            <div className="flex justify-center items-center  my-7">
                <input type="text" required id='tel' name="tel" placeholder="Enter telephone number"
                className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
            </div>
            <div className="flex justify-center items-center  my-7">
                <input type="text" required id='email' name="email" placeholder="Enter email"
                className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
            </div>
            <div className="flex justify-center items-center  my-7">
                <input type="password" required id='password' name="password" placeholder="Enter password"
                className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
            </div>
            <div className="flex justify-center items-center  my-7">
            <select>
                {item.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                ))}
            </select>
            </div>
            
            <button type="submit" className="bg-black hover:bg-blue-700 text-white p-2 font-medium rounded-full absolute bottom-7 left-20 right-20">Register</button>
        </form>
        </body>
    )
}