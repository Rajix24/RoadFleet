const Model = require("../../models/user.model")
const Repository = require("../../repository/user.repository")
jest.mock("../../models/user.model", () => ({ find: jest.fn(), findOne: jest.fn(), findOneAndUpdate: jest.fn(), deleteOne: jest.fn() }))

describe("user repository", () => {
  beforeEach(() => jest.clearAllMocks())
  test("finds all users", async () => { const users = [{ email: "a@b.com" }]; Model.find.mockResolvedValue(users); await expect(Repository.findAll()).resolves.toBe(users); expect(Model.find).toHaveBeenCalledWith() })
  test("finds a user by email", async () => { const user = { email: "a@b.com" }; Model.findOne.mockResolvedValue(user); await expect(Repository.findByEmail(user.email)).resolves.toBe(user); expect(Model.findOne).toHaveBeenCalledWith({ email: user.email }) })
  test("updates a user by email", async () => { const user = { email: "a@b.com" }; Model.findOneAndUpdate.mockResolvedValue(user); await expect(Repository.updateUser(user.email, { first_name: "A" })).resolves.toBe(user); expect(Model.findOneAndUpdate).toHaveBeenCalledWith({ email: user.email }, { $set: { first_name: "A" } }, { new: true, runValidators: true }) })
  test("deletes a user by email", async () => { const result = { deletedCount: 1 }; Model.deleteOne.mockResolvedValue(result); await expect(Repository.deleteByEmail("a@b.com")).resolves.toBe(result); expect(Model.deleteOne).toHaveBeenCalledWith({ email: "a@b.com" }) })
  test("finds available chauffeurs", async () => { const users = []; Model.find.mockResolvedValue(users); await expect(Repository.available()).resolves.toBe(users); expect(Model.find).toHaveBeenCalledWith({ isActive: false, role: "chauffeur" }) })
})
