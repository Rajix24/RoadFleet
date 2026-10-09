const trajetService = require("../services/trajet.service")


class trajetController{

    trajets = async (req, res) => {
        try{
            const trajets = await trajetService.getAllTrajets()
            res.status(200).json({
                message: "seccussful operation",
                data: trajets
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "bad request",
                error: error.message
            })
        }   
    }

    register = async (req, res) => {
        try{
            const trajet = await trajetService.registerTrajet(req.body)
            return res.status(201).json({
                message: "Trajet created successfully",
                data: trajet
            })
        }catch(error){
            const status = error.name === "ValidationError" || error.code === 11000 ? 400 : 500
            return res.status(status).json({
                message: "Could not create trajet",
                error: error.message
            })
        }
    }


}

module.exports = new trajetController()
