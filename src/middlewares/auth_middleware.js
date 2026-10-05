const User = require("../models/user.model");
const { verify_token } = require("../utils/jwt.utils");

async function auth_middleware(req, res, next) {
    console.log("debug")
    const token = req.cookies.access_token;
    if(!token){
        res.status(401).json({
            message : "User not auth"
        });
    }
    console.log(token)
    try{
        const result = verify_token(req, token)
        console.log(result)
        const user = await User.findOne({email: result.sub})
        console.log(user)
        if (!user) {return res.status(401).json({message: "User not found"});        }
        req.user = user;
        console.log(token)
        next()

    }catch(error){
        console.log(error)
        res.send(error)
    }

}

module.exports = auth_middleware;