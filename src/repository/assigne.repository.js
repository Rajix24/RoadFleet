const User = require("../models/user.model")
const Camion = require("../models/camion.model")
const Remorque = require("../models/remorque.model")
const Trajet = require("../models/trajet.model")
const MaintenanceRepository = require("./maintenance.repository")

class AssigneRepository {
  async create(data) {
    const claimed = { chauffeur: false, camion: false, remorque: false }
    try {
      await MaintenanceRepository.syncAssetStatuses()

      const chauffeur = await User.findOneAndUpdate(
        { _id: data.chauffeur, role: "chauffeur", isActive: false },
        { $set: { isActive: true } },
        { new: true }
      )
      if (!chauffeur) throw this.unavailable("Chauffeur")
      claimed.chauffeur = true

      const camion = await Camion.findOneAndUpdate(
        { _id: data.camion, vehicleStatus: "available", isArchived: false },
        { $set: { vehicleStatus: "in_use" } },
        { new: true }
      )
      if (!camion) throw this.unavailable("Camion")
      claimed.camion = true

      const remorque = await Remorque.findOneAndUpdate(
        { _id: data.remorque, status: "available" },
        { $set: { status: "in_use" } },
        { new: true }
      )
      if (!remorque) throw this.unavailable("Remorque")
      claimed.remorque = true

      const trajet = await Trajet.create(data)
      console.log(trajet.camion.consommation)
      
      return trajet.populate([
        { path: "chauffeur", select: "first_name last_name email role" },
        { path: "camion" },
        { path: "remorque" }
      ])
    } catch (error) {
      const rollback = []
      if (claimed.chauffeur) rollback.push(User.updateOne({ _id: data.chauffeur }, { $set: { isActive: false } }))
      if (claimed.camion) rollback.push(Camion.updateOne({ _id: data.camion, vehicleStatus: "in_use" }, { $set: { vehicleStatus: "available" } }))
      if (claimed.remorque) rollback.push(Remorque.updateOne({ _id: data.remorque, status: "in_use" }, { $set: { status: "available" } }))
      await Promise.all(rollback)
      throw error
    }
  }

  unavailable(resource) {
    const error = new Error(`${resource} does not exist or is not available`)
    error.status = 409
    return error
  }
}

module.exports = new AssigneRepository()
