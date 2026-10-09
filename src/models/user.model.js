const mongo = require("mongoose")


const userSchema = new mongo.Schema({
     first_name:{
        type: String,
        required: true,
        trim: true
     },
      last_name:{
        type: String,
        required: true,
        trim: true
     },
     email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
     },

     password:{
        type: String,
        required: true
     },
     role:{
      type: String,
      enum: {
         values: ["admin", "chauffeur"],
         message: "{VALUE} is not valid role"
      },
      default: "chauffeur"
     },
     isActive: {
      type: Boolean,
      default: false
     }}, 
      {
         timestamps: true
      }
   )


module.exports = mongo.model("Users", userSchema)