const Model = require("../../models/maintenance.model")
const Camion = require("../../models/camion.model")
const Remorque = require("../../models/remorque.model")
const Repository = require("../../repository/maintenance.repository")

jest.mock("../../models/maintenance.model", () => ({ find: jest.fn(), create: jest.fn(), findByIdAndDelete: jest.fn() }))
jest.mock("../../models/camion.model", () => ({ exists: jest.fn(), updateMany: jest.fn() }))
jest.mock("../../models/remorque.model", () => ({ exists: jest.fn(), updateMany: jest.fn() }))

describe("maintenance repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("lists records with camion and remorque populated", async () => {
    const records = []; const query = { populate: jest.fn() }; query.populate.mockReturnValueOnce(query).mockReturnValueOnce(Promise.resolve(records)); Model.find.mockReturnValue(query)
    await expect(Repository.getAll()).resolves.toBe(records)
    expect(query.populate).toHaveBeenNthCalledWith(1, "camion"); expect(query.populate).toHaveBeenNthCalledWith(2, "remorque")
  })
  test("creates maintenance and syncs asset statuses", async () => {
    const data = { camion: "c1", remorque: "r1" }; const result = { id: "m1" }
    Camion.exists.mockResolvedValue({ _id: "c1" }); Remorque.exists.mockResolvedValue({ _id: "r1" }); Model.create.mockResolvedValue(result)
    const activeQuery = { select: jest.fn().mockResolvedValue([]) }; Model.find.mockReturnValue(activeQuery)
    await expect(Repository.create(data)).resolves.toBe(result)
    expect(Camion.exists).toHaveBeenCalledWith({ _id: "c1" }); expect(Remorque.exists).toHaveBeenCalledWith({ _id: "r1" }); expect(Model.create).toHaveBeenCalledWith(data)
  })
  test("rejects creation when camion does not exist", async () => {
    Camion.exists.mockResolvedValue(null)
    await expect(Repository.create({ camion: "missing" })).rejects.toMatchObject({ status: 404, message: "Camion not found" })
    expect(Model.create).not.toHaveBeenCalled()
  })
  test("deletes maintenance by id", async () => { const result = { id: "m1" }; Model.findByIdAndDelete.mockResolvedValue(result); await expect(Repository.delete("m1")).resolves.toBe(result); expect(Model.findByIdAndDelete).toHaveBeenCalledWith("m1") })
  test("syncs maintenance status for assets", async () => {
    const query = { select: jest.fn().mockResolvedValue([{ camion: { toString: () => "c1" }, remorque: { toString: () => "r1" } }]) }
    Model.find.mockReturnValue(query); Camion.updateMany.mockResolvedValue({}); Remorque.updateMany.mockResolvedValue({})
    await expect(Repository.syncAssetStatuses()).resolves.toBeUndefined()
    expect(Camion.updateMany).toHaveBeenCalledWith({ _id: { $in: ["c1"] }, vehicleStatus: { $ne: "out_of_service" } }, { $set: { vehicleStatus: "maintenance" } })
    expect(Remorque.updateMany).toHaveBeenCalledWith({ _id: { $in: ["r1"] }, status: { $ne: "out_of_service" } }, { $set: { status: "maintenance" } })
  })
})
