const Notification = require('../models/Notification');

exports.getNotification = async(req,res,next)=>{
    try {
  
        res.status(200).json({success:true, data:"get Notification"});
    } catch(error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot find Notification"});
    }
}

exports.addNotification = async(req,res,next)=>{
    try{
        const { type, title, message, user } = req.body;

        // Check if all required fields are present
        if (!type || !title || !message || !user) {
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