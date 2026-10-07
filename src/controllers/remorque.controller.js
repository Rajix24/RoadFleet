const RemorqueService = require("../services/remorque.service")

class RemorqueController {
  getAll = async (req, res) => {
    try {
      const remorques = await RemorqueService.getAll()
      return res.status(200).json({ data: remorques })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  getById = async (req, res) => {
    try {
      const remorque = await RemorqueService.getById(req.params.id)
      return res.status(200).json({ data: remorque })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  create = async (req, res) => {
    try {
      const remorque = await RemorqueService.create(req.body)
      return res.status(201).json({ data: remorque })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  update = async (req, res) => {
    try {
      const remorque = await RemorqueService.update(req.params.id, req.body)
      return res.status(200).json({ data: remorque })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  delete = async (req, res) => {
    try {
      await RemorqueService.delete(req.params.id)
      return res.status(200).json({ message: "Remorque deleted successfully" })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  sendError(res, error) {
    const status = error.status || (error.name === "ValidationError" || error.code === 11000 ? 400 : 500)
    return res.status(status).json({ message: error.message })
  }
}

module.exports = new RemorqueController()
