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
     async create(data){
        try{
            console.log(data)
            const result  =  await maintenanceRepository.create(data)
            return result 
        }catch(error){  
            console.log(error)
            throw error 
        }

     }
    async deleteMaintenance(params){
        try{
            console.log(data)
            const result  =  await maintenanceRepository.delete(data)
            return result 
        }catch(error){  
            console.log(error)
            throw error 
        } 
    }
}

module.exports = new maintenanceService()
