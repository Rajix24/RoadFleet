const TireRepository = require("../repository/tire.repository")

class TireService {
  getAll() {
    return TireRepository.findAll()
  }

  async getById(id) {
    const tire = await TireRepository.findById(id)
    if (!tire) {
      const error = new Error("Tire not found")
      error.status = 404
      throw error
    }
    return tire
  }

  create(data) {
    return TireRepository.create(data)
  }

  async update(id, data) {
    const tire = await TireRepository.update(id, data)
    if (!tire) {
      const error = new Error("Tire not found")
      error.status = 404
      throw error
    }
    return tire
  }

  async delete(id) {
    const tire = await TireRepository.delete(id)
    if (!tire) {
      const error = new Error("Tire not found")
      error.status = 404
      throw error
    }
    return tire
  }
}

module.exports = new TireService()
