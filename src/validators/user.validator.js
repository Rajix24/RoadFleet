const {body} = require("express-validator")
const register_validator = [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:8}).withMessage("password must containe at lest 8 characters"),
    body("name").trim().notEmpty().withMessage("name is required"),
]

const login_validator = [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:8}).withMessage("password must containe at lest 8 characters"),
]
module.exports = {register_validator, login_validator }