'use client'

import InputCompo from "@/components/InputCompo";
import registerUser from "@/libs/registerUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

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
        <div className="flex justify-center items-center h-scree bg-cover bg-center bg-no-repeat">
        <form className="backdrop-blur-sm rounded-lg my-5 py-3 w-[20%] text-center h-[60%] absolute top-20 bg-[#D9D9D9]">
            <div className="text-5xl text-center text-white font-bold">Register</div>
            <InputCompo type="text" name="name" text="Name" handleChange={handleChange}/>
            <InputCompo type="text" name="tel" text="Telephone Number" handleChange={handleChange}/>
            <InputCompo type="email" name="email" text="Email" handleChange={handleChange}/>
            <InputCompo type="password" name="password" text="Password" handleChange={handleChange}/>
            <button onClick={handleSubmit} type="submit" className="bg-black hover:bg-blue-700 text-white p-2 font-medium rounded-full absolute bottom-7 left-20 right-20">Register</button>
        </form>
        </div>
    );
}