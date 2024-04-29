import Link from "next/link";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function FormCompo({children, header, handleSubmit, typeSubmit}: {children: React.ReactNode, header: string, handleSubmit: (e: React.MouseEvent) => void, typeSubmit: string}) {
    return (
        <div className="fixed z-30 left-0 top-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40" >
            <div className="bg-white rounded-lg p-8 w-[30em] text-black">
                <div className="text-xl text-blue-700 text-center font-bold">{header}</div>
                <div className="my-4">
                    {children}
                    <div className="flex flex-col items-center justify-center">
                        <button type="submit" className="bg-black hover:scale-105 transition duration-100 
                        text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1 my-4"
                        onClick={handleSubmit}>{typeSubmit}</button>
                        <Link href="/" className="bg-black hover:scale-105 transition duration-100 
                        text-white p-2 font-medium rounded-full px-5 text-xl flex items-center gap-1" >
                            <IoMdArrowRoundBack/> Back
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}