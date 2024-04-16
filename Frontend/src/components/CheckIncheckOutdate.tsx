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
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
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

    const checkAvailability = async () => {
        if (!checkInDate || !checkOutdate) {
            console.error("Please select check-in and check-out dates");
            return;
        }

        if(await CheckRoom(checkInDate, checkOutdate)){
            setIsBooked(true);
        }
    };

    return (
        (!isOpen)?(<div className="flex flex-col mt-20 bg-gray-400 p-7 pt-1 rounded-2xl">
            <div className="my-10 flex flex-col">
                <div>Check-In</div>
                <DataReserve onDateChange={(value:Dayjs)=> setCheckInDate(value)} value={null} name="checkIn"/>
                <div>Check-Out</div>
                <DataReserve onDateChange={(value:Dayjs)=> setCheckOutDate(value)} value={null} name="checkOut"/>
            </div>
            <button className="bg-cyan-400 p-3 text-xl rounded-xl hover:bg-cyan-500 hover:scale-105 transition duration-500 ease-in-out"
            onClick={() => {checkAvailability();togglePopup();}}>Booking</button>
            
        </div>):( <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div className="bg-white rounded shadow-lg w-1/2">
            <div className="px-4 py-2 flex justify-between items-center bg-blue-500 text-white rounded-t">
              <h2 className="text-lg font-semibold">Popup Title</h2>
              <button onClick={() => {togglePopup(); }} className="text-white hover:scale-105 transition duration-500 ease-in-out">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-black">
            {(isBooked || (!checkInDate && !checkOutdate)) ? <div>
                <p>Room is not available, Please choose new booking time</p>
                <div className="mt-4 flex justify-end">
                <button onClick={() => {togglePopup(); window.location.reload() }} className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out">
                  Close
                </button>
                </div>
              </div> : <div>
                <p>Confirm Booking</p>
                <div className="mt-4 flex justify-end">
                <button onClick={() => {togglePopup(); window.location.reload() }} className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out">
                  Back
                </button>
                <button onClick={() => {togglePopup();handleSubmit();}} className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out">
                  Confirm
                </button>
                </div>
              </div>}
              
            </div>
          </div>
        </div>)
    
    )
}