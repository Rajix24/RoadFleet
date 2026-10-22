const Service = require("../../services/maintenance.service");
const Repository = require("../../repository/maintenance.repository");
jest.mock("../../repository/maintenance.repository", () => ({
  getAll: jest.fn(),
  create: jest.fn(),
  delete: jest.fn(),
}));

describe("maintenance service", () => {
  beforeEach(() => jest.clearAllMocks());
  test("gets all maintenance records", async () => {
    Repository.getAll.mockResolvedValue([]);
    await expect(Service.getAll()).resolves.toEqual([]);
    expect(Repository.getAll).toHaveBeenCalledWith();
  });
  test("creates a maintenance record", async () => {
    const data = { reason: "service" };
    Repository.create.mockResolvedValue(data);
    await expect(Service.create(data)).resolves.toBe(data);
    expect(Repository.create).toHaveBeenCalledWith(data);
  });
  test("propagates repository errors", async () => {
    Repository.create.mockRejectedValue(new Error("failure"));
    await expect(Service.create({})).rejects.toThrow("failure");
  });
});
