const express = require("express")
const RemorqueController = require("../controllers/remorque.controller")
const { validate } = require("../middlewares/validation.middleware")
const {
  createRemorqueValidator,
  updateRemorqueValidator,
  remorqueIdValidator
} = require("../validators/remorque.validator")

const route = express.Router()

route.get("/", RemorqueController.getAll)
route.get("/:id", remorqueIdValidator, validate, RemorqueController.getById)
route.post("/", createRemorqueValidator, validate, RemorqueController.create)
route.put("/:id", updateRemorqueValidator, validate, RemorqueController.update)
route.delete("/:id", remorqueIdValidator, validate, RemorqueController.delete)

module.exports = route
