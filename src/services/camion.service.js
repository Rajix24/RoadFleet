const CamionRepository = require('../repository/camion.repository')

class CamionService {


    async getAllCamions(){
        try{
            const camions =  await CamionRepository.getAllCamions()
            return camions;

        }catch(error){
            throw new Error(error)
        }
    }
    async saveCamion(data){
        try{    

            const result = await CamionRepository.createCamion(data)
            if(result.status == 401) 
            throw new Error("some problem in registing the camion ")
            return result;
        }catch(error){
            console.log(error)
            error.message = "camion has been registed";
            throw error
        }
    }
    async editCamion(params, data) {
        try{
            const result = await CamionRepository.edit(params, data)
            return result; 
        }catch(error){
            error.message = "errro in service"
            throw error;
        }
    }
    async deleteCamion(params){
        try{
            const result = await CamionRepository.delete(params)
            return result;
        }catch(error){
            console.log(error)
            throw new Error(error) 
        }
    }
    availbleCamions = async (req, res)=>{
        try{
            const availbleCamion = await CamionRepository.availble()
            return availbleCamion
        }catch(error){
            console.log(error)
            throw error
        }
    }
}


module.exports = new CamionService()