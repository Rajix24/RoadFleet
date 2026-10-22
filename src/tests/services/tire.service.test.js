const Service = require("../../services/tire.service");
const Repository = require("../../repository/tire.repository");
jest.mock("../../repository/tire.repository", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
}));

describe("tire service", () => {
  beforeEach(() => jest.clearAllMocks());
  test("gets all tires", async () => {
    Repository.findAll.mockResolvedValue([]);
    await expect(Service.getAll()).resolves.toEqual([]);
    expect(Repository.findAll).toHaveBeenCalledWith();
  });
  test("gets a tire by id", async () => {
    const tire = { id: "t1" };
    Repository.findById.mockResolvedValue(tire);
    await expect(Service.getById("t1")).resolves.toBe(tire);
    expect(Repository.findById).toHaveBeenCalledWith("t1");
  });
  test("creates a tire", async () => {
    const data = { brand: "A" };
    Repository.create.mockResolvedValue(data);
    await expect(Service.create(data)).resolves.toBe(data);
    expect(Repository.create).toHaveBeenCalledWith(data);
  });
  test("updates a tire", async () => {
    const data = { id: "t1", brand: "B" };
    Repository.update.mockResolvedValue(data);
    await expect(Service.update("t1", { brand: "B" })).resolves.toBe(data);
    expect(Repository.update).toHaveBeenCalledWith("t1", { brand: "B" });
  });
  test("deletes a tire", async () => {
    const tire = { id: "t1" };
    Repository.delete.mockResolvedValue(tire);
    await expect(Service.delete("t1")).resolves.toBe(tire);
    expect(Repository.delete).toHaveBeenCalledWith("t1");
  });
  test("throws 404 when tire does not exist", async () => {
    Repository.findById.mockResolvedValue(null);
    await expect(Service.getById("missing")).rejects.toMatchObject({
      status: 404,
      message: "Tire not found",
    });
  });
});
