const Model = require("../../models/trajet.model")
const Repository = require("../../repository/tarjet.repository")
jest.mock("../../models/trajet.model", () => ({ create: jest.fn(), find: jest.fn() }))

describe("trajet repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("creates a trajet", async () => { const data = { distance: 20 }; Model.create.mockResolvedValue(data); await expect(Repository.createTrajet(data)).resolves.toBe(data); expect(Model.create).toHaveBeenCalledWith(data) })
  test("lists trajets with related records populated", async () => {
    const records = [{ id: "t1" }]
    const query = { populate: jest.fn() }
    query.populate.mockReturnValueOnce(query).mockReturnValueOnce(query).mockReturnValueOnce(Promise.resolve(records))
    Model.find.mockReturnValue(query)
    await expect(Repository.getAllTrajets()).resolves.toBe(records)
    expect(Model.find).toHaveBeenCalledWith()
    expect(query.populate).toHaveBeenNthCalledWith(1, "chauffeur", "first_name last_name email")
    expect(query.populate).toHaveBeenNthCalledWith(2, "camion")
    expect(query.populate).toHaveBeenNthCalledWith(3, "remorque")
  })
})
