'use client'
import Image from "next/image"

import Rating from "@mui/material/Rating" 
import { Children, useState } from "react"



export default function Card({hotelName,imgSrc,hotelBooking}:{hotelName:string,imgSrc:string,hotelBooking: BookingItem[]}){
    let sum = 0;
    for (const booking of hotelBooking) {
        sum += booking.rating;
    }
    const value = sum / hotelBooking.length;
    
    return (
        <div className="w-full h-72 rounded-lg shadow-lg bg-white hover:scale-105 transition ease-in-out duration-100">
            <div className='w-full h-[70%] relative rounded-t-lg'>
                <Image src={imgSrc}
                alt='Hotel Picture'
                fill={true}
                className='object-cover rounded-t-lg'
                sizes="100vh"/>
            </div>
            <div className='w-full h-[15%] p-[10px]'>
                {hotelName}
            </div>
            { <Rating id={hotelName + ' Rating'} name={hotelName + ' Rating'} value={value} onClick={(e)=>{e.stopPropagation}} readOnly
            className='h-[15%] px-3'  precision={0.5}
            />}
        </div>
    )
}