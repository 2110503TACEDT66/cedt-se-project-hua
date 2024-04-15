// import getBookings from "@/libs/getBooking"

// export default async function CheckRoom(roomId: string) {
//     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZTJlMWE3ZWZhNjY0OTY1YTI3ZWFmZiIsImlhdCI6MTcxMzEyNjE5NiwiZXhwIjoxNzE1NzE4MTk2fQ.ZVMFRcku1ECDs7KmeIQ9B91i6HwJ7nRyZ5u3AMS8f_o"
//     const bookingJson = await getBookings(token);
    
//     if (!bookingJson || !Array.isArray(bookingJson.data)) {
//         console.error("Invalid booking data format");
//         return;
//     }

//     const bookings = bookingJson.data;


//     const bookingsWithSameRoomId: BookingItem[] = [];

//     for (const booking of bookings) {
//         if (booking.room._id === roomId) {
//             bookingsWithSameRoomId.push(booking);
//         }
//     }

//     console.log("Bookings with the same room_id:", bookingsWithSameRoomId);
// }