const { body, param } = require("express-validator")

const createTireValidator = [
  body("serialNumber").isString().trim().notEmpty().withMessage("Serial number is required"),
  body("brand").isString().trim().notEmpty().withMessage("Brand is required"),
  body("size").isString().trim().notEmpty().withMessage("Size is required"),
  body("position").isString().trim().notEmpty().withMessage("Position is required"),
  body("currentMileage").isFloat({ min: 0 }).withMessage("Current mileage must be zero or greater"),
  body("mileageThreshold").optional({ values: "null" }).isFloat({ min: 0 }).withMessage("Mileage threshold must be zero or greater"),
  body("treadDepthMm").isFloat({ min: 0 }).withMessage("Tread depth must be zero or greater"),
  body("isArchived").optional().isBoolean(),
  body("status").optional().isIn(["in_stock", "mounted", "worn", "retired", "remplace"]),
  body("DateOfDeath").isISO8601().withMessage("Date of death must be a valid date"),
  body("purchaseDate").isISO8601().withMessage("Purchase date must be a valid date"),
  body("price").optional().isFloat({ min: 0 }).withMessage("Price must be zero or greater"),
  body("camion").optional({ values: "null" }).isMongoId().withMessage("Camion must be a valid id")
]

const updateTireValidator = [
  param("id").isMongoId().withMessage("Tire id must be valid"),
  body("serialNumber").optional().isString().trim().notEmpty(),
  body("brand").optional().isString().trim().notEmpty(),
  body("size").optional().isString().trim().notEmpty(),
  body("position").optional().isString().trim().notEmpty(),
  body("currentMileage").optional().isFloat({ min: 0 }),
  body("mileageThreshold").optional({ values: "null" }).isFloat({ min: 0 }),
  body("treadDepthMm").optional().isFloat({ min: 0 }),
  body("isArchived").optional().isBoolean(),
  body("status").optional().isIn(["in_stock", "mounted", "worn", "retired", "remplace"]),
  body("purchaseDate").optional().isISO8601(),
  body("price").optional().isFloat({ min: 0 }),
  body("camion").optional({ values: "null" }).isMongoId()
]

const tireIdValidator = [param("id").isMongoId().withMessage("Tire id must be valid")]

module.exports = { createTireValidator, updateTireValidator, tireIdValidator }
