const CamionModel = require('../models/camion.model')


class CamionRepository{
    async getAllCamions(){
        try{
            const camions = await CamionModel.find()
            return camions
        }catch(error){
            throw new Error(error)
        }
    }

    async createCamion(data){
        try{
            const {incomming_number} = data
            const find_camion = CamionModel.find({number: incomming_number})
            if(!find_camion) throw new Error("Camion has beed registed")
            const new_camion = CamionModel.create(data)
            return new_camion;
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
    async edit(params , data) {
        try{
            const old_camion = CamionModel.find({number: params})
            if(!old_camion) {
                const error = new Error("can not find the camion")
                throw error
            } 
            const result = CamionModel.findOneAndUpdate({number:params}, {$set: data})
            console.log(result)
            return result;
        }catch(error){
            throw error;
        }
    }
}
module.exports = new CamionRepository()
