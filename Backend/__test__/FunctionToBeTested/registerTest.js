const User = require('../../models/User');


exports.register = async (req, res, next) => {
    try {
        const {name, email, tel, password, role, hid} = req.body;
        if(!name || !email || !tel || !password || !role) {
            return res.status(400).json({success: false, msg: 'Please provide all required fields'});
        }
        const user = await User.create({ name, email, tel, password, role, hid});
        
        // Create token
        // sendTokenResponse(user,201,res);
        res.status(201).json({success: true});
    } catch (err) {
        res.status(500).json({success: false});
        console.log(err.stack);
    }
}

