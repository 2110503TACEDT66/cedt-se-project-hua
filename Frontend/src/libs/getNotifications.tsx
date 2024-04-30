export default async function getNotifications(token: string) {
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/notifications`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    if (!response.ok) throw new Error("Failed to fetch notification")

    return response.json();
}