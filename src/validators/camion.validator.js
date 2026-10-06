const {body} = require("express-validator")

const validateCamion = [

    body("number")
        .notEmpty()
        .withMessage("Camion number is required")
        .isNumeric()
        .withMessage("Camion number must be a string"),

    body("brand")
        .notEmpty()
        .withMessage("Brand is required")
        .isString()
        .withMessage("Brand must be a string"),

    body("model")
        .notEmpty()
        .withMessage("Model is required")
        .isString()
        .withMessage("Model must be a string"),

    body("vehicleStatus")
        .notEmpty()
        .withMessage("Vehicle status is required")
        .isIn(["available", "in_use", "maintenance", "out_of_service"])
        .withMessage("Invalid vehicle status"),

    body("acquisitionDate")
        .notEmpty()
        .withMessage("Acquisition date is required")
        .isISO8601()
        .withMessage("Acquisition date must be a valid date"),

];

module.exports = validateCamion