const analyseService = require("../services/analyse.service")

class analyseController{
    eco_performance  = async (req, res)  => {  
        try{
            const counter = await analyseService.counterCamion();
            return res.status(200).json({
                message: "count camion", 
                count: counter
            })

        }  catch(error){
            res.status(300).json({
                message: error,
                data: error
            })
        }
    }
}


module.exports = new analyseController()
