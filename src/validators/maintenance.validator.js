const { body, param } = require("express-validator")

const maintenanceTypes = ["vidange", "revision", "reparation", "pneus", "freins", "autre"]
const maintenanceStatuses = ["planned", "in_progress", "completed", "cancelled"]

const createMaintenanceValidator = [
  body("camion").optional({ values: "null" }).isMongoId().withMessage("Camion must be a valid id"),
  body("vehicle").optional({ values: "null" }).isMongoId().withMessage("Vehicle must be a valid id"),
  body("remorque").optional({ values: "null" }).isMongoId().withMessage("Remorque must be a valid id"),
  body("type").isIn(maintenanceTypes).withMessage("Invalid maintenance type"),
  body("description").isString().trim().notEmpty().withMessage("Description is required"),
  body("maintenanceDate").isISO8601().withMessage("Maintenance date must be a valid date"),
  body("mileage").isFloat({ min: 0 }).withMessage("Mileage must be zero or greater"),
  body("cost").isFloat({ min: 0 }).withMessage("Cost must be zero or greater"),
  body("status").optional().isIn(maintenanceStatuses).withMessage("Invalid maintenance status"),
  body("nextMaintenanceDate").optional({ values: "null" }).isISO8601().withMessage("Next maintenance date must be a valid date"),
  body("nextMaintenanceMileage").optional({ values: "null" }).isFloat({ min: 0 }).withMessage("Next maintenance mileage must be zero or greater"),
  body().custom((value, { req }) => {
    const hasCamion = Boolean(req.body.camion || req.body.vehicle)
    const hasRemorque = Boolean(req.body.remorque)
    if (hasCamion === hasRemorque) {
      throw new Error("Select exactly one asset: camion or remorque")
    }
    return true
  })
]

const updateMaintenanceValidator = [
  param("id").isMongoId().withMessage("Maintenance id must be valid"),
  body("camion").optional({ values: "null" }).isMongoId().withMessage("Camion must be a valid id"),
  body("vehicle").optional({ values: "null" }).isMongoId().withMessage("Vehicle must be a valid id"),
  body("remorque").optional({ values: "null" }).isMongoId().withMessage("Remorque must be a valid id"),
  body("type").optional().isIn(maintenanceTypes).withMessage("Invalid maintenance type"),
  body("description").optional().isString().trim().notEmpty().withMessage("Description is required"),
  body("maintenanceDate").optional().isISO8601().withMessage("Maintenance date must be a valid date"),
  body("mileage").optional().isFloat({ min: 0 }).withMessage("Mileage must be zero or greater"),
  body("cost").optional().isFloat({ min: 0 }).withMessage("Cost must be zero or greater"),
  body("status").optional().isIn(maintenanceStatuses).withMessage("Invalid maintenance status"),
  body("nextMaintenanceDate").optional({ values: "null" }).isISO8601().withMessage("Next maintenance date must be a valid date"),
  body("nextMaintenanceMileage").optional({ values: "null" }).isFloat({ min: 0 }).withMessage("Next maintenance mileage must be zero or greater"),
  body().custom((value, { req }) => {
    const hasCamion = Boolean(req.body.camion || req.body.vehicle)
    const hasRemorque = Boolean(req.body.remorque)
    if (hasCamion && hasRemorque) {
      throw new Error("Select exactly one asset: camion or remorque")
    }
    return true
  })
]

const maintenanceIdValidator = [param("id").isMongoId().withMessage("Maintenance id must be valid")]

module.exports = { createMaintenanceValidator, updateMaintenanceValidator, maintenanceIdValidator }
