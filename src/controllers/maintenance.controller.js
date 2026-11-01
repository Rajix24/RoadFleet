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

    getMaintenanceById = async(req, res) =>{
        try{
            const maintenance = await maintenanceService.getById(req.params.id)
            return res.status(200).json({
                message: "operation done",
                data: maintenance
            })
        }catch(error){
            console.log(error)
            return this.sendError(res, error)
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
            const status = error.status || (error.name === "ValidationError" || error.code === 11000 ? 400 : 500)
            res.status(status).json({
                message: "Could not create maintenance",
                error: error.message
            })
        }
    }

    updateMaintenance = async(req, res) =>{
        try{
            const result = await maintenanceService.update(req.params.id, req.body)
            return res.status(200).json({
                message: "Maintenance updated successfully",
                data: result
            })
        }catch(error){
            console.log(error)
            return this.sendError(res, error)
        }
    }

    deleteMaintenance = async(req, res) =>{
        try{
            const result = await maintenanceService.deleteMaintenance(req.params.id)
            return res.status(200).json({
                message: "Maintenance deleted successfully",
                data: result
            })
        }catch(error){
            console.log(error)
            return this.sendError(res, error)
        }
    }

    getById = (req, res) => this.getMaintenanceById(req, res)
    update = (req, res) => this.updateMaintenance(req, res)
    delete = (req, res) => this.deleteMaintenance(req, res)

    sendError(res, error){
        const status = error.status || (error.name === "ValidationError" || error.code === 11000 ? 400 : 500)
        return res.status(status).json({ message: error.message })
    }
}
module.exports = new maintenanceController()
