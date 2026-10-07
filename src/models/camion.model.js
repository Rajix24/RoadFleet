const mongo = require("mongoose")

const CamionSchema = new mongo.Schema(
    {
    number:{
        type:String,
        required: true,
        unique: true,
        trim: true 

    },
    brand: {
      type: String,
      required: true,
      trim: true
    },

    model: {
      type: String,
      required: true,
      trim: true
    },

    vehicleStatus: {
      type: String,
      enum: ["available", "in_use", "maintenance", "out_of_service"],
      default: "available",
      required: true
    },

    acquisitionDate: {
      type: Date,
      required: true
    },

    isArchived: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
)

CamionSchema.virtual("tires", {
  ref: "Tire",
  localField: "_id",
  foreignField: "camion"
})

module.exports = new mongo.model("Camion", CamionSchema)
