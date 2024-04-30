'use client'

import NotificationList from "@/components/NotificationList"
import { fetchBooking } from "@/redux/features/bookSlice";
import { AppDispatch } from "@/redux/store";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import getNotifications from "@/libs/getNotifications";

export default function notificationPage() {
    const { data: session } = useSession();
    const [notifications,setNotifications] = useState([])

    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        if (session) {
            //dispatch(fetchBooking({ token: session.user.token }));
            getNotifications(session?.user.token).then((data) => {
                setNotifications(data.data);
                console.log(data.data);
            })
        }
    }, [])

    return (
        <main className=" bg-cover bg-center bg-no-repeat h-screen">
            <NotificationList notifications={notifications}/>
        </main>
    )
}