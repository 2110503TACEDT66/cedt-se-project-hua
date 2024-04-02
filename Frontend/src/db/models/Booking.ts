import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
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
     createAt:{
        type:Date,
        default:Date.now
     }
});

const Booking = mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
export default Booking;