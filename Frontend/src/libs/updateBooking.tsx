export default async function updateBooking({token, bid, bDate, bEnd} : {token: string, bid: string, bDate: string, bEnd: string}) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            bookingDate: bDate,
            bookingEnd: bEnd
        })
    });
    if (!response.ok) throw new Error("Failed to delete bookings")

    return response.json();
}