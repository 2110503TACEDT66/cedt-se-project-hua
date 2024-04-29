'use client'

import InputCompo from "@/components/InputCompo";
import registerUser from "@/libs/registerUser";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

type ErrorType = {
    name?: string;
    email?: string;
    tel?: string;
    password?: string;
    confirmPassword?: string;
}

export default function RegisterPage() {
    const router = useRouter();
    
    const InitForm = {
        name: '',
        email: '',
        tel: '',
        password: '',
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

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            // Create the payload
            const payload = {
                name: form.name,
                email: form.email,
                tel: form.tel,
                password: form.password,
                role: 'user'
            };
            
            // Call the registerUser function
            registerUser(payload)
            .then(() => {
                toast.success('Register Success');
                router.push('/');
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
            <InputCompo type="text" name="name" text="Name" handleChange={handleChange} error={errors.name}/>
            <InputCompo type="text" name="tel" text="Telephone Number" handleChange={handleChange} error={errors.tel}/>
            <InputCompo type="email" name="email" text="Email" handleChange={handleChange} error={errors.email}/>
            <InputCompo type="password" name="password" text="Password" handleChange={handleChange} error={errors.password}/>
            <div className="flex justify-center items-center my-7 flex-col">
                <input type="password" required id="confirmPassword" name="confirmPassword" placeholder="Please Confirm Password" onChange={(e) => handleChange(e)}
                className="bg-gray-700  border-2 border-gray-400 rounded-full w-4/5 p-2 text-white focus:outline-none focus:border-blue-400 placeholder-gray-100" />
                {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
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