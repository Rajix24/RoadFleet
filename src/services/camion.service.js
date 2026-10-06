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
}


module.exports = new CamionService()