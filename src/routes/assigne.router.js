const express = require("express")
const router = express.Router()

const assigneService = require("../services/assigne.service")
const trajetController = require("../controllers/trajet.controller")
const { validate } = require("../middlewares/validation.middleware")
const { createTrajetValidator } = require("../validators/trajet.validator")




router.get('/', assigneService.getAssigne)
router.post("/", createTrajetValidator, validate, trajetController.register)




module.exports = router