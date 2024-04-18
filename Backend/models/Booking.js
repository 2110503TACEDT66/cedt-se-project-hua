const mongoose=require('mongoose');

const BookingSchema=new mongoose.Schema({
    bookingDate:{
        type:Date,
        required:true
    },
    bookingEnd: {
       type:Date,
       required:true
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
     },
     hotel:{
        type:mongoose.Schema.ObjectId,
        ref : 'Hotel',
        required : true
     },
     room:{
        type:mongoose.Schema.ObjectId,
        ref : 'Room',
        required : true
     },
     rating: {
         type:Number,
         default:null,
         min:0,
         max:5
     },
     createAt:{
        type:Date,
        default:Date.now
     }
});
module.exports=mongoose.model('Booking',BookingSchema);
