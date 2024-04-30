export default async function addNotification(token:string, notificationData:NotificationsData){
    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/notifications`,{
        method : 'POST',
        headers :{ 
            'Authorization': `Bearer ${token}`
        },
        body : JSON.stringify({
            type      : notificationData.type,
            checkin   : notificationData.bookingDate,
            checkout  : notificationData.bookingEnd,
            roomNo    : notificationData.roomNo,
            hotel     : notificationData.Hotel,
            bookingId : notificationData.bookingId,
            user      : notificationData.userId

        })
    });
    console.log(response)

    return response.json();
}