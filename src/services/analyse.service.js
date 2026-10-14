const analyseRepository = require("../repository/analyse.repository")

class analyseService{
    counterCamion = async () =>{
        try{
            const counter = await analyseRepository.totalCamions()
            // const counter = {user: "name testing the service"   }
            return counter
        }catch(error){
            console.log(error)
            throw new Error("error in sercive some this in repository")
        }
    }
}

module.exports = new analyseService()