const express = require('express');
const{getRooms,getRoom,addRoom,updateRoom,deleteRoom}=require('../controllers/rooms');
const bookingRouter=require('./bookings');
const router=express.Router({mergeParams:true});
const{protect,authorize}=require('../middleware/auth');
router.use('/:roomId/bookings/',bookingRouter);
router.route('/').get(getRooms).post(protect,authorize('admin','hotelAdmin'),addRoom);
router.route('/:id').get(protect,getRoom).put(protect,authorize('admin','hotelAdmin'),updateRoom).delete(protect,authorize('admin','hotelAdmin'),deleteRoom);
module.exports=router;