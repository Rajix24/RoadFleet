const Controller = require("../../controllers/assigne.controller")
const Service = require("../../services/assigne.service")

jest.mock("../../services/assigne.service", () => ({ assign: jest.fn(), update: jest.fn() }))

describe("assigne controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; jest.clearAllMocks() })
  test("creates an assignment", async () => {
    const body = { chauffeur: "u1", camion: "c1" }; const data = { id: "a1" }; Service.assign.mockResolvedValue(data)
    await Controller.register({ body }, res)
    expect(Service.assign).toHaveBeenCalledWith(body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: "Assignment created successfully", data })
  })
  test("updates an assignment", async () => {
    const body = { status: "done" }; Service.update.mockResolvedValue(body)
    await Controller.updateTrajet({ body }, res)
    expect(Service.update).toHaveBeenCalledWith(body)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: "trajet has been updated", data: body })
  })
  test("returns assignment errors with service status", async () => {
    Service.assign.mockRejectedValue(Object.assign(new Error("unavailable"), { status: 409 }))
    await Controller.register({ body: {} }, res)
    expect(res.status).toHaveBeenCalledWith(409)
    expect(res.json).toHaveBeenCalledWith({ message: "Could not create assignment", error: "unavailable" })
  })
})
