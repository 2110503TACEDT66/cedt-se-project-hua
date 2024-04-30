const Notification = require('../models/Notification');

exports.getNotification = async(req,res,next)=>{
    try {
        console.log(req.user.id);
        const notifications = await Notification.find({user:req.user.id}).populate('bookings');
        res.status(200).json({success:true, data:notifications});
    } catch(error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot find Notification"});
    }
}

exports.addNotification = async(req,res,next)=>{
    try{
        const { type, checkin, checkout ,bookingId, user , roomNo ,Hotel } = req.body;

        // Check if all required fields are present
        if (!type || !checkin || !checkout || !user || !bookingId) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if type is one of the allowed values
        if (type !== 'update' && type !== 'delete') {
            return res.status(400).json({ success: false, message: "Invalid notification type" });
        }

        // Create the notification
        const notification = await Notification.create(req.body);

        res.status(200).json({success:true,data:notification});

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot create Notification"});
    }
}

exports.deleteNotification = async(req,res,next)=>{
    try{
        const notification = await Notification.findById(req.params.id);

        if(!notification){
            return res.status(404).json({success:false,message:"Notification not found"});
        }

        if(notification.user.toString() !== req.user.id && req.user.role !== 'admin'){
            return res.status(401).json({success:false,message:"Not authorized to delete Notification"});
        }

        //await notification.deleteOne();

        res.status(200).json({success:true,data:{}});
    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot delete Notification"});
    }
}