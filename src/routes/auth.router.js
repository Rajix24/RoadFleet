const express = require("express")
const {register_user, login_user ,check_auth, logout } = require("../controllers/auth")
const { register_validator } = require("../validators/user.validator")
const { body } = require("express-validator")

const {validate} = require("../middlewares/validation.middleware")
const auth_router = express.Router()



auth_router.post("/login", login_user)

auth_router.post("/register", register_validator, validate, register_user)


auth_router.post("/logout", logout) 
// auth_router.post("/logout", (req, res) =>{
//     res.json({message: "test router logout"})
// }) 



auth_router.get("/check_auth", check_auth);
// auth_router.get("/check_user", ()=>{
//     console.log("test check user")
// } )
// auth_router.post("/logout", ()=>{
//     console.log("test logut")
// } )


module.exports = auth_router
