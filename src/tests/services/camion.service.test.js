const Service = require("../../services/camion.service");
const Repository = require("../../repository/camion.repository");
jest.mock("../../repository/camion.repository", () => ({
  getAllCamions: jest.fn(),
  createCamion: jest.fn(),
  edit: jest.fn(),
  delete: jest.fn(),
  availble: jest.fn(),
}));

describe("camion service", () => {
  beforeEach(() => jest.clearAllMocks());
  test("gets all camions", async () => {
    Repository.getAllCamions.mockResolvedValue([]);
    await expect(Service.getAllCamions()).resolves.toEqual([]);
    expect(Repository.getAllCamions).toHaveBeenCalledWith();
  });
  test("saves a camion", async () => {
    const data = { number: "1001" };
    Repository.createCamion.mockResolvedValue(data);
    await expect(Service.saveCamion(data)).resolves.toBe(data);
    expect(Repository.createCamion).toHaveBeenCalledWith(data);
  });
  test("edits a camion", async () => {
    const data = { brand: "A" };
    Repository.edit.mockResolvedValue(data);
    await expect(Service.editCamion("1001", data)).resolves.toBe(data);
    expect(Repository.edit).toHaveBeenCalledWith("1001", data);
  });
  test("deletes a camion", async () => {
    const result = { deletedCount: 1 };
    Repository.delete.mockResolvedValue(result);
    await expect(Service.deleteCamion({ number: "1001" })).resolves.toBe(
      result,
    );
    expect(Repository.delete).toHaveBeenCalledWith({ number: "1001" });
  });
  test("gets available camions", async () => {
    Repository.availble.mockResolvedValue([]);
    await expect(Service.availbleCamions()).resolves.toEqual([]);
    expect(Repository.availble).toHaveBeenCalledWith();
  });
  test("propagates repository failures", async () => {
    Repository.getAllCamions.mockRejectedValue(new Error("failure"));
    await expect(Service.getAllCamions()).rejects.toThrow("Error: failure");
  });
});
