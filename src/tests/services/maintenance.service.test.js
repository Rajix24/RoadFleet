const Service = require("../../services/maintenance.service")
const Repository = require("../../repository/maintenance.repository")
jest.mock("../../repository/maintenance.repository", () => ({
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}))

describe("maintenance service", () => {
  beforeEach(() => jest.clearAllMocks())
  test("gets all maintenance records", async () => {
    Repository.getAll.mockResolvedValue([])
    await expect(Service.getAll()).resolves.toEqual([])
    expect(Repository.getAll).toHaveBeenCalledWith()
  })
  test("gets a maintenance record by id", async () => {
    const value = { id: "m1" }
    Repository.getById.mockResolvedValue(value)
    await expect(Service.getById("m1")).resolves.toBe(value)
    expect(Repository.getById).toHaveBeenCalledWith("m1")
  })
  test("throws 404 when a maintenance record is missing", async () => {
    Repository.getById.mockResolvedValue(null)
    await expect(Service.getById("missing")).rejects.toMatchObject({ status: 404, message: "Maintenance not found" })
  })
  test("creates a maintenance record", async () => {
    const data = { reason: "service" }
    Repository.create.mockResolvedValue(data)
    await expect(Service.create(data)).resolves.toBe(data)
    expect(Repository.create).toHaveBeenCalledWith(data)
  })
  test("updates a maintenance record", async () => {
    const value = { id: "m1", status: "completed" }
    Repository.update.mockResolvedValue(value)
    await expect(Service.update("m1", { status: "completed" })).resolves.toBe(value)
    expect(Repository.update).toHaveBeenCalledWith("m1", { status: "completed" })
  })
  test("throws 404 when updating a missing maintenance record", async () => {
    Repository.update.mockResolvedValue(null)
    await expect(Service.update("missing", {})).rejects.toMatchObject({ status: 404, message: "Maintenance not found" })
  })
  test("deletes a maintenance record", async () => {
    const value = { id: "m1" }
    Repository.delete.mockResolvedValue(value)
    await expect(Service.deleteMaintenance("m1")).resolves.toBe(value)
    expect(Repository.delete).toHaveBeenCalledWith("m1")
  })
  test("deletes a maintenance record through the alias", async () => {
    const value = { id: "m1" }
    Repository.delete.mockResolvedValue(value)
    await expect(Service.delete("m1")).resolves.toBe(value)
    expect(Repository.delete).toHaveBeenCalledWith("m1")
  })
  test("throws 404 when deleting a missing maintenance record", async () => {
    Repository.delete.mockResolvedValue(null)
    await expect(Service.deleteMaintenance("missing")).rejects.toMatchObject({ status: 404, message: "Maintenance not found" })
  })
  test("propagates repository errors", async () => {
    Repository.create.mockRejectedValue(new Error("failure"))
    await expect(Service.create({})).rejects.toThrow("failure")
  })
})
