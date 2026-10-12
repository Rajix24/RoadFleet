const express =  require("express")
const router = express.Router()
const CamionController = require("../controllers/camion.controller")
const auth_middleware = require("../middlewares/auth_middleware")
const  roleMiddleware  = require("../middlewares/role.middleware")
const {validate} = require("../middlewares/validation.middleware") 
const validateCamion = require("../validators/camion.validator")


router.get("/", CamionController.getAllCaminos)
router.post("/", validateCamion, validate,  CamionController.createCamion)
router.put("/:number", CamionController.edit)
router.delete("/:number", CamionController.deleteCamion)
module.exports = router