'use client'

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link";
import TopMenuItem from "./TopMenuItem";
import { HiBell } from "react-icons/hi";


export default function AuthButton() {
    const { data: session } = useSession();

    if (session && session.user) {
        return (
            <div className="absolute flex flex-row-reverse right-5">
                <button className="block rounded-xl bg-purple-400 hover:bg-purple-700 px-3 py-2 text-white shadow-sm mx-2" onClick={() => signOut()}>Log-Out</button>
                <TopMenuItem title="Profile" pageRef="/profile" />
                <Link href="notificationPage">
                    <HiBell size={36} className="text-gray-400 hover:text-yellow-400"/>
                </Link>
            </div>
           
        )
    }

    return (
        <div className="absolute flex flex-row-reverse right-5">
            <Link href="/register">
                <button className="block rounded-xl bg-purple-400 hover:bg-purple-700 px-3 py-2 text-white shadow-sm mx-2">Register</button>
            </Link>
            <button className="block rounded-xl bg-purple-400 hover:bg-purple-700 px-3 py-2 text-white shadow-sm mx-2" onClick={() => signIn()}>Login</button>
        </div>
    )
}