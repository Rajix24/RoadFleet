const Tire = require("../models/tire.model")

class TireRepository {
  findAll() {
    return Tire.find().populate("camion")
  }

  getHealthMatrix() {
    return Tire.aggregate([
      {
        $match: {
          isArchived: { $ne: true },
          status: { $ne: "remplace" },
          position: { $type: "string", $ne: "" },
          currentMileage: { $type: "number", $gte: 0 },
          treadDepthMm: { $type: "number", $gte: 0 }
        }
      },
      {
        $addFields: {
          remainingKm: {
            $max: [0, { $subtract: [{ $ifNull: ["$mileageThreshold", 80000] }, "$currentMileage"] }]
          }
        }
      },
      {
        $addFields: {
          isCritical: {
            $or: [
              { $lt: ["$remainingKm", 5000] },
              { $lte: ["$treadDepthMm", 3] }
            ]
          }
        }
      },
      {
        $group: {
          _id: "$position",
          tireCount: { $sum: 1 },
          averageMileageKm: { $avg: "$currentMileage" },
          criticalTireCount: { $sum: { $cond: ["$isCritical", 1, 0] } },
          estimatedBudgetMAD: { $sum: { $cond: ["$isCritical", 3800, 0] } }
        }
      }
    ])
  }

  findById(id) {
    return Tire.findById(id).populate("camion")
  }

  create(data) {
    return Tire.create(data)
  }

  update(id, data) {
    return Tire.findByIdAndUpdate(id, { $set: data }, {
      new: true,
      runValidators: true
    }).populate("camion")
  }

  delete(id) {
    return Tire.findByIdAndDelete(id)
  }
}

module.exports = new TireRepository()
