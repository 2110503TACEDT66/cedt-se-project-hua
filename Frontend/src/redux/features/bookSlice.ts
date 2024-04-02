import deleteBooking from "@/libs/deleteBooking";
import getBookings from "@/libs/getBooking";
import updateBooking from "@/libs/updateBooking";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

type BookState = {
    bookItems: BookingItem[]
}

const initialState: BookState = { bookItems: [] }

export const fetchBooking = createAsyncThunk("booking/fetch", async (token:string,thunkAPI) => {
    const data = await getBookings(token)
    return data;
});

export const deleteBookingfromDB = createAsyncThunk("booking/remove", async ({token, bid}: {token:string | undefined, bid:string}, thunkAPI) => {
    if (token) {
        const data = await deleteBooking(token, bid)
        toast.success("Booking deleted successfully");
        return data;
    }
});

export const updateBookingDB = createAsyncThunk("booking/update", async ({token, bid, bDate, bEnd}: {token: string | undefined, bid: string, bDate: string, bEnd: string}, thunkAPI) => {
    if (token) {
        const data = await updateBooking({token,bid,bDate,bEnd})
        toast.success("Booking updated")
        return data;
    }
})

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {
        addBookingLocal: (state, action:PayloadAction<BookingItem>) => {
            const existingBook = state.bookItems.find((item) => 
            item._id === action.payload._id);

            if (existingBook) {
                state.bookItems[state.bookItems.indexOf(existingBook)] = action.payload
            }
            else {
                state.bookItems.push(action.payload)
            }
        },
        removeBookingLocal: (state, action:PayloadAction<string>) => {
            state.bookItems = state.bookItems.filter((item) => item._id !== action.payload)
        },
        updateBookingLocal: (state, action:PayloadAction<{bid:string, bDate:string, bEnd:string}>) => {
            const { bid, bDate, bEnd } = action.payload;
            const existingBook = state.bookItems.findIndex((item) => item._id === bid);

            if (existingBook !== -1) {
                state.bookItems[existingBook].bookingDate = bDate;
                state.bookItems[existingBook].bookingEnd = bEnd;
            } else throw new Error("Invalid")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBooking.fulfilled, (state, action) => {
            console.log('yes')
            state.bookItems = action.payload.data
        })
    }
})

export const { addBookingLocal, removeBookingLocal, updateBookingLocal } = bookSlice.actions;
export default bookSlice.reducer;