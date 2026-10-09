const mongoose = require("mongoose");

const maintenanceSchema = new mongoose.Schema(
  {
    vehicle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion",
      required: true
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

module.exports = mongoose.model("Maintenance", maintenanceSchema);