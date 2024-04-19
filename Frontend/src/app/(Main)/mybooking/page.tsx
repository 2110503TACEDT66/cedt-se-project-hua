'use client'
import BookingList from "@/components/BookingList"
import { fetchBooking } from "@/redux/features/bookSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Rating, Stack } from '@mui/material';
import getUserProfile from "@/libs/getUserProfile";

export default function myBookingPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (session) {
            dispatch(fetchBooking(session.user.token));
            getUserProfile(session?.user.token).then((data) => {
                setProfile(data);
            })
        }
    }, [])



    return (
        <main className=" bg-cover bg-center bg-no-repeat h-screen">
            <BookingList profile={profile}/>
        </main>
    )
}