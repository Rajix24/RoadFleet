const maintenanceModel = require("../models/maintenance.model")
const Camion = require("../models/camion.model")
const Remorque = require("../models/remorque.model")


class maintenanceRepository{
    async getAll(){
        try{
            const maintenance = await maintenanceModel.find().populate("camion").populate("remorque")
            return maintenance
        }catch(error){
            console.log(error)
            throw error
        }
    }
    async create(data){
        try{
            const camionId = data.camion || data.vehicle
            if (camionId && !await Camion.exists({ _id: camionId })) {
                const error = new Error("Camion not found")
                error.status = 404
                throw error
            }
            if (data.remorque && !await Remorque.exists({ _id: data.remorque })) {
                const error = new Error("Remorque not found")
                error.status = 404
                throw error
            }

            const maintenance = await maintenanceModel.create(data)
            await this.syncAssetStatuses()
            return maintenance
        }catch(error){
            console.log(error)
            throw error
        }
    }

    async syncAssetStatuses(){
        const now = new Date()
        const activeMaintenances = await maintenanceModel.find({
            $or: [
                { status: "in_progress" },
                { status: "planned", maintenanceDate: { $lte: now } },
                { status: "completed", nextMaintenanceDate: { $lte: now } }
            ]
        }).select("camion remorque vehicle")

        const camionIds = [...new Set(activeMaintenances
            .map(item => item.camion || item.vehicle)
            .filter(Boolean)
            .map(id => id.toString()))]
        const remorqueIds = [...new Set(activeMaintenances
            .map(item => item.remorque)
            .filter(Boolean)
            .map(id => id.toString()))]

        const updates = []
        if (camionIds.length) {
            updates.push(Camion.updateMany(
                { _id: { $in: camionIds }, vehicleStatus: { $ne: "out_of_service" } },
                { $set: { vehicleStatus: "maintenance" } }
            ))
        }
        if (remorqueIds.length) {
            updates.push(Remorque.updateMany(
                { _id: { $in: remorqueIds }, status: { $ne: "out_of_service" } },
                { $set: { status: "maintenance" } }
            ))
        }
        await Promise.all(updates)
    }
    async delete(params_id){
        try{
            const maintenance = await maintenanceModel.findByIdAndDelete(params_id)
            return maintenance
        }catch(error){
            console.log(error)
            throw error
        }
    }
}

module.exports = new maintenanceRepository()
