const maintenanceService = require("../services/maintenance.service")


class maintenanceController{
    getAllMaintenance = async(req, res) =>{
        try{
            const maintenances  = await maintenanceService.getAll()
            res.status(200).json({
                message: "operation done",
                data: maintenances
            })
        }catch(error){
            console.log(error)
            res.status(500).json({
                message: "error can't get all maintenances",
                error: error.message
            })
        }
    }
    createMaintenance = async (req, res)=>{
        const data = req.body
        try{
             const result = await maintenanceService.create(data)
             res.status(201).json({
                message: "operation is done",
                data: result
             }) 

        }catch(error){
            console.log(error)
            const status = error.name === "ValidationError" || error.code === 11000 ? 400 : 500
            res.status(status).json({
                message: "Could not create maintenance",
                error: error.message
            })
        }
    }
    deleteMaintenance = async(req, res)=>{
        try{
            const result = await maintenance.deleteMaintenance(params) 
            res.status(200).json({
                message: "delete maintenance",
                data: result
            })
        }catch(error){
            console.log(error)
            res.status(400).json({
                message: "error in delete maintenance",
                error: error
            })
        }

    }
}
module.exports = new maintenanceController()
