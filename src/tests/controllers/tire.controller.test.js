const TireController = require("../../controllers/tire.controller")
const TireService = require("../../services/tire.service")

jest.mock("../../services/tire.service", () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn()
}))

describe("tire controller tests", () => {
  let req
  let res

  const fakeTires = [
    { id: "tire-1", brand: "Michelin", size: "315/80R22.5" },
    { id: "tire-2", brand: "Bridgestone", size: "315/80R22.5" }
  ]
  const fakeTire = fakeTires[0]

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }
    jest.clearAllMocks()
  })

  test("getAll returns all tires", async () => {
    TireService.getAll.mockResolvedValue(fakeTires)

    await TireController.getAll(req, res)

    expect(TireService.getAll).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: fakeTires })
  })

  test("getById returns the requested tire", async () => {
    req.params = { id: "tire-1" }
    TireService.getById.mockResolvedValue(fakeTire)

    await TireController.getById(req, res)

    expect(TireService.getById).toHaveBeenCalledWith("tire-1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: fakeTire })
  })

  test("create creates a tire", async () => {
    req.body = { brand: "Michelin", size: "315/80R22.5" }
    TireService.create.mockResolvedValue(fakeTire)

    await TireController.create(req, res)

    expect(TireService.create).toHaveBeenCalledWith(req.body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ data: fakeTire })
  })

  test("update updates the requested tire", async () => {
    req.params = { id: "tire-1" }
    req.body = { brand: "Continental" }
    const updatedTire = { ...fakeTire, brand: "Continental" }
    TireService.update.mockResolvedValue(updatedTire)

    await TireController.update(req, res)

    expect(TireService.update).toHaveBeenCalledWith("tire-1", req.body)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: updatedTire })
  })

  test("delete deletes the requested tire", async () => {
    req.params = { id: "tire-1" }
    TireService.delete.mockResolvedValue(fakeTire)

    await TireController.delete(req, res)

    expect(TireService.delete).toHaveBeenCalledWith("tire-1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Tire deleted successfully" })
  })

  test("controller methods return service errors using the error status", async () => {
    req.params = { id: "missing-tire" }
    const error = Object.assign(new Error("Tire not found"), { status: 404 })
    TireService.getById.mockRejectedValue(error)

    await TireController.getById(req, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: "Tire not found" })
  })

  test("sendError uses 400 for validation errors", () => {
    const error = Object.assign(new Error("Invalid tire data"), { name: "ValidationError" })

    TireController.sendError(res, error)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: "Invalid tire data" })
  })
})
