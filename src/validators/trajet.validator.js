const { body } = require("express-validator")

const createTrajetValidator = [
  body("departureSite").isString().trim().notEmpty().withMessage("Departure site is required"),
  body("arrivalSite").isString().trim().notEmpty().withMessage("Arrival site is required"),
  body("merchandise").isString().trim().notEmpty().withMessage("Merchandise is required"),
  body("plannedDeparture").isISO8601().withMessage("Planned departure must be a valid date"),
  body("plannedArrival").isISO8601().withMessage("Planned arrival must be a valid date"),
  body("chauffeur").isMongoId().withMessage("Chauffeur must be a valid id"),
  body("camion").isMongoId().withMessage("Camion must be a valid id"),
  body("remorque").isMongoId().withMessage("Remorque must be a valid id"),
  body("status").optional().isIn(["a_faire", "en_cours", "termine"]),
  body("kilometrageDepart").optional().isFloat({ min: 0 }),
  body("kilometrageArrivee").optional().isFloat({ min: 0 }),
  body("distance").optional().isFloat({ min: 0 }),
  body("gasoilVolume").optional().isFloat({ min: 0 }),
  body("consommationMoyenne").optional().isFloat({ min: 0 }),
  body("remarque").optional().isString().trim()
]

module.exports = { createTrajetValidator }
