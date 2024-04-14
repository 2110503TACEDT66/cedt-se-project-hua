'use client'

import InputCompo from '@/components/InputCompo';
import getHotels from '@/libs/getHotels';
import registerUser from '@/libs/registerUser';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export default function RegHotelAdmin() {
    const [hotels, setHotels] = useState<HotelItem[]>([]);
    const router = useRouter();
    
    useEffect(() => {
        getHotels().then((response) => {
            setHotels(response.data);
        });
    }, []);
    
    const InitForm = {
        name: '',
        email: '',
        tel: '',
        password: '',
        hid: ''
    }
    const [form, setForm] = useState(InitForm);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value)
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            hid: e.target.value,
        });
        console.log(e.target.value)
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (form.name && form.email && form.tel && form.password && form.hid) {
            // Create the payload
            const payload = {
                name: form.name,
                email: form.email,
                tel: form.tel,
                password: form.password,
                role: 'hotelAdmin',
                hid: form.hid
            };
            
            // Call the registerUser function
            registerUser(payload)
            .then(() => {
                toast.success('Register Success');
                setTimeout(() => {
                    router.push('/profile')
                }, 1000)
            })
            .catch((err) => {
                toast.error('Register Failed');
                console.log(err);
            })
        }
    }

    return (
        <div className="flex justify-center items-center bg-cover bg-center bg-no-repeat">
        <form className="bg-purple-400/30 backdrop-blur-sm rounded-lg my-5 px-3 py-5 w-[50%] text-center h-[60%]">
            <div className="text-5xl text-center text-black font-bold p-6">Register HotelAdmin</div>
            <InputCompo type="text" name="name" text="Name" handleChange={handleChange}/>
            <InputCompo type="text" name="tel" text="Telephone Number" handleChange={handleChange}/>
            <InputCompo type="email" name="email" text="Email" handleChange={handleChange}/>
            <InputCompo type="password" name="password" text="Password" handleChange={handleChange}/>
            <div className="flex justify-center items-center  my-7">
                <select onChange={handleSelectChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option hidden>Select Hotel</option>
                    {hotels.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <button onClick={handleSubmit} className="bg-black hover:scale-105 transition duration-100 
                text-white p-2 font-medium rounded-full px-5 text-xl">
                    Register
                </button>
                <Link href="/" className="bg-black hover:scale-105 transition duration-100 
                text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1" >
                    <IoMdArrowRoundBack/> Back
                </Link>
            </div>
        </form>
        </div>
    );
}