const maintenanceModel = require("../models/maintenance.model")


class maintenanceRepository{
    async getAll(){
        try{
            const maintenance = await maintenanceModel.find()
            return maintenance
        }catch(error){
            console.log(error)
            throw error
        }
    }
    async create(data){
        try{
            const maintenance = await maintenanceModel.create(data)
            return maintenance
        }catch(error){
            console.log(error)
            throw error
        }
    }
    async delete(params_id){
        try{
            const maintenance = await maintenanceModel.findByIdAndDelete(params_id)
            return maintenance
        }catch(error){
            console.log(error)
            throw error
        }
    }


}

module.exports = new maintenanceRepository()
