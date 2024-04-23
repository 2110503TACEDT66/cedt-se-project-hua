const express = require('express');
const{getNotification,addNotifacation}=require('../controllers/notifications');

const router= express.Router({mergeParams:true});

const{protect,authorize}=require('../middleware/auth');

router.route('/')
    .get(protect,authorize('admin','user','hotelAdmin'),getNotification);
    
//router.route('/:id').post(protect,authorize('admin'), addNotifacation);

module.exports=router;