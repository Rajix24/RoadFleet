const assigneService = require("../services/assigne.service")

class AssigneController {
  register = async (req, res) => {
    try {
      const trajet = await assigneService.assign(req.body)
      return res.status(201).json({
        message: "Assignment created successfully",
        data: trajet
      })
    } catch (error) {
      return res.status(error.status || 500).json({
        message: "Could not create assignment",
        error: error.message
      })
    }
  }

  updateTrajet = async (req, res) => {
    try{
      const trajet = await assigneService.update(req.body)
      return res.status(201).json({
        message: "trajet has been updated",
        data: trajet
      })
    }catch(error){
      console.log(error)
      throw new Error("Error in application updating the trajet")
    }
  }
}

module.exports = new AssigneController()
