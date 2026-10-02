const express =  require("express")
const route = express.Router()
const UserController = require("../controllers/user.controller")
const auth_middleware = require("../middlewares/auth_middleware")
const {validate} = require("../middlewares/validation.middleware")
// const {register_validator} = require("../validators/user.validator")

route.get("/users",auth_middleware, UserController.getAll)
route.get("/user/:email",auth_middleware,UserController.getOneUser)
route.put("/user/:email",  UserController.UpdateUser)



module.exports = route