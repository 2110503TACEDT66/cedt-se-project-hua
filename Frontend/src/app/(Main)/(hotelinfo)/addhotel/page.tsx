'use client'

import { useState } from "react"
import InputCompo from "@/components/InputCompo";
import addHotelDB from "@/libs/addHotelDB";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormCompo from "@/components/FormCompo";

export default function AddHotelPage() {
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
        <FormCompo header="Add Hotel" handleSubmit={handleSubmit} typeSubmit="Add">
            <InputCompo name="name" text="Hotel Name" type="text" handleChange={handleChange}/>
            <InputCompo name="address" text="Address" type="text" handleChange={handleChange}/>
            <InputCompo name="district" text="District" type="text" handleChange={handleChange}/>
            <InputCompo name="province" text="Province" type="text" handleChange={handleChange}/>
            <InputCompo name="postalcode" text="Postal Code" type="text" handleChange={handleChange}/>
            <InputCompo name="tel" text="Telephone" type="tel" handleChange={handleChange}/>
            <InputCompo name="region" text="Region" type="text" handleChange={handleChange}/>
        </FormCompo>
    )
}