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

        req.body.user = req.user.id;
        const Notifications = await Notification.create(req.body);

        res.status(200).json({success:true,data:Notifications});

    }catch(error){
        console.log(error);
        return res.status(500).json({success:false,message:"Cannot create Notification"});
    }
}