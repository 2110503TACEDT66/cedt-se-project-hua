"use client"

import DataReserve from "./DateReserve"
import { use, useState , useEffect, useCallback} from "react"
import dayjs, {Dayjs} from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import React from "react";
import { useSession } from "next-auth/react";
import addBooking from "@/libs/addBooking";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import getBookings from "@/libs/getBooking";

dayjs.extend(customParseFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function CheckAvailableRoom({hid, roomid,find,allRoom,setRoom} : {hid: string, roomid: string,find:Function,allRoom:RoomItem[],setRoom:Function}) {
    const { data: session } = useSession();
    const roomBooked: Set<string> = new Set();
    const [checkInDate,setCheckInDate] = useState<Dayjs | null>(null)
    const [checkOutdate,setCheckOutDate] = useState<Dayjs | null>(null)
    const [isBooked, setIsBooked] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState(false);
    const [bookingData, setBookingData] = useState<BookingItem[]>([]);
    const [initialData, setInitialData] = useState<BookingItem[]>([]);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    const router = useRouter();

    const handleSubmit = async () => {
        if (checkInDate && checkOutdate && session?.user.token && checkInDate.isBefore(checkOutdate)) {
            const bookingBody:BookingData = {
                hid,
                roomid,
                bDate: checkInDate.toString(),
                bEnd: checkOutdate.toString()
            }
            
            const data = await addBooking(session.user.token,bookingBody);
            if (data.success) {
                toast.success("Booked Successfully");
                router.push("/")
            } else {
                toast.error("Booking not Success");
            }
        }else{
            toast.error("Booking not Success");
        }
    }
    // base Code
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTJlMWE3ZWZhNjY0OTY1YTI3ZWFmZiIsImlhdCI6MTcxMzEyNjE5NiwiZXhwIjoxNzE1NzE4MTk2fQ.ZVMFRcku1ECDs7KmeIQ9B91i6HwJ7nRyZ5u3AMS8f_o";
    // Test Code
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MmU3NTY4NmVjNGJlMTJlZWMwZTcwNiIsImlhdCI6MTcxNDQ3ODIyNywiZXhwIjoxNzE3MDcwMjI3fQ.a22UCc670tz0eNPHF6DoY5mXGK0V2CLY2kJjGNpUPOk"
    const isDateOverlap = useCallback((date1Start: Dayjs, date1End: Dayjs, date2Start: Dayjs, date2End: Dayjs) => {
        date1Start = date1Start.startOf('day');
        date1End = date1End.startOf('day');
        date2Start = date2Start.startOf('day');
        date2End = date2End.startOf('day');
        return date1Start.isSameOrBefore(date2End) && date1End.isSameOrAfter(date2Start);
    }, []);

    useEffect(() => {
        getBookings(token).then((bookingJson) => {
            setInitialData(bookingJson.data);
        });
    }, []);

    useEffect(() => {
        if (session && initialData) {
            const filtered = initialData.filter((item:BookingItem) => item.room._id === roomid);
            setBookingData(filtered);
            for(const books of initialData) {
                if (books.hotel._id === hid) {
                    const bookingStart = dayjs(books.bookingDate).format("YYYY-MM-DD");
                    const bookingEnd = dayjs(books.bookingEnd).format("YYYY-MM-DD");
                    if (checkInDate?.isSameOrBefore(bookingEnd) && checkOutdate?.isSameOrAfter(bookingStart)){
                        roomBooked.add(books.room.roomNo);
                    }
                }
            }
            const availableRoom = allRoom.filter((room) => !roomBooked.has(room.roomNo));
            find(availableRoom);
            }
    }, [roomid,checkInDate,checkOutdate])

    const CheckRoom = async (checkIn: Dayjs, checkOut: Dayjs) => {
        
        const bookingJson = bookingData;
        
        if (!bookingJson || !Array.isArray(bookingData)) {
            console.error("Invalid booking data format");
            return;
        }
    
        const bookings = bookingData;
        setBookingData(bookings);
        const bookingsWithSameRoomId: BookingItem[] = [];
        let booking: BookingItem;
        for (booking of bookings) {
            if (booking.room._id === roomid) {
                bookingsWithSameRoomId.push(booking);
            }
        }
    
        for (const booking of bookingsWithSameRoomId) {
            const bookingCheckIn = dayjs(booking.bookingDate);
            const bookingCheckOut = dayjs(booking.bookingEnd);
    
            if (isDateOverlap(checkIn, checkOut, bookingCheckIn, bookingCheckOut)) {
                toast.warning("Booking overlaps with existing booking");
                console.log("Booking overlaps with existing booking:", booking);
                return true;
            }

            if (checkIn.isSameOrAfter(checkOut)) {
                toast.warning("Check-in date must be before check-out date");
                console.error("Check-in date must be before check-out date");
                return true;
            }
        }
    
        console.log("No overlap found");
        return false;
    };

    const checkAvailability = async () => {
        if (!checkInDate || !checkOutdate) {
            toast.warning("Please select check-in and check-out dates");
            console.error("Please select check-in and check-out dates");
            return;
        }

        if(await CheckRoom(checkInDate, checkOutdate)){
            console.log("Room is not available");
            setIsBooked(true);
        }
    };

    return (
        (!isOpen)?(<div className="flex flex-col bg-gray-100 p-7 pt-1 rounded-2xl w-[60%] m-auto transition delay-500 duration-300 ease-in-out">
            <div className="my-3 flex flex-col">
                <div>Check-In</div>
                <DataReserve onDateChange={(value:Dayjs)=> {setCheckInDate(value);}} value={checkInDate} mindate={dayjs()} unavailableDate={bookingData}   name="checkIn"/>
                <div>Check-Out</div>
                <DataReserve onDateChange={(value:Dayjs)=> setCheckOutDate(value)} value={checkInDate} mindate={checkInDate?checkInDate:dayjs()} unavailableDate={bookingData} name="checkOut"/>
            </div>
            <button className="bg-cyan-400 p-3 mb-2 text-xl rounded-xl hover:bg-cyan-500 hover:scale-104 transition duration-200 ease-in-out"
            onClick={() => {checkAvailability();togglePopup();}}>Booking</button>
            <button className="bg-red-400 p-3 text-xl rounded-xl hover:bg-red-500 hover:scale-104 transition duration-200 ease-in-out "
            onClick={() => {setRoom('');setCheckInDate(null);}}>Clear</button>
            
        </div>):( <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-40">
          <div className="bg-white rounded shadow-lg w-1/2">
            <div className="px-4 py-2 flex justify-between items-center bg-blue-500 text-white rounded-t">
              <h2 className="text-lg font-semibold"></h2>
              <button onClick={() => {togglePopup(); }} className="text-white hover:scale-105 transition duration-500 ease-in-out">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 text-black">
            {(isBooked || (!checkInDate && !checkOutdate) || checkInDate?.isSameOrAfter(checkOutdate)) ? <div>
                <p>Booking time is not available, Please choose new booking time</p>
                <div className="mt-4 flex justify-end">
                <button onClick={() => {togglePopup(); window.location.reload() }} className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out">
                  Close
                </button>
                </div>
              </div> : <div>
                <p>Confirm Booking</p>
                <div className="mt-4 flex justify-end">
                <button onClick={() => {togglePopup(); window.location.reload() }} className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out">
                  Back
                </button>
                <button onClick={() => {togglePopup();handleSubmit();}} className="bg-blue-500 hover:bg-blue-700 text-white m-auto font-bold py-2 px-4 rounded hover:scale-105 transition duration-500 ease-in-out">
                  Confirm
                </button>
                </div>
              </div>}
              
            </div>
          </div>
        </div>)
    
    )
}