const express = require('express');
const{getNotification,addNotification}=require('../controllers/notifications');

const router= express.Router({mergeParams:true});

const{protect,authorize}=require('../middleware/auth');

router.route('/')
    .get(protect,authorize('admin','user','hotelAdmin'),getNotification)
    .post(protect,authorize('admin','user','hotelAdmin'),addNotification);
    
//router.route('/:id').post(protect,authorize('admin'), addNotifacation);

module.exports=router;