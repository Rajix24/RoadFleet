const express =  require("express")
const route = express.Router()
const UserController = require("../controllers/user.controller")
const auth_middleware = require("../middlewares/auth_middleware")



route.get("/user",auth_middleware, UserController.getAll)
route.get("/user/email", auth_middleware, UserController.getOneUser)



module.exports = route