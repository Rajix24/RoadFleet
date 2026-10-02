const {body} = require("express-validator")



const register_validator = [
    body("first_name").isString().withMessage("first name is require"),
    body("last_name").isString().withMessage("\last name is require"),
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({min:8}).withMessage("password must containe at lest 8 characters"),
]

const login_validator = [
        body("email").isEmail().withMessage("invalid email"),
        body("password").isLength({min:8}).withMessage("password must containe at lest 8 characters"),
    ]
module.exports = {register_validator, login_validator }