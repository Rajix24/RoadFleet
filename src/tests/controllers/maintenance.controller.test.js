const Controller = require("../../controllers/maintenance.controller")
const Service = require("../../services/maintenance.service")

jest.mock("../../services/maintenance.service", () => ({ getAll: jest.fn(), create: jest.fn(), deleteMaintenance: jest.fn() }))

describe("maintenance controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; jest.clearAllMocks() })
  test("lists maintenance records", async () => {
    const data = [{ id: "m1" }]; Service.getAll.mockResolvedValue(data)
    await Controller.getAllMaintenance({}, res)
    expect(Service.getAll).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "operation done", data })
  })
  test("creates a maintenance record", async () => {
    const body = { reason: "service" }; Service.create.mockResolvedValue({ id: "m1", ...body })
    await Controller.createMaintenance({ body }, res)
    expect(Service.create).toHaveBeenCalledWith(body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: "operation is done", data: { id: "m1", ...body } })
  })
  test("returns service errors when listing fails", async () => {
    Service.getAll.mockRejectedValue(new Error("failure"))
    await Controller.getAllMaintenance({}, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: "error can't get all maintenances", error: "failure" })
  })
})
