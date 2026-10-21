const User = require("../../models/user.model")
const Camion = require("../../models/camion.model")
const Remorque = require("../../models/remorque.model")
const Trajet = require("../../models/trajet.model")
const MaintenanceRepository = require("../../repository/maintenance.repository")
const Repository = require("../../repository/assigne.repository")

jest.mock("../../models/user.model", () => ({ findOneAndUpdate: jest.fn(), updateOne: jest.fn() }))
jest.mock("../../models/camion.model", () => ({ findOneAndUpdate: jest.fn(), updateOne: jest.fn() }))
jest.mock("../../models/remorque.model", () => ({ findOneAndUpdate: jest.fn(), updateOne: jest.fn() }))
jest.mock("../../models/trajet.model", () => ({ create: jest.fn() }))
jest.mock("../../repository/maintenance.repository", () => ({ syncAssetStatuses: jest.fn() }))

describe("assigne repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("claims assets and creates an assignment", async () => {
    const data = { chauffeur: "u1", camion: "c1", remorque: "r1" }
    const trajet = { camion: { consommation: 5 }, populate: jest.fn().mockResolvedValue({ id: "t1" }) }
    MaintenanceRepository.syncAssetStatuses.mockResolvedValue()
    User.findOneAndUpdate.mockResolvedValue({ id: "u1" }); Camion.findOneAndUpdate.mockResolvedValue({ id: "c1" }); Remorque.findOneAndUpdate.mockResolvedValue({ id: "r1" }); Trajet.create.mockResolvedValue(trajet)
    await expect(Repository.create(data)).resolves.toEqual({ id: "t1" })
    expect(MaintenanceRepository.syncAssetStatuses).toHaveBeenCalledWith()
    expect(Trajet.create).toHaveBeenCalledWith(data)
    expect(trajet.populate).toHaveBeenCalledWith([{ path: "chauffeur", select: "first_name last_name email role" }, { path: "camion" }, { path: "remorque" }])
  })
  test("rolls back claimed chauffeur if camion is unavailable", async () => {
    const data = { chauffeur: "u1", camion: "c1", remorque: "r1" }
    MaintenanceRepository.syncAssetStatuses.mockResolvedValue()
    User.findOneAndUpdate.mockResolvedValue({ id: "u1" }); Camion.findOneAndUpdate.mockResolvedValue(null); User.updateOne.mockResolvedValue({})
    await expect(Repository.create(data)).rejects.toMatchObject({ status: 409, message: "Camion does not exist or is not available" })
    expect(User.updateOne).toHaveBeenCalledWith({ _id: "u1" }, { $set: { isActive: false } })
    expect(Trajet.create).not.toHaveBeenCalled()
  })
})
