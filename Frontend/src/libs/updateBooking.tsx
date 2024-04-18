export default async function updateBooking({token, bid, bDate, bEnd, ratingNum} : {token: string, bid: string, bDate?: string, bEnd?: string, ratingNum?: number}) {
    let payload;
    if (ratingNum) {
        payload = {
            rating: ratingNum
        }
    } else if (bDate && bEnd) {
        payload = {
            bookingDate: bDate,
            bookingEnd: bEnd
        
        }
    }
    
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...payload
        })
    });
    if (!response.ok) throw new Error("Failed to delete bookings")

    return response.json();
}