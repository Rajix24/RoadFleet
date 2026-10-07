const mongoose = require("mongoose")

const remorqueSchema = new mongoose.Schema(
  {
    registrationNumber: { type: String, required: true, unique: true, trim: true },
    brand: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["available", "in_use", "maintenance", "out_of_service"],
      default: "available",
      required: true
    },
    acquisitionDate: { type: Date, required: true },
    camion: { type: mongoose.Schema.Types.ObjectId, ref: "Camion", default: null }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Remorque", remorqueSchema)
