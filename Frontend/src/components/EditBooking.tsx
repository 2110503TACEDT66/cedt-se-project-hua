'use client'
import { useEffect, useState } from "react";
import DateReserve from "./DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { updateBookingDB, updateBookingLocal } from "@/redux/features/bookSlice";
import { useSession } from "next-auth/react";
import addNotification from "@/libs/addNotification";
import getUserProfile from "@/libs/getUserProfile";
import { profile } from "console";

export default function EditBooking({closeEdit, bid, hotel, room, uid, baseBookingDate, baseBookingEnd} : 
    {closeEdit: Function, bid: string, hotel: string, room: string, uid: string, baseBookingDate: Dayjs, baseBookingEnd: Dayjs}) {
    const { data : session } = useSession();

    const [bookingDate, setBookingDate] = useState<Dayjs>(baseBookingDate)
    const [checkoutDate, setCheckoutDate] = useState<Dayjs>(baseBookingEnd)

    const dispatch = useDispatch<AppDispatch>()

    const notificationBody:NotificationsData={
        type        : 'update',
        Hotel       : hotel,
        roomNo      : room,
        checkin     : bookingDate.toString(),
        checkout    : checkoutDate.toString(),
        bookingId   : bid,
        userId      : uid
    }
    const [profile, setProfile] = useState<string>()
    useEffect(() => {
        if (!session || !session.user.token) return; 
        getUserProfile(session.user.token).then((response) => {
            setProfile(response.data.role);
     });
    }, []);
    

    

    const handleSubmit = async() => {
        if (bookingDate && checkoutDate && session?.user.token) {
            dispatch(updateBookingDB({token: session.user.token, bid: bid, bDate:bookingDate.toString(), bEnd:checkoutDate.toString()}))
            dispatch(updateBookingLocal({bid, bDate: bookingDate.toString(), bEnd: checkoutDate.toString()}));
            if(profile==="hotelAdmin" || profile==="admin") await addNotification(session.user.token,notificationBody);
            console.log(profile)
            closeEdit()
        }
    }

    return (
        <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40" 
        onClick={(e) => closeEdit()}>
            <div className="bg-white rounded-lg p-8 w-[25em] text-black" onClick={(e) => e.stopPropagation()}>
                <div className="text-xl text-blue-700">Edit {hotel} room: {room}</div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingDate">Check IN</label>
                    <DateReserve onDateChange={(value:Dayjs) => setBookingDate(value)} value={bookingDate} mindate={dayjs().subtract(1, 'day')} name="bookingDate"/>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="checkoutDate">Check Out</label>
                    <DateReserve onDateChange={(value:Dayjs) => setCheckoutDate(value)} value={checkoutDate} mindate={dayjs()} name="checkoutDate"/>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded-lg"
                onClick={handleSubmit}>Confirm</button>
            </div>
        </div>
    )
}