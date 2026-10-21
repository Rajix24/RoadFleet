const Model = require("../../models/camion.model")
const MaintenanceRepository = require("../../repository/maintenance.repository")
const Repository = require("../../repository/camion.repository")

jest.mock("../../models/camion.model", () => ({ find: jest.fn(), create: jest.fn(), findOneAndUpdate: jest.fn(), deleteOne: jest.fn() }))
jest.mock("../../models/tire.model", () => ({}))
jest.mock("../../repository/maintenance.repository", () => ({ syncAssetStatuses: jest.fn() }))

describe("camion repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("gets camions with tires populated", async () => {
    const records = [{ number: "1001" }]; const query = { populate: jest.fn().mockResolvedValue(records) }; Model.find.mockReturnValue(query)
    await expect(Repository.getAllCamions()).resolves.toBe(records)
    expect(Model.find).toHaveBeenCalledWith(); expect(query.populate).toHaveBeenCalledWith("tires")
  })
  test("creates a camion", async () => { const data = { number: "1001" }; Model.find.mockResolvedValue([]); Model.create.mockResolvedValue(data); await expect(Repository.createCamion(data)).resolves.toBe(data); expect(Model.create).toHaveBeenCalledWith(data) })
  test("updates by number", async () => { const value = { number: "1001" }; Model.find.mockResolvedValue([value]); Model.findOneAndUpdate.mockResolvedValue(value); await expect(Repository.edit("1001", { brand: "A" })).resolves.toBe(value); expect(Model.findOneAndUpdate).toHaveBeenCalledWith({ number: "1001" }, { $set: { brand: "A" } }) })
  test("deletes by number", async () => { const result = { deletedCount: 1 }; Model.deleteOne.mockResolvedValue(result); await expect(Repository.delete("1001")).resolves.toBe(result); expect(Model.deleteOne).toHaveBeenCalledWith({ number: "1001" }) })
  test("syncs statuses before getting available camions", async () => { const records = [{ number: "1001" }]; Model.find.mockResolvedValue(records); await expect(Repository.availble()).resolves.toBe(records); expect(MaintenanceRepository.syncAssetStatuses).toHaveBeenCalledWith(); expect(Model.find).toHaveBeenCalledWith({ vehicleStatus: "available", isArchived: false }) })
})
