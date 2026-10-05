const jwt = require("jsonwebtoken");

function generate_token(user) {
  return jwt.sign({ sub: user.email }, process.env.JWT_SECRET, {expiresIn: '30m'});
}

function verify_token(req, token){
    const  data =  jwt.verify(token, process.env.JWT_SECRET)
    req.user = data;
    return data;
}
function setToken(current_user, res){
    const token = generate_token(current_user)
        res.cookie("access_token", token , {
            httpOnlly: true ,
            secure: false ,
            samefile: "lax",
            maxAge: 60 * 60 * 1000
        })
        return token;
}
module.exports = { verify_token, setToken}