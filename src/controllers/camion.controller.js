const  CamionService = require("../services/camion.service")

class CamionController {

     getAllCaminos = async (req, res) => {

        try{
            const camions = await CamionService.getAllCamions()
            return res.status(200).json({
                message: "operation is done", 
                data: camions
            })
        }catch(error){
            console.log(error)
            return res.status(401).json({
                message: "bad request error in server",
                error: error.message
            })
        }
    }

    createCamion = async (req, res)=>{
        try{
            console.log("debug")
            const result = await CamionService.saveCamion(req.body)
            res.status(201).json(result)
        }catch(error){
            console.log(error)
            res.status(401).json({
                message: "some error in service",
                error: error.message
            })
        }
    }
    edit = async (req, res)=>{
        try{
            const result = await CamionService.editCamion(req.params.number,req.body )
            res.status(200).json({result})
        }catch(error){
            res.status(400).json({
                message: "error in application", 
                error: error
            })
        }
    }

    deleteCamion = async (req, res) =>{
        res.status(200).json({
            message: "delete function",
            req: req.params
        })
    }
}
module.exports = new CamionController()
