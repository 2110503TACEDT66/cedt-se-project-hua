"use client"

import DataReserve from "./DateReserve"
import { useState } from "react"
import dayjs, {Dayjs} from "dayjs";
import React from "react";
import { useSession } from "next-auth/react";
import addBooking from "@/libs/addBooking";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CheckIncheckoutDate({hid, roomid} : {hid: string, roomid: string}) {
    const { data: session } = useSession();
    const [checkInDate,setCheckInDate] = useState<Dayjs | null>(null)
    const [checkOutdate,setCheckOutDate] = useState<Dayjs | null>(null)
    const router = useRouter();

    const handleSubmit = async () => {
        if (checkInDate && checkOutdate && session?.user.token) {
            const bookingBody:BookingData = {
                hid,
                roomid,
                bDate: checkInDate.toString(),
                bEnd: checkOutdate.toString()
            }
            
            const data = await addBooking(session.user.token,bookingBody);
            if (data.success) {
                toast.success("Booked Successfully");
                router.back();
                router.back();
            } else {
                toast.error("Booking not Success")
            }
        }
    }

    return (
        <div className="flex flex-col mt-20 bg-gray-400 p-7 pt-1 rounded-2xl">
            <div className="my-10 flex flex-col">
                <div>Check-In</div>
                <DataReserve onDateChange={(value:Dayjs)=> setCheckInDate(value)} value={null} name="checkIn"/>
                <div>Check-Out</div>
                <DataReserve onDateChange={(value:Dayjs)=> setCheckOutDate(value)} value={null} name="checkOut"/>
            </div>
            <button className="bg-cyan-400 p-3 text-xl rounded-xl hover:bg-cyan-500"
            onClick={handleSubmit}>Booking</button>
        </div>
    
    )
}