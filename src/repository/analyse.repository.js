// const camionModel = require("../models/camion.model")
const CamionModel = require("../models/camion.model")

class analyseRepository{
    totalCamions = async () => {

        //TODO: I NEED GET TOTAL OF CONSOMATION OF ONE USER THAT PASS THE TRAJET



        
        //TODO: I NEED TO GET TOTAL OF DISTANCE THAT ONE USER HAS  


        
        try{
            const totalConsommation =  CamionModel.countDocuments()
            // const model = CamionModel.aggregate([{$match: {vehicleStatus: "in_use"}}])
            const analyseConsommation = trajetModel.aggregate([ {
                $match:{
                    status: "termine",
                    distance: { $gt: 0 },
                    gasoilVolume: { $gt: 0 },
                    chauffeur:{ $exists: true}
                } 
            },
            {   
                $group: {
                    _id: "$chauffeur",
                    totalDistance: { $sum: "$distance" },
                    totalGasoilVolume: { $sum: "$gasoilVolume" }
                }
            },
            {
                $project: {
                    _id: "$chauffeur",
                    totalGasoilVolume: 1,
                    totalDistance: 1,
                    cosummationMoyenne:  {
                        $multiply: [
                            { $divide: ["$totalGasoilVolume", "$totalDistance"] },
                            100
                        ]
                    }
                    // ecoScore: {
                }
            },


        ])
           
            const model = CamionModel.aggregate
            return model 
        }catch(error){
            console.log(error)
            throw new Error("error in the repository")
            
        }
        
    }

    
}

module.exports = new analyseRepository()
