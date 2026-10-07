const express = require("express")
const TireController = require("../controllers/tire.controller")
const { validate } = require("../middlewares/validation.middleware")
const {
  createTireValidator,
  updateTireValidator,
  tireIdValidator
} = require("../validators/tire.validator")

const route = express.Router()

route.get("/", TireController.getAll)
route.get("/:id", tireIdValidator, validate, TireController.getById)
route.post("/", createTireValidator, validate, TireController.create)
route.put("/:id", updateTireValidator, validate, TireController.update)
route.delete("/:id", tireIdValidator, validate, TireController.delete)

module.exports = route
