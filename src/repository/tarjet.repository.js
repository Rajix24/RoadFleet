const Trajet = require("../models/trajet.model");

class TrajetRepository{

    async createTrajet(data) {
        return Trajet.create(data)
    }


    async getAllTrajets(){
        try{
            const trajets = await Trajet.find()
                .populate("chauffeur", "first_name last_name email")
                .populate("camion")
                .populate("remorque")
            return trajets;
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

module.exports = new TrajetRepository()
