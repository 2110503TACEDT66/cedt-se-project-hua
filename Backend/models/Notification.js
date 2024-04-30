const mongoose=require('mongoose');
const Booking = require('./Booking');

const NotificationSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['update','delete']
    },
    checkin:{
        type:String,
        required:true
    },
    checkout:{
        type:String,
        required:true
    },
    user:{ 
        type:mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    bookingId:{
        type:mongoose.Schema.ObjectId,
        required : true
    },
    roomNo:{
        type:String
    },
    Hotel:{
        type:String
    },
    editor:{
       type:String
    },
    roomType:{
        type:String
    },
    createAt:{
        type:Date,
        default:Date.now
    }
},
{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}

});
NotificationSchema.virtual('bookings',{
    ref:'Booking',
    localField:'bookingId',
    foreignField:'_id',
    justOne:false
});

module.exports=mongoose.model('Notification',NotificationSchema);
