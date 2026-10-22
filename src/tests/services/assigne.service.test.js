const Service = require("../../services/assigne.service")
const Repository = require("../../repository/assigne.repository")
jest.mock("../../repository/assigne.repository", () => ({ create: jest.fn() }))

describe("assigne service", () => {
  beforeEach(() => jest.clearAllMocks())
  test("creates a valid assignment", async () => {
    const data = { plannedDeparture: "2026-10-21T10:00:00Z", plannedArrival: "2026-10-21T12:00:00Z" }; const value = { id: "a1" }; Repository.create.mockResolvedValue(value)
    await expect(Service.assign(data)).resolves.toBe(value)
    expect(Repository.create).toHaveBeenCalledWith(data)
  })
  test("rejects arrival before departure", async () => {
    const data = { plannedDeparture: "2026-10-21T12:00:00Z", plannedArrival: "2026-10-21T10:00:00Z" }
    await expect(Service.assign(data)).rejects.toMatchObject({ status: 400, message: "Planned arrival must be after planned departure" })
    expect(Repository.create).not.toHaveBeenCalled()
  })
  test("updates assignment data", async () => { const data = { status: "done" }; await expect(Service.update(data)).resolves.toBe(data) })
})
