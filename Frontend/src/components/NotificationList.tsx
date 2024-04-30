'use client'
import { AppDispatch, useAppSelector } from "@/redux/store"
import dayjs from 'dayjs'
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import getUserProfile from "@/libs/getUserProfile"

export default function notification({notifications} :{notifications:Notifications[]}) {
    const { data: session } = useSession();
    
    //const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    
    return (
        <div className="pt-1 pl-3 pr-3">
            {
                (notifications.length > 0) && session?.user.token ? notifications.map((notificationItem:Notifications) => (
                    <div className='bg-violet-300 rounded px-5 py-2 mt-4' key={notificationItem._id}>
                        <div className="text-md">Hotel: {notificationItem.Hotel}</div>
                        <div className="text-md">RoomNo: {notificationItem.roomNo}</div>
                        {/* <div className="text-md">Room Type: {notificationItem.bookings.room.roomType}</div> */}
                        <div className="text-md">Booking Date: {dayjs(notificationItem.bookings.bookingDate).format('D MMMM YYYY')}</div>
                        <div className="text-md">Booking Checkout: {dayjs(notificationItem.bookings.bookingEnd).format('D MMMM YYYY')}</div>
                        <div className="text-md">//edit booking date and booking checkout by {notificationItem.editor} Role//</div>    
                    
                    </div>
                )) : <div className="text-2xl text-red-500 text-center">No Notification</div>
            }
        </div>
    )
}