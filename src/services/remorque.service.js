const RemorqueRepository = require("../repository/remorque.repository")

class RemorqueService {
  getAll() {
    return RemorqueRepository.findAll()
  }

  async getById(id) {
    const remorque = await RemorqueRepository.findById(id)
    if (!remorque) {
      const error = new Error("Remorque not found")
      error.status = 404
      throw error
    }
    return remorque
  }

  create(data) {
    return RemorqueRepository.create(data)
  }

  async update(id, data) {
    const remorque = await RemorqueRepository.update(id, data)
    if (!remorque) {
      const error = new Error("Remorque not found")
      error.status = 404
      throw error
    }
    return remorque
  }

  async delete(id) {
    const remorque = await RemorqueRepository.delete(id)
    if (!remorque) {
      const error = new Error("Remorque not found")
      error.status = 404
      throw error
    }
    return remorque
  }
}

module.exports = new RemorqueService()
