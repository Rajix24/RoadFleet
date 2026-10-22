const Service = require("../../services/remorque.service");
const Repository = require("../../repository/remorque.repository");
jest.mock("../../repository/remorque.repository", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  avaibleRemorque: jest.fn(),
}));

describe("remorque service", () => {
  beforeEach(() => jest.clearAllMocks());
  test("gets all remorques", async () => {
    Repository.findAll.mockResolvedValue([]);
    await expect(Service.getAll()).resolves.toEqual([]);
    expect(Repository.findAll).toHaveBeenCalledWith();
  });
  test("gets a remorque by id", async () => {
    const value = { id: "r1" };
    Repository.findById.mockResolvedValue(value);
    await expect(Service.getById("r1")).resolves.toBe(value);
    expect(Repository.findById).toHaveBeenCalledWith("r1");
  });
  test("creates a remorque", async () => {
    const data = { number: "R1" };
    Repository.create.mockResolvedValue(data);
    await expect(Service.create(data)).resolves.toBe(data);
    expect(Repository.create).toHaveBeenCalledWith(data);
  });
  test("updates a remorque", async () => {
    const value = { id: "r1" };
    Repository.update.mockResolvedValue(value);
    await expect(Service.update("r1", { status: "available" })).resolves.toBe(
      value,
    );
    expect(Repository.update).toHaveBeenCalledWith("r1", {
      status: "available",
    });
  });
  test("deletes a remorque", async () => {
    const value = { id: "r1" };
    Repository.delete.mockResolvedValue(value);
    await expect(Service.delete("r1")).resolves.toBe(value);
    expect(Repository.delete).toHaveBeenCalledWith("r1");
  });
  test("gets available remorques", async () => {
    Repository.avaibleRemorque.mockResolvedValue([]);
    await expect(Service.avaible()).resolves.toEqual([]);
    expect(Repository.avaibleRemorque).toHaveBeenCalledWith({
      status: "available",
    });
  });
  test("throws 404 when remorque is missing", async () => {
    Repository.findById.mockResolvedValue(null);
    await expect(Service.getById("missing")).rejects.toMatchObject({
      status: 404,
      message: "Remorque not found",
    });
  });
});
