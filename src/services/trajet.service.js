const TrajetRepository = require("../repository/tarjet.repository")


class trajetService{

    async getAllTrajets(){
        try{
            const trajets =  await TrajetRepository.getAllTrajets()
            return trajets;

        }catch(error){
            console.log(error)
            throw error
        }
    }

    async registerTrajet(data){
        try{
            return await TrajetRepository.createTrajet(data)
        }catch(error){
            throw error
        }
    }
}


module.exports = new trajetService()
