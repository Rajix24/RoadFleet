const maintenanceRepository = require("../repository/maintenance.repository")

class maintenanceService{
    async getAll(){
        try{
            const maintenances = await maintenanceRepository.getAll()
            return maintenances
        }catch(error){
            throw error
        }
    }

    async getById(id){
        const result = await maintenanceRepository.getById(id)
        if (!result) {
            const error = new Error("Maintenance not found")
            error.status = 404
            throw error
        }
        return result
    }

    async create(data){
        try{
            const result = await maintenanceRepository.create(data)
            return result
        }catch(error){
            throw error
        }
    }

    async update(id, data){
        const result = await maintenanceRepository.update(id, data)
        if (!result) {
            const error = new Error("Maintenance not found")
            error.status = 404
            throw error
        }
        return result
    }

    async deleteMaintenance(id){
        const result = await maintenanceRepository.delete(id)
        if (!result) {
            const error = new Error("Maintenance not found")
            error.status = 404
            throw error
        }
        return result
    }

    async delete(id){
        return this.deleteMaintenance(id)
    }
}

module.exports = new maintenanceService()
