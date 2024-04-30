export default async function addNotification(token:string, notificationData:NotificationsData){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/notifications`,{
        method : 'POST',
        headers :{ 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            type      : notificationData.type,
            bookingId : notificationData.bookingId,
            user      : notificationData.userId,
            checkin   : notificationData.checkin,
            checkout  : notificationData.checkout,
            roomNo    : notificationData.roomNo,
            Hotel     : notificationData.Hotel
        })
    });
    console.log(response)

    return response.json();
}