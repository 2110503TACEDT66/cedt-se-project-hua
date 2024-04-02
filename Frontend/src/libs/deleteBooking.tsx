export default async function deleteBookings(token: string, bid: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/bookings/${bid}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to delete bookings")

    return response.json();
}