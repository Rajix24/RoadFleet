const Controller = require("../../controllers/trajet.controller")
const Service = require("../../services/trajet.service")

jest.mock("../../services/trajet.service", () => ({ getAllTrajets: jest.fn(), registerTrajet: jest.fn() }))

describe("trajet controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; jest.clearAllMocks() })
  test("lists trajets", async () => {
    const data = [{ id: "t1" }]; Service.getAllTrajets.mockResolvedValue(data)
    await Controller.trajets({}, res)
    expect(Service.getAllTrajets).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "seccussful operation", data })
  })
  test("registers a trajet", async () => {
    const body = { distance: 50 }; const data = { id: "t1", ...body }; Service.registerTrajet.mockResolvedValue(data)
    await Controller.register({ body }, res)
    expect(Service.registerTrajet).toHaveBeenCalledWith(body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: "Trajet created successfully", data })
  })
  test("returns an error when listing fails", async () => {
    Service.getAllTrajets.mockRejectedValue(new Error("failure"))
    await Controller.trajets({}, res)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: "bad request", error: "failure" })
  })
})
