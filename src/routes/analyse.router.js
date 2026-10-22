const express = require("express")
const router = express.Router()
const analyseController = require('../controllers/analyse.controller')
const TireController = require('../controllers/tire.controller')
const authMiddleware = require('../middlewares/auth_middleware')
const roleMiddleware = require('../middlewares/role.middleware')


router.get('/drivers/eco-performance', analyseController.eco_performance)

router.get("/trips/financial-esg", analyseController.getTripsFinancialEsg)
router.get("/fleet/utilization-trends", analyseController.getFleetUtilizationTrends)
router.get("/tires/health-matrix",
    // authMiddleware, roleMiddleware("admin"),
    TireController.getHealthMatrix)


module.exports = router
