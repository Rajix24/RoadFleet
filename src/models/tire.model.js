const mongoose = require("mongoose")

const tireSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, required: true, unique: true, trim: true },
    brand: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    position: { type: String, required: true, trim: true },
    currentMileage: { type: Number, required: true, min: 0 },
    mileageThreshold: { type: Number, min: 0, default: 80000 },
    treadDepthMm: { type: Number, required: true, min: 0 },
    isArchived: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["in_stock", "mounted", "worn", "retired", "remplace"],
      default: "in_stock",
    required: true
    },
    DateOfDeath: {type: Date, required:true},
    purchaseDate: { type: Date, required: true },
    price: { type: Number, min: 0 },
    camion: { type: mongoose.Schema.Types.ObjectId, ref: "Camion", default: null }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Tire", tireSchema)
