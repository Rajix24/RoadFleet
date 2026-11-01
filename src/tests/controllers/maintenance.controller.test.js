const Controller = require("../../controllers/maintenance.controller")
const Service = require("../../services/maintenance.service")

jest.mock("../../services/maintenance.service", () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  deleteMaintenance: jest.fn()
}))

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
  test("gets a maintenance record by id", async () => {
    const data = { id: "m1" }; Service.getById.mockResolvedValue(data)
    await Controller.getMaintenanceById({ params: { id: "m1" } }, res)
    expect(Service.getById).toHaveBeenCalledWith("m1")
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
  test("updates a maintenance record", async () => {
    const body = { status: "completed" }; const data = { id: "m1", ...body }; Service.update.mockResolvedValue(data)
    await Controller.updateMaintenance({ params: { id: "m1" }, body }, res)
    expect(Service.update).toHaveBeenCalledWith("m1", body)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Maintenance updated successfully", data })
  })
  test("deletes a maintenance record", async () => {
    const data = { id: "m1" }; Service.deleteMaintenance.mockResolvedValue(data)
    await Controller.deleteMaintenance({ params: { id: "m1" } }, res)
    expect(Service.deleteMaintenance).toHaveBeenCalledWith("m1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Maintenance deleted successfully", data })
  })
  test("returns service errors when listing fails", async () => {
    Service.getAll.mockRejectedValue(new Error("failure"))
    await Controller.getAllMaintenance({}, res)
    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith({ message: "error can't get all maintenances", error: "failure" })
  })
  test("returns 404 when a maintenance record is missing", async () => {
    Service.getById.mockRejectedValue(Object.assign(new Error("Maintenance not found"), { status: 404 }))
    await Controller.getMaintenanceById({ params: { id: "missing" } }, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: "Maintenance not found" })
  })
  test("returns 404 when updating a missing maintenance record", async () => {
    Service.update.mockRejectedValue(Object.assign(new Error("Maintenance not found"), { status: 404 }))
    await Controller.updateMaintenance({ params: { id: "missing" }, body: {} }, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: "Maintenance not found" })
  })
  test("returns 404 when deleting a missing maintenance record", async () => {
    Service.deleteMaintenance.mockRejectedValue(Object.assign(new Error("Maintenance not found"), { status: 404 }))
    await Controller.deleteMaintenance({ params: { id: "missing" } }, res)
    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({ message: "Maintenance not found" })
  })
  test("maps validation errors to bad request", async () => {
    Service.create.mockRejectedValue(Object.assign(new Error("invalid"), { name: "ValidationError" }))
    await Controller.createMaintenance({ body: {} }, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: "Could not create maintenance", error: "invalid" })
  })
})
