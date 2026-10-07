const { body, param } = require("express-validator")

const createRemorqueValidator = [
  body("registrationNumber").isString().trim().notEmpty().withMessage("Registration number is required"),
  body("brand").isString().trim().notEmpty().withMessage("Brand is required"),
  body("model").isString().trim().notEmpty().withMessage("Model is required"),
  body("status").optional().isIn(["available", "in_use", "maintenance", "out_of_service"]),
  body("acquisitionDate").isISO8601().withMessage("Acquisition date must be a valid date"),
  body("camion").optional({ values: "null" }).isMongoId().withMessage("Camion must be a valid id")
]

const updateRemorqueValidator = [
  param("id").isMongoId().withMessage("Remorque id must be valid"),
  body("registrationNumber").optional().isString().trim().notEmpty(),
  body("brand").optional().isString().trim().notEmpty(),
  body("model").optional().isString().trim().notEmpty(),
  body("status").optional().isIn(["available", "in_use", "maintenance", "out_of_service"]),
  body("acquisitionDate").optional().isISO8601(),
  body("camion").optional({ values: "null" }).isMongoId()
]

const remorqueIdValidator = [param("id").isMongoId().withMessage("Remorque id must be valid")]

module.exports = { createRemorqueValidator, updateRemorqueValidator, remorqueIdValidator }
