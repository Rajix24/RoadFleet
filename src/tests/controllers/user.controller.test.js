const Controller = require("../../controllers/user.controller")
const Service = require("../../services/user.service")

jest.mock("../../services/user.service", () => ({ getAllUsers: jest.fn(), getOne: jest.fn(), updateUserInfo: jest.fn(), deleteUser: jest.fn() }))

describe("user controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; jest.clearAllMocks() })
  test("lists users", async () => {
    const data = [{ email: "user@example.com" }]; Service.getAllUsers.mockResolvedValue(data)
    await Controller.getAll({}, res)
    expect(Service.getAllUsers).toHaveBeenCalledWith()
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith(data)
  })
  test("gets a user by email", async () => {
    const data = { email: "user@example.com" }; Service.getOne.mockResolvedValue(data)
    await Controller.getOneUser({ params: { email: data.email } }, res)
    expect(Service.getOne).toHaveBeenCalledWith(data.email)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: true, data })
  })
  test("updates a user", async () => {
    const data = { first_name: "New" }; Service.updateUserInfo.mockResolvedValue(data)
    await Controller.UpdateUser({ params: { email: "user@example.com" }, body: data }, res)
    expect(Service.updateUserInfo).toHaveBeenCalledWith("user@example.com", data)
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "controller is wroking", data })
  })
  test("deletes a user", async () => {
    const result = { deletedCount: 1 }; Service.deleteUser.mockResolvedValue(result)
    await Controller.deleteUser({ params: { email: "user@example.com" } }, res)
    expect(Service.deleteUser).toHaveBeenCalledWith("user@example.com")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "u has beed delete the user", result })
  })
})
