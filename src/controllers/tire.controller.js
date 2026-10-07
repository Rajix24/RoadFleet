const TireService = require("../services/tire.service")

class TireController {
  getAll = async (req, res) => {
    try {
      const tires = await TireService.getAll()
      return res.status(200).json({ data: tires })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  getById = async (req, res) => {
    try {
      const tire = await TireService.getById(req.params.id)
      return res.status(200).json({ data: tire })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  create = async (req, res) => {
    try {
      const tire = await TireService.create(req.body)
      return res.status(201).json({ data: tire })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  update = async (req, res) => {
    try {
      const tire = await TireService.update(req.params.id, req.body)
      return res.status(200).json({ data: tire })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  delete = async (req, res) => {
    try {
      await TireService.delete(req.params.id)
      return res.status(200).json({ message: "Tire deleted successfully" })
    } catch (error) {
      return this.sendError(res, error)
    }
  }

  sendError(res, error) {
    const status = error.status || (error.name === "ValidationError" || error.code === 11000 ? 400 : 500)
    return res.status(status).json({ message: error.message })
  }
}

module.exports = new TireController()
