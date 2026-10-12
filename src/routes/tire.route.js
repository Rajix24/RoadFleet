const express = require("express")
const TireController = require("../controllers/tire.controller")
const { validate } = require("../middlewares/validation.middleware")
const {createTireValidator,updateTireValidator,tireIdValidator} = require("../validators/tire.validator")
const router = express.Router()




router.get("/", TireController.getAll)
router.get("/:id", tireIdValidator, validate, TireController.getById)
router.post("/", createTireValidator, validate, TireController.create)
router.put("/:id", updateTireValidator, validate, TireController.update)
router.delete("/:id", tireIdValidator, validate, TireController.delete)

module.exports = router
