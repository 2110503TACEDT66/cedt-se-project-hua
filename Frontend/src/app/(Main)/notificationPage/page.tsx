'use client'

import NotificationList from "@/components/NotificationList"
import { fetchBooking } from "@/redux/features/bookSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getUserProfile from "@/libs/getUserProfile";

export default function notificationPage() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState('')

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (session) {
            dispatch(fetchBooking({token:session?.user?.token}));
            getUserProfile(session?.user.token).then((data) => {
                setProfile(data);
            })
        }
    }, [])

    return (
        <main className=" bg-cover bg-center bg-no-repeat h-screen">
            <NotificationList profile={profile}/>
        </main>
    )
}