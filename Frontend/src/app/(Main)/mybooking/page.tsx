'use client'
import BookingList from "@/components/BookingList"
import { fetchBooking } from "@/redux/features/bookSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Rating, Stack } from '@mui/material';
import getUserProfile from "@/libs/getUserProfile";
import { set } from "mongoose";
import { TailSpin } from "react-loading-icons";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";

export default function myBookingPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState('');
    const [sortBy, setSortBy] = useState('bookingDate');
    const [loading, setLoading] = useState(true);
    const [isAsc, setIsAsc] = useState(true);


    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        async function fetchUserData() {
            if (session) {
                setLoading(true);
                try {
                    dispatch(fetchBooking({token:session.user.token , sort: sortBy}));
                    await getUserProfile(session?.user.token).then((data) => {
                        setProfile(data);
                    })
                } catch (error) {
                    console.log(error)
                }
                setLoading(false);
            }
        }
<<<<<<< HEAD
    }, [])
    
=======
        fetchUserData();
        console.log('Change SortBy')
    }, [sortBy, isAsc])

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value)
    }
    const handlePriority = () => {
        if(isAsc) {
            const temp = '-'+sortBy
            setSortBy(temp)
            console.log('eiei')
        } else {
            const temp = sortBy.slice(1)
            setSortBy(temp)
        }
        setIsAsc(!isAsc)
        console.log('Change SortBy');
    }


>>>>>>> b8e3d1fefe29486b7607b99c37cee32099ba4bf0
    return (
        <main className="h-screen p-5">
            <div className="text-5xl text-center text-black font-bold p-6">My Booking</div>
            <div className="shadow-inner shadow-slate-100 p-4 rounded-2xl">
                {
                    loading ? 
                    <div className="flex items-center justify-center">
                        <TailSpin stroke="#BAA9D6"/>
                    </div>
                    : 
                    <>
                        <div className="flex ">
                            <div className="flex font-medium items-center gap-1 text-xl">
                                Sort By:
                                <select onChange={handleSelectChange} value={sortBy}
                                    className='bg-purple-50 border border-purple-300 text-black text-base font-medium rounded-lg focus:ring-purple-400 focus:border-purple-400 block w-40 p-2.5 '>
                                        <option hidden >Select Hotel</option>
                                        <option value={'rating'} > Rating </option>
                                        <option value={'bookingDate'} > Booking Start </option>
                                        <option value={'createAt'} > Created Date </option>
                                </select>
                            </div>
                            <button onClick={()=>handlePriority()} className="flex gap-1 items-center rounded-md bg-purple-400 transition duration-100 scale-105 hover:bg-purple-700 px-3 py-1 text-white shadow-sm mx-5">
                                {
                                isAsc ? <RiSortAsc /> : <RiSortDesc />
                                } Order
                            </button>
                        </div>
                        {/* create a button that clear the select input */}
                        <BookingList profile={profile}/>
                    </>
                }
            </div>
        </main>
    )
}