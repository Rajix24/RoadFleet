const User = require("../models/user.model");
const { verify_token } = require("../utils/jwt.utils");

async function auth_middleware(req, res, next) {
    const token = req.cookies.access_token;
    if(!token){
        res.status(401).json({
            message : "User not auth"
        });
    }
    try{

        const result = verify_token(token)
        const user = await User.findOne({email: result.email}).select("-password")
        req.user = user;
        next()
    }catch(error){
        res.send(error)
    }

}

module.exports = auth_middleware;