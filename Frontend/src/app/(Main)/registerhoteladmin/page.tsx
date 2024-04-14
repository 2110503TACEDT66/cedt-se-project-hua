'use client'

import InputCompo from '@/components/InputCompo';
import getHotels from '@/libs/getHotels';
import registerUser from '@/libs/registerUser';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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
                router.push('/profile')
            })
            .catch((err) => {
                toast.error('Register Failed');
                console.log(err);
            })
        }
    }

    return (
        <div className="flex justify-center items-center h-scree bg-cover bg-center bg-no-repeat">
        <form className="backdrop-blur-sm rounded-lg my-5 py-3 w-[20%] text-center h-[60%] absolute top-20 bg-[#D9D9D9]">
            <div className="text-5xl text-center text-white font-bold">Register</div>
            <InputCompo type="text" name="name" text="Name" handleChange={handleChange}/>
            <InputCompo type="text" name="tel" text="Telephone Number" handleChange={handleChange}/>
            <InputCompo type="email" name="email" text="Email" handleChange={handleChange}/>
            <InputCompo type="password" name="password" text="Password" handleChange={handleChange}/>
            <div className="flex justify-center items-center  my-7">
                <select onChange={handleSelectChange}>
                    <option hidden>Select Hotel</option>
                    {hotels.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={handleSubmit} type="submit" className="bg-black hover:bg-blue-700 text-white p-2 font-medium rounded-full absolute bottom-7 left-20 right-20">Register</button>
        </form>
        </div>
    );
}