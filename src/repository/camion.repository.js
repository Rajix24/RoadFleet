const CamionModel = require('../models/camion.model')
// Register the Tire model before Mongoose populates the Camion.tires virtual.
require('../models/tire.model')


class CamionRepository{
    async getAllCamions(){
        try{
            const camions = await CamionModel.find().populate('tires')
            return camions
        }catch(error){
            throw new Error(error)
        }
    }

    async createCamion(data){
        try{
            const {incomming_number} = data
            const find_camion = await CamionModel.find({number: incomming_number})
            if(!find_camion) throw new Error("Camion has beed registed")
            const new_camion = await CamionModel.create(data)
            return new_camion;
        }catch(error){
            console.log(error)
            throw new Error(error)
        }
    }
    async edit(params , data) {
        try{
            const old_camion = await CamionModel.find({number: params})
            if(!old_camion) {
                const error = new Error("can not find the camion")
                throw error
            } 
            const result = await CamionModel.findOneAndUpdate({number:params}, {$set: data})
            console.log(result)
            return result;
        }catch(error){
            throw error;
        }
    }
    async delete(params){
        try{
            const result = await CamionModel.deleteOne({number: params})
            return result;
        }catch(error){
            console.log(error)
            throw error;
        }
    }


    async availble(){
        try{
            const result = await CamionModel.find({vehicleStatus: "available", isArchived: false})
            return result;
        }catch(error){
            console.log(error)
            throw error;
        }
    }
}
module.exports = new CamionRepository()
