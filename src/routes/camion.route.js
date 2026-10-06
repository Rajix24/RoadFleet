const express =  require("express")
const route = express.Router()
const CamionController = require("../controllers/camion.controller")
const auth_middleware = require("../middlewares/auth_middleware")
const  roleMiddleware  = require("../middlewares/role.middleware")
const {validate} = require("../middlewares/validation.middleware") 
const validateCamion = require("../validators/camion.validator")




route.get("/", CamionController.getAllCaminos)



route.post("/", validateCamion, validate,  CamionController.createCamion)

route.put("/:number", CamionController.edit)


route.delete("/:number", CamionController.deleteCamion)

module.exports = route