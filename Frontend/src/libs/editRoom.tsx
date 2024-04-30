export default async function editRoom({payload, rid, token} : {payload: RoomPayload, rid: string, token: string}) {
    const response =  await fetch(`${process.env.BACKEND_URL}/api/v1/rooms/${rid}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
            ...payload
        })
    });

    if (!response.ok) throw new Error("Room Edit failed");
    console.log("Edit Room Success");

    return response.json();
}