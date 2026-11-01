const express = require("express")
const router = express.Router()
const maintenanceController = require("../controllers/maintenance.controller")
const { validate } = require("../middlewares/validation.middleware")
const {
  createMaintenanceValidator,
  updateMaintenanceValidator,
  maintenanceIdValidator
} = require("../validators/maintenance.validator")


router.get('/', maintenanceController.getAllMaintenance)
router.get('/:id', maintenanceIdValidator, validate, maintenanceController.getMaintenanceById)
router.post('/', createMaintenanceValidator, validate, maintenanceController.createMaintenance)
router.put('/:id', updateMaintenanceValidator, validate, maintenanceController.updateMaintenance)
router.delete('/:id', maintenanceIdValidator, validate, maintenanceController.deleteMaintenance)

module.exports = router
