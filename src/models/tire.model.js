const mongoose = require("mongoose")

const tireSchema = new mongoose.Schema(
  {
    serialNumber: { type: String, required: true, unique: true, trim: true },
    brand: { type: String, required: true, trim: true },
    size: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ["in_stock", "mounted", "worn", "retired"],
      default: "in_stock",
      required: true
    },
    purchaseDate: { type: Date, required: true },
    price: { type: Number, min: 0 },
    camion: { type: mongoose.Schema.Types.ObjectId, ref: "Camion", default: null }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Tire", tireSchema)
