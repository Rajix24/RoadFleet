const express = require("express")
const router = express.Router()

const assigneService = require("../services/assigne.service")
const assigneController = require("../controllers/assigne.controller")
const { validate } = require("../middlewares/validation.middleware")
const { createTrajetValidator } = require("../validators/trajet.validator")




router.get('/', assigneService.getAssigne)
router.post("/", createTrajetValidator, validate, assigneController.register)
//  route.put('/', assigneController.updateTrajet)




module.exports = router
