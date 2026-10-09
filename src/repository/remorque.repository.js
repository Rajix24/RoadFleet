const Remorque = require("../models/remorque.model")

class RemorqueRepository {
  findAll() {
    return Remorque.find().populate("camion")
  }

  findById(id) {
    return Remorque.findById(id).populate("camion")
  }

  create(data) {
    return Remorque.create(data)
  }

  update(id, data) {
    return Remorque.findByIdAndUpdate(id, { $set: data }, {
      new: true,
      runValidators: true
    }).populate("camion")
  }

    delete(id) {
      return Remorque.findByIdAndDelete(id)
    }

  avaibleRemorque(){
    return Remorque.find({status: "available"})
  }
}

module.exports = new RemorqueRepository()
