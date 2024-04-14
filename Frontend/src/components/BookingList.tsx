'use client'
import { deleteBookingfromDB, removeBookingLocal } from "@/redux/features/bookSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import EditBooking from "./EditBooking"
import dayjs from 'dayjs'
import { useSession } from "next-auth/react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Rating,Stack } from "@mui/material"
import { useReducer } from "react"

export default function BookingList() {
    const { data: session } = useSession();
    
    const bookItems = useAppSelector((state) => state.bookSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>();

    const [editState, setEditState] = useState('not')

    // const [value, setValue] = useState<number | null>(5);

    // const showRatingReducer = (ratingList: Map<string, number>,action: { type: string, hotelName: string, rating: number }) => {
    //     switch (action.type) {
    //         case "add":
    //             ratingList.set(action.hotelName, action.rating)
    //             return new Map(ratingList);
    //         case "remove":
    //             ratingList.delete(action.hotelName);
    //             return new Map(ratingList);
    //         default:
    //             return ratingList;
    //     }
    // }

    // const [ratingList, dispatchRating] = useReducer(showRatingReducer);

    // const handleChangeRating = (hospitalName: string) => {
    //     return (newRating:number | null) => {
    //         if (newRating === null) {
    //             dispatchRating({ type: "remove", hospitalName, rating: 0})
    //         }
    //         else {
    //             dispatchRating({ type: 'add', hospitalName, rating: newRating });
    //         }
    //     }
    // } 

    return (
        <div className="pt-1 pl-3 pr-3">
            {
                (bookItems.length > 0) ? bookItems.map((bookingItem) => (
                    <div className='bg-violet-300 rounded px-5 py-2 mt-4' key={bookingItem._id}>
                        <div className="text-md">Hotel: {bookingItem.hotel.name}</div>
                        <div className="text-md">RoomNo: {bookingItem.room.roomNo}</div>
                        <div className="text-md">Room Type: {bookingItem.room.roomType}</div>
                        <div className="text-md">Booking Date: {dayjs(bookingItem.bookingDate).format('D MMMM YYYY')}</div>
                        <div className="text-md">Booking Checkout: {dayjs(bookingItem.bookingEnd).format('D MMMM YYYY')}</div>
                        <div className="flex flex-row">
                            <button className="block rounded-md bg-violet-950 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm"
                            onClick={() => {
                                dispatch(deleteBookingfromDB({token:session?.user.token, bid:bookingItem._id}));
                                dispatch(removeBookingLocal(bookingItem._id));
                            }}>Remove from Booking List</button>
                            <button className="block rounded-md bg-violet-950 hover:bg-indigo-600 px-3 py-1 text-white shadow-sm mx-5"
                            onClick={() => setEditState(bookingItem._id)}>Edit</button>
                        </div>
                        <Stack spacing={2} className='mx-2'>
                                <Rating
                                    // id={`${hospitalName} Rating`}
                                    // name={`${hospitalName} Rating`}
                                    // value={value}
                                    // onChange={(event, newValue) => {
                                    //     setValue(newValue);
                                    //     onRating(newValue);
                                    // }}
                                />
                        </Stack>
                        {
                           editState === bookingItem._id && <EditBooking closeEdit={() => setEditState('not')} bid={bookingItem._id} 
                           hotel={bookingItem.hotel.name} room={bookingItem.room.roomNo}/>
                        }
                    </div>
                )) : <div className="text-2xl dark:text-white text-center">No Hotel has been booked : {bookItems.length}</div>
            }
        </div>
    )
}