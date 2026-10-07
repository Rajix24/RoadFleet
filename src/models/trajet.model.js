const mongoose = require("mongoose")

const trajetSchema = new mongoose.Schema(
  {
    departureSite: {
      type: String,
      required: true,
      trim: true
    },
    arrivalSite: {
      type: String,
      required: true,
      trim: true
    },
    merchandise: {
      type: String,
      required: true,
      trim: true
    },
    plannedDeparture: {
      type: Date,
      required: true
    },
    plannedArrival: {
      type: Date,
      required: true
    },
    chauffeur: {
      type: mongoose.Schema.Types.ObjectId,
      // The registered model is named "Users" in src/models/user.model.js.
      ref: "Users",
      required: true
    },
    camion: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Camion",
      required: true
    },
    remorque: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Remorque",
      required: true
    },
    status: {
      type: String,
      enum: ["a_faire", "en_cours", "termine"],
      default: "a_faire"
    },
    kilometrageDepart: {
      type: Number,
      min: 0
    },
    kilometrageArrivee: {
      type: Number,
      min: 0
    },
    distance: {
      type: Number,
      min: 0
    },
    gasoilVolume: {
      type: Number,
      min: 0
    },
    consommationMoyenne: {
      type: Number,
      min: 0
    },
    remarque: {
      type: String,
      trim: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Trajet", trajetSchema)
