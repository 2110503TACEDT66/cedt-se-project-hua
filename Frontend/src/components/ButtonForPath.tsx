'use client'
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function ButtonForPath({text,path} : {text: string, path: string}){
    const router = useRouter();

    const handleClick = () => {
        router.push(path)
    }
    return (
        <Button onClick={handleClick} variant="contained" color="secondary" className="text-black hover:text-white">{text}</Button>
    )
}