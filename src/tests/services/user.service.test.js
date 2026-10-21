const Service = require("../../services/user.service");
const Repository = require("../../repository/user.repository");
jest.mock("../../repository/user.repository", () => ({
  findAll: jest.fn(),
  findByEmail: jest.fn(),
  updateUser: jest.fn(),
  deleteByEmail: jest.fn(), 
  available: jest.fn(),
}));

describe("user service", () => {
  beforeEach(() => jest.clearAllMocks());
  test("gets all users", async () => {
    Repository.findAll.mockResolvedValue([]);
    await expect(Service.getAllUsers()).resolves.toEqual([]);
    expect(Repository.findAll).toHaveBeenCalledWith();
  });
  test("gets one user", async () => {
    const value = { email: "a@b.com" };
    Repository.findByEmail.mockResolvedValue(value);
    await expect(Service.getOne(value.email)).resolves.toBe(value);
    expect(Repository.findByEmail).toHaveBeenCalledWith(value.email);
  });
  test("updates a user", async () => {
    const data = { first_name: "A" };
    Repository.updateUser.mockResolvedValue(data);
    await expect(Service.updateUserInfo("a@b.com", data)).resolves.toBe(data);
    expect(Repository.updateUser).toHaveBeenCalledWith("a@b.com", data);
  });
  test("deletes a user", async () => {
    const result = { deletedCount: 1 };
    Repository.deleteByEmail.mockResolvedValue(result);
    await expect(Service.deleteUser("a@b.com")).resolves.toBe(result);
    expect(Repository.deleteByEmail).toHaveBeenCalledWith("a@b.com");
  });
  test("gets available users", async () => {
    Repository.available.mockResolvedValue([]);
    await expect(Service.available()).resolves.toEqual([]);
    expect(Repository.available).toHaveBeenCalledWith();
  });
});
