"use client"
import React from "react"

export default function RoomInteract({children}:{children:React.ReactNode}){

    return(
    <div className="w-full h-[300px] rounded-lg shadow-lg bg-black">
        {children}
    </div>
    )
}