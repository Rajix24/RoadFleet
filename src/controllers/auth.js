const bcrypt = require("bcrypt")
const User = require("../models/user.model")
const { verify_token, setToken} = require("../utils/jwt.utils")



// THAT FUNCTION IS DONE:
async function login_user(req, res){
    try {
        // GET USER ON APPLICATION: 
        const {email, password} = req.body
        const current_user = await User.findOne({email}) 
        // IF USER NOT EXIST: 
        if (!current_user) {
            return res.status(401).json({
                status: false,
                message: "User not found"
            })
        }
        // VALIDE THE PASSWORD:
        const is_password_valid = await bcrypt.compare(password, current_user.password)
        if (!is_password_valid) {
            res.status(401).json({
                status: true,
                message: "wrong Email or Password"
            })
        }
        const token = setToken(current_user, res)
        res.json({
            message:"Successfull login",
            user: {
                email: current_user.email,
                token: token
            }   
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: " server error " , error})
    }
}



// THAT FUNCTION IS DONE 
async function register_user(req, res){
    console.log(req.body)
    try {
        //GET DATA :
        const {
            first_name,
            last_name, 
            email,
            password,
         } = req.body
        const current_user = await User.findOne({email})
        
        if(current_user){
            res.status(409).json({message: "User alrady exist"})
        }
        // GET SALT
        const salt = await bcrypt.genSalt(10)
        // CRYPT PASSWORD:
        const encrypted_password = await bcrypt.hash(password, salt)
        // CREATE USER IN DATABASE
        const new_user =  await User.create(
            {
                first_name:first_name,
                last_name: last_name,
                email: email,
                password: encrypted_password
            })
    token = setToken(new_user, res)
        res.status(201).json({
            message: "User has been register ",
            user: new_user.email,
            token: token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).message({ message: "Server Error!" });
    }
}


//THAT FUNCTION IS DONE
function check_auth(req, res){
    const  token =  req.cookies.access_token;
    console.log(token)
    console.log(req.cookies)
    if (!token) {
        console.log(token)
        return res.status(401).json({
            authorisation: false,
            message:"Token not avialible"
        })
    }
    try {
        const result = verify_token(token)
        return res.json({authorisation: result })
    } catch (error) {
        res.status(401).json({
            authorisation: false,
            message: "User is not availible for this token"
        })
    }
}
function logout(req , res){
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
        res.json({message: "user logout!"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "error in logoout function"})
    }
}

module.exports = { register_user,login_user, check_auth, logout}