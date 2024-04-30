'use client'
import { deleteBookingfromDB, removeBookingLocal, updateBookingDB, updateBookingLocal } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import EditBooking from "./EditBooking"
import dayjs from 'dayjs'
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { Rating,Stack } from "@mui/material"
import { useState } from "react"
import addNotification from "@/libs/addNotification"
import getUserProfile from "@/libs/getUserProfile"

export default function BookingList({profile} :{profile:any}) {
    const { data: session } = useSession();
    const [sortBy, setSortBy] = useState('bookingDate')
    
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>();

    const [editState, setEditState] = useState('not')


    
    return (
        <div className="pt-1">
            {
                (bookItems.length > 0) && session?.user.token ? bookItems.map((bookingItem) => (
                    <div className='bg-violet-200 shadow-inner rounded-2xl px-5 py-6 mt-4 text-black font-medium flex flex-col gap-2' key={bookingItem._id}>
                        <div className="text-lg">
                            <div className="">Hotel: {bookingItem.hotel.name}</div>
                            <div className="">Owner: {bookingItem.user.name}</div>
                            <div className="">RoomNo: {bookingItem.room.roomNo}</div>
                            <div className="">Room Type: {bookingItem.room.roomType}</div>
                            <div className="">Booking Date: {dayjs(bookingItem.bookingDate).format('D MMMM YYYY')}</div>
                            <div className="">Booking Checkout: {dayjs(bookingItem.bookingEnd).format('D MMMM YYYY')}</div>
                        </div>
                        <div className="flex flex-row">
                            <button className="block transition ease-in-out duration-200 delay-75 rounded-md bg-violet-950 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
                            onClick= { async() => {
                                dispatch(deleteBookingfromDB({token:session?.user.token, bid:bookingItem._id}));
                                dispatch(removeBookingLocal(bookingItem._id));
                                const notificationBody:NotificationsData={
                                    type        :'delete',
                                    Hotel       : bookingItem.hotel.name,
                                    roomNo      : bookingItem.room.roomNo,
                                    checkin     : dayjs(bookingItem.bookingDate).format('D MMMM YYYY'),
                                    checkout    : dayjs(bookingItem.bookingEnd).format('D MMMM YYYY'),
                                    bookingId   : bookingItem._id,
                                    userId      : bookingItem.user._id
                                }
                                if(profile.data.role ==="hotelAdmin" || profile.data.role ==="admin") await addNotification(session.user.token,notificationBody);
                                console.log(profile.data.role)
                            }}>Remove from Booking List</button>
                            <button className="block rounded-md transition ease-in-out duration-200 delay-75 bg-violet-950 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm mx-5"
                            onClick={() => setEditState(bookingItem._id)}>Edit</button>
                        </div>
                        {
                            (profile.data && (profile.data.role === 'user')) ? 
                                <Rating
                                    id={`${bookingItem.hotel.name} Rating`}
                                    name={`${bookingItem.hotel.name} Rating`}
                                    value={bookingItem.rating}
                                    onChange={(event, rating) => {
                                        if (rating)
                                            dispatch(updateBookingLocal({bid:bookingItem._id, ratingNum:rating}));
                                            dispatch(updateBookingDB({token:session?.user.token, bid:bookingItem._id, ratingNum: rating}));
                                        }
                                    }
                                /> :
                                <Stack spacing={2} className=''>
                                <Rating
                                    id={`${bookingItem.hotel.name} Rating`}
                                    name={`${bookingItem.hotel.name} Rating`}
                                    value={bookingItem.rating}
                                    readOnly/>
                                </Stack>
                        }
                        
                        {
                           editState === bookingItem._id && <EditBooking closeEdit={() => setEditState('not')} bid={bookingItem._id} 
                           hotel={bookingItem.hotel.name} room={bookingItem.room.roomNo} uid ={bookingItem.user._id} baseBookingDate={dayjs(bookingItem.bookingDate)} baseBookingEnd={dayjs(bookingItem.bookingEnd)}/>
                        }
                    </div>
                )) : <div className="text-2xl text-red-500 text-center">No Hotel has been booked</div>
            }
        </div>
    )
}