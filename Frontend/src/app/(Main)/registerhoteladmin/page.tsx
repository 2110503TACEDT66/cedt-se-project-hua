'use client'

import InputCompo from '@/components/InputCompo';
import getHotels from '@/libs/getHotels';
import registerUser from '@/libs/registerUser';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

type ErrorType = {
    name?: string;
    email?: string;
    tel?: string;
    password?: string;
    confirmPassword?: string;
    hid?: string;
}

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
        hid: '',
        confirmPassword: ''
    }
    const [form, setForm] = useState(InitForm);
    const [errors, setErrors] = useState<ErrorType>({});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setForm({
            ...form,
            hid: e.target.value,
        });
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        const validationErrors: ErrorType = {};
        if (!form.name.trim()) {
            validationErrors.name = "name is required";
        }

        if (!form.email.trim()) {
            validationErrors.email = "email is required";
        } else if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(form.email)) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!form.tel.trim()) {
            validationErrors.tel = "tel is required";
        } else if (!/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(form.tel)) {
            validationErrors.tel = "Please enter a valid phone number.";
        }

        if (!form.password.trim()) {
            validationErrors.password = "password is required";
        } else if (form.password.length < 6) {
            validationErrors.password = "Password must be at least 6 characters.";
        }

        if (!form.confirmPassword.trim()) {
            validationErrors.confirmPassword = "Plesae confirm your password";
        } else if (form.confirmPassword !== form.password) {
            validationErrors.confirmPassword = "Password does not match.";
        }

        if (!form.hid.trim()) {
            validationErrors.hid = "Please select hotel";
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
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
            <InputCompo type="text" name="name" text="Name" handleChange={handleChange} error={errors.name}/>
            <InputCompo type="text" name="tel" text="Telephone Number" handleChange={handleChange} error={errors.tel}/>
            <InputCompo type="email" name="email" text="Email" handleChange={handleChange} error={errors.email}/>
            <InputCompo type="password" name="password" text="Password" handleChange={handleChange} error={errors.password}/>
            <div className="flex justify-center items-center my-7 flex-col">
                <input type="password" required id="confirmPassword" name="confirmPassword" placeholder="Please Confirm Password" onChange={(e) => handleChange(e)}
                className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
            </div>
            <div className="flex justify-center items-center my-7 flex-col">
                <select onChange={handleSelectChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <option hidden>Select Hotel</option>
                    {hotels.map(item => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                {errors.hid && <span className="text-red-500 text-sm">{errors.hid}</span>}
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