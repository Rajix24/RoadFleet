const express = require("express")
const router = express.Router()
const analyseController = require('../controllers/analyse.controller')


router.get('/drivers/eco-performance', analyseController.eco_performance)


module.exports = router
