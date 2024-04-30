const express = require('express');
const{getNotification,addNotification,deleteNotification}=require('../controllers/notifications');

const router= express.Router({mergeParams:true});

//Document 
//for getNotification path : get http://localhost:5000/api/v1/notifications
/*Example of return data : 
{
    "success": true,
    "data": [
        {
            "_id": "662a18d1df30fc676376e1ca",
            "type": "update",
            "title": "test1",
            "message": "this is for test notifaication",
            "user": "661e44faaa7264ce57d320c9",
            "createAt": "2024-04-24T09:00:00.000Z",
            "bookingId": "662a188f6474419fd6be846d",
            "bookings": [
                {
                    "_id": "662a188f6474419fd6be846d",
                    "bookingDate": "2024-04-23T17:00:00.000Z",
                    "bookingEnd": "2024-04-26T17:00:00.000Z",
                    "user": "661e44faaa7264ce57d320c9",
                    "hotel": "6621da4c33aa02a4ec39b89a",
                    "room": "6621da4d33aa02a4ec39b89d",
                    "rating": null,
                    "createAt": "2024-04-25T08:47:11.876Z",
                    "__v": 0
                }
            ],
            "id": "662a18d1df30fc676376e1ca"
        }
    ]
}
*/

//for addNotification path : post http://localhost:5000/api/v1/notifications
//example of input data : 
/*
{
    "type":"update",
    "title":"test",
    "message":"test add notification",
    "bookingId":"6621d581bc4986c1afb2f7e1",
    "user":"65e53d4b81c27cf441c8ff75"
}
*/

const{protect,authorize}=require('../middleware/auth');

router.route('/')
    .get(protect,authorize('admin','user','hotelAdmin'),getNotification)
    .post(protect,authorize('admin','user','hotelAdmin'),addNotification);
router.route('/:id').delete(protect,authorize('admin','user','hotelAdmin'),deleteNotification);
    
//router.route('/:id').post(protect,authorize('admin'), addNotifacation);

module.exports=router;