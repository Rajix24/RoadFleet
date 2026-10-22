const Controller = require("../../controllers/analyse.controller")
const Service = require("../../services/analyse.service")

jest.mock("../../services/analyse.service", () => ({ counterCamion: jest.fn() }))

describe("analyse controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; jest.clearAllMocks() })
  test("returns camion analysis", async () => {
    Service.counterCamion.mockResolvedValue(12)
    await Controller.eco_performance({}, res)
    expect(Service.counterCamion).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "count camion", count: 12 })
  })
  test("handles analysis errors", async () => {
    const error = new Error("failure"); Service.counterCamion.mockRejectedValue(error)
    await Controller.eco_performance({}, res)
    expect(res.status).toHaveBeenCalledWith(300)
    expect(res.json).toHaveBeenCalledWith({ message: error, data: error })
  })
})
