'use client'
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"

export default function DateReserve({onDateChange, value, name, mindate}: {onDateChange:Function, value:Dayjs | null, name:string, mindate?:Dayjs}) {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(value);  
    const isWeekend = (date: Dayjs) => {
        const compareDate = dayjs("2024-04-18T17:00:00.000+00:00").format("YYYY-MM-DD");
        const day = date;
        console.log(day);
        console.log(compareDate);
        console.log(day.isSame(compareDate));
        return day.isSame(compareDate);
      };

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 w-fit px-10 py-5 flex flex-row justify-center">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" name={name} minDate={mindate}
                value={reserveDate} onChange={(value) => {setReserveDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    )
}