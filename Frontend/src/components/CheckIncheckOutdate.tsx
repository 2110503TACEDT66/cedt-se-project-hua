"use client"

import DataReserve from "./DateReserve"
import { useState } from "react"
import dayjs, {Dayjs} from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React from "react";
import { useSession } from "next-auth/react";
import addBooking from "@/libs/addBooking";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import getBookings from "@/libs/getBooking";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

    const CheckRoom = async (checkIn: Dayjs, checkOut: Dayjs) => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTJlMWE3ZWZhNjY0OTY1YTI3ZWFmZiIsImlhdCI6MTcxMzEyNjE5NiwiZXhwIjoxNzE1NzE4MTk2fQ.ZVMFRcku1ECDs7KmeIQ9B91i6HwJ7nRyZ5u3AMS8f_o";
        const bookingJson = await getBookings(token);
        
        if (!bookingJson || !Array.isArray(bookingJson.data)) {
            console.error("Invalid booking data format");
            return;
        }
    
        const bookings = bookingJson.data;



    const bookingsWithSameRoomId: BookingItem[] = [];

    for (const booking of bookings) {
        if (booking.room._id === roomid) {
            bookingsWithSameRoomId.push(booking);
        }
    }
    
        for (const booking of bookingsWithSameRoomId) {
            const bookingCheckIn = dayjs(booking.bookingDate);
            const bookingCheckOut = dayjs(booking.bookingEnd);
    
            if (
                (checkIn.isSameOrAfter(bookingCheckIn) && checkIn.isBefore(bookingCheckOut)) ||
                (checkOut.isAfter(bookingCheckIn) && checkOut.isSameOrBefore(bookingCheckOut)) ||
                (checkIn.isBefore(bookingCheckIn) && checkOut.isAfter(bookingCheckOut))
            ) {
                console.log("Booking overlaps with existing booking:", booking);
                return true;
            }
        }
    
        console.log("No overlap found");
        return false;
    };

    const checkAvailability = () => {
        if (!checkInDate || !checkOutdate) {
            console.error("Please select check-in and check-out dates");
            return;
        }

        CheckRoom(checkInDate, checkOutdate);
    };

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
            <button className="bg-cyan-400 p-3 text-xl rounded-xl hover:bg-cyan-500"
            onClick={checkAvailability}>check</button>
        </div>
    
    )
}