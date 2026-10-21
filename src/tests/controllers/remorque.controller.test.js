const Controller = require("../../controllers/remorque.controller")
const Service = require("../../services/remorque.service")

jest.mock("../../services/remorque.service", () => ({
  getAll: jest.fn(), getById: jest.fn(), create: jest.fn(), update: jest.fn(), delete: jest.fn()
}))

describe("remorque controller", () => {
  let req
  let res
  const item = { id: "r1", number: "R-1" }
  beforeEach(() => {
    req = {}
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() }
    jest.clearAllMocks()
  })
  test("getAll returns all items", async () => {
    Service.getAll.mockResolvedValue([item])
    await Controller.getAll(req, res)
    expect(Service.getAll).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: [item] })
  })
  test("getById returns item", async () => {
    req.params = { id: "r1" }; Service.getById.mockResolvedValue(item)
    await Controller.getById(req, res)
    expect(Service.getById).toHaveBeenCalledWith("r1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: item })
  })
  test("create creates item", async () => {
    req.body = item; Service.create.mockResolvedValue(item)
    await Controller.create(req, res)
    expect(Service.create).toHaveBeenCalledWith(item)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ data: item })
  })
  test("update updates item", async () => {
    req.params = { id: "r1" }; req.body = { number: "R-2" }; Service.update.mockResolvedValue(item)
    await Controller.update(req, res)
    expect(Service.update).toHaveBeenCalledWith("r1", req.body)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ data: item })
  })
  test("delete deletes item", async () => {
    req.params = { id: "r1" }; Service.delete.mockResolvedValue(item)
    await Controller.delete(req, res)
    expect(Service.delete).toHaveBeenCalledWith("r1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Remorque deleted successfully" })
  })
  test("returns service errors", async () => {
    Service.getAll.mockRejectedValue(Object.assign(new Error("failure"), { status: 503 }))
    await Controller.getAll(req, res)
    expect(res.status).toHaveBeenCalledWith(503)
    expect(res.json).toHaveBeenCalledWith({ message: "failure" })
  })
})
