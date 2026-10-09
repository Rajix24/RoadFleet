const CamionService = require("./camion.service")
const UserService = require("./user.service")
const remorqueService = require("./remorque.service")





class assigneService{

    getAssigne = async (req, res) =>{
        const availablechauffeur = await UserService.available()
        const availableCamion = await CamionService.availbleCamions()
        const availableRemorque = await remorqueService.avaible()
        const available = [availablechauffeur, availableCamion, availableRemorque]
        res.status(200).json({
            message: "all available camions and remorque chauffeur",
            data: available
        })
    }

    AssigneChauffeur = async (req, res){

    }

}
module.exports = new assigneService()