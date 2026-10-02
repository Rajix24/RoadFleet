const express = require("express")
const {register_user, login_user ,check_auth, logout } = require("../controllers/auth")
const { register_validator, login_validator } = require("../validators/user.validator")

const {validate} = require("../middlewares/validation.middleware")
const auth_router = express.Router()



auth_router.post("/login",login_validator,validate , login_user)
auth_router.post("/register", register_validator, validate,register_user)
auth_router.post("/logout", logout) 
auth_router.get("/check_auth", check_auth);


module.exports = auth_router
