export default async function addRoom({payload, hid, token} : {payload: RoomPayload, hid: string, token: string}) {
    const response =  await fetch(`${process.env.BACKEND_URL}/api/v1/hotels/${hid}/rooms`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...payload
        })
    });

    if (!response.ok) throw new Error("Room Add failed");
    console.log("Add Room Success");

    return response.json();
}