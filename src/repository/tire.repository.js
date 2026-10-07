const Tire = require("../models/tire.model")

class TireRepository {
  findAll() {
    return Tire.find().populate("camion")
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
