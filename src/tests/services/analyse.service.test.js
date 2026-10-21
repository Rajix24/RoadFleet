const Service = require("../../services/analyse.service")
const Repository = require("../../repository/analyse.repository")
jest.mock("../../repository/analyse.repository", () => ({ totalCamions: jest.fn() }))

describe("analyse service", () => {
  beforeEach(() => jest.clearAllMocks())

  test("returns camion analysis", async () => { 
    Repository.totalCamions.mockResolvedValue(10);
    await expect(Service.counterCamion()).resolves.toBe(10);
     expect(Repository.totalCamions).toHaveBeenCalledWith()
   })

  test("wraps repository failures", async () => { Repository.totalCamions.mockRejectedValue(new Error("failure"));
     await expect(Service.counterCamion()).rejects.toThrow("error in sercive some this in repository")
   })
})
