'use client'
import { AppDispatch, useAppSelector } from "@/redux/store"
import dayjs from 'dayjs'
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import getUserProfile from "@/libs/getUserProfile"

export default function notification({profile} :{profile:any}) {
    const { data: session } = useSession();
    
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>();

    
    return (
        <div className="pt-1 pl-3 pr-3">
            {
                (bookItems.length > 0) && session?.user.token ? bookItems.map((bookingItem) => (
                    <div className='bg-violet-300 rounded px-5 py-2 mt-4' key={bookingItem._id}>
                        <div className="text-md">Hotel: {bookingItem.hotel.name}</div>
                        <div className="text-md">Owern: {bookingItem.user.name}</div>
                        <div className="text-md">RoomNo: {bookingItem.room.roomNo}</div>
                        <div className="text-md">Room Type: {bookingItem.room.roomType}</div>
                        <div className="text-md">Booking Date: {dayjs(bookingItem.bookingDate).format('D MMMM YYYY')}</div>
                        <div className="text-md">Booking Checkout: {dayjs(bookingItem.bookingEnd).format('D MMMM YYYY')}</div>
                        <div className="text-md">//edit booking date and booking checkout by hotelAdmin Role//</div>    
                    
                    </div>
                )) : <div className="text-2xl text-red-500 text-center">No Notification</div>
            }
        </div>
    )
}