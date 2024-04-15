'use client'

import InputCompo from "@/components/InputCompo";
import registerUser from "@/libs/registerUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

export default function RegisterPage() {
    const router = useRouter();
    
    const InitForm = {
        name: '',
        email: '',
        tel: '',
        password: ''
    }
    const [form, setForm] = useState(InitForm);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
        console.log(e.target.value)
    }

    const handleSubmit = (e: React.MouseEvent) => {
        e.preventDefault();

        if (form.name && form.email && form.tel && form.password) {
            // Create the payload
            const payload = {
                name: form.name,
                email: form.email,
                tel: form.tel,
                password: form.password,
                role: 'user',
                hid: ''
            };
            
            // Call the registerUser function
            registerUser(payload)
            .then(() => {
                toast.success('Register Success');
                router.push('/')
                
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
            <div className="text-5xl text-center text-black font-bold p-6">Register</div>
            <InputCompo type="text" name="name" text="Name" handleChange={handleChange}/>
            <InputCompo type="text" name="tel" text="Telephone Number" handleChange={handleChange}/>
            <InputCompo type="email" name="email" text="Email" handleChange={handleChange}/>
            <InputCompo type="password" name="password" text="Password" handleChange={handleChange}/>
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