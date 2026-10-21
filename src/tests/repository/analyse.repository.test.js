const Model = require("../../models/camion.model")
const Repository = require("../../repository/analyse.repository")
jest.mock("../../models/camion.model", () => ({ countDocuments: jest.fn(), aggregate: jest.fn() }))

describe("analyse repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("wraps an error raised while preparing the camion analysis", async () => {
    await expect(Repository.totalCamions()).rejects.toThrow("error in the repository")
    expect(Model.countDocuments).toHaveBeenCalledWith()
  })
})
