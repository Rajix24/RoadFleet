const Model = require("../../models/tire.model")
const Repository = require("../../repository/tire.repository")
jest.mock("../../models/tire.model", () => ({ find: jest.fn(), findById: jest.fn(), create: jest.fn(), findByIdAndUpdate: jest.fn(), findByIdAndDelete: jest.fn() }))

describe("tire repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("lists tires with camion populated", async () => { const result = []; const query = { populate: jest.fn().mockResolvedValue(result) }; Model.find.mockReturnValue(query); await expect(Repository.findAll()).resolves.toBe(result); expect(query.populate).toHaveBeenCalledWith("camion") })
  test("finds tire by id with camion populated", async () => { const tire = { id: "t1" }; const query = { populate: jest.fn().mockResolvedValue(tire) }; Model.findById.mockReturnValue(query); await expect(Repository.findById("t1")).resolves.toBe(tire); expect(Model.findById).toHaveBeenCalledWith("t1"); expect(query.populate).toHaveBeenCalledWith("camion") })
  test("creates tire", async () => { const data = { brand: "A" }; Model.create.mockResolvedValue(data); await expect(Repository.create(data)).resolves.toBe(data); expect(Model.create).toHaveBeenCalledWith(data) })
  test("updates tire and populates camion", async () => { const tire = { id: "t1" }; const query = { populate: jest.fn().mockResolvedValue(tire) }; Model.findByIdAndUpdate.mockReturnValue(query); await expect(Repository.update("t1", { brand: "B" })).resolves.toBe(tire); expect(Model.findByIdAndUpdate).toHaveBeenCalledWith("t1", { $set: { brand: "B" } }, { new: true, runValidators: true }); expect(query.populate).toHaveBeenCalledWith("camion") })
  test("deletes tire", async () => { const tire = { id: "t1" }; Model.findByIdAndDelete.mockResolvedValue(tire); await expect(Repository.delete("t1")).resolves.toBe(tire); expect(Model.findByIdAndDelete).toHaveBeenCalledWith("t1") })
})
