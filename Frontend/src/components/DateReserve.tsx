'use client'
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { Dayjs } from "dayjs"

export default function DateReserve({onDateChange, value, name}: {onDateChange:Function, value:Dayjs | null, name:string}) {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(value);  

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" name={name}
                value={reserveDate} onChange={(value) => {setReserveDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    )
}