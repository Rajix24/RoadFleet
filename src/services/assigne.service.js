const CamionService = require("./camion.service")
const UserService = require("./user.service")
const remorqueService = require("./remorque.service")
const assigneRepository = require("../repository/assigne.repository")





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

    assign = async (data) => {
        if (new Date(data.plannedArrival) <= new Date(data.plannedDeparture)) {
            const error = new Error("Planned arrival must be after planned departure")
            error.status = 400
            throw error
        }
        return assigneRepository.create(data)
    }

    update = async (data) => {
        // if(data.)
        return data;
    }

}
module.exports = new assigneService()
