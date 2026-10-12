const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    camion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion"
    },
    remorque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remorque"
    },
    // Backward compatibility for existing maintenance records and API clients.
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion"
    },

    type: {
      type: String,
      enum: ["vidange", "revision", "reparation", "pneus", "freins", "autre"],
      required: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    maintenanceDate: {
      type: Date,
      required: true
    },

    mileage: {
      type: Number,
      required: true,
      min: 0
    },

    cost: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["planned", "in_progress", "completed", "cancelled"],
      default: "planned"
    },

    nextMaintenanceDate: {
      type: Date
    },

    nextMaintenanceMileage: {
      type: Number,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

maintenanceSchema.pre("validate", function () {
  if (this.vehicle && !this.camion) this.camion = this.vehicle
  if (this.camion && !this.vehicle) this.vehicle = this.camion

  const hasCamion = Boolean(this.camion)
  const hasRemorque = Boolean(this.remorque)
  if (hasCamion === hasRemorque) {
    this.invalidate("camion", "Select exactly one asset: camion or remorque")
    this.invalidate("remorque", "Select exactly one asset: camion or remorque")
  }
})

maintenanceSchema.index({ camion: 1, status: 1, nextMaintenanceDate: 1 })
maintenanceSchema.index({ remorque: 1, status: 1, nextMaintenanceDate: 1 })

module.exports = mongoose.model("Maintenance", maintenanceSchema);
