'use client'
import { useState } from "react"
import { DatePicker } from "@mui/x-date-pickers"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import dayjs, { Dayjs } from "dayjs"

export default function DateReserve({onDateChange, value, name, mindate,unavailableDate}: {onDateChange:Function, value:Dayjs | null, name:string, mindate?:Dayjs , unavailableDate?:BookingItem[]}) {

    const [reserveDate, setReserveDate] = useState<Dayjs | null>(value);  
    const isWeekend = (date: Dayjs) => {
        let compareDate = dayjs("2024-04-18T17:00:00.000+00:00").format("YYYY-MM-DD");
        const day = date;
        console.log(unavailableDate);
        if(unavailableDate === undefined) return day.isSame(compareDate);
        for(const booking of unavailableDate) {
            console.log(booking);
            if (day.isSame(dayjs(booking.bookingDate).format("YYYY-MM-DD")) || day.isSame(dayjs(booking.bookingEnd).format("YYYY-MM-DD"))) {
                return true;
            }
            if (day.isAfter(dayjs(booking.bookingDate).format("YYYY-MM-DD")) && day.isBefore(dayjs(booking.bookingEnd).format("YYYY-MM-DD"))) {
                return true;
            }
          
        }
        // console.log(day);
        // console.log(compareDate);
        // console.log(day.isSame(compareDate));
        return false;
      };

    return (
        <div className="bg-slate-100 rounded-lg space-x-5 space-y-2 px-4 py-5 flex flex-row justify-center m-1">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker className="bg-white" name={name} minDate={mindate} shouldDisableDate={isWeekend} 
                slotProps={{ textField: { size: 'small' } }}
                value={reserveDate} onChange={(value) => {setReserveDate(value); onDateChange(value)}}/>
            </LocalizationProvider>
        </div>
    )
}