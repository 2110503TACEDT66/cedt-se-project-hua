const mongoose=require('mongoose');

const NotificationSchema=new mongoose.Schema({
    type:{
        type:String,
        enum:['update','delete']
    },
    title:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    },
    user:{ 
        type:mongoose.Schema.ObjectId,
        ref : 'User',
        required : true
    },
    createAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model('Notification',NotificationSchema);
