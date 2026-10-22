const Service = require("../../services/trajet.service");
const Repository = require("../../repository/tarjet.repository");
jest.mock("../../repository/tarjet.repository", () => ({
  getAllTrajets: jest.fn(),
  createTrajet: jest.fn(),
}));

describe("trajet service", () => {
  beforeEach(() => jest.clearAllMocks());
  test("gets all trajets", async () => {
    Repository.getAllTrajets.mockResolvedValue([]);
    await expect(Service.getAllTrajets()).resolves.toEqual([]);
    expect(Repository.getAllTrajets).toHaveBeenCalledWith();
  });
  test("registers a trajet", async () => {
    const data = { distance: 50 };
    Repository.createTrajet.mockResolvedValue(data);
    await expect(Service.registerTrajet(data)).resolves.toBe(data);
    expect(Repository.createTrajet).toHaveBeenCalledWith(data);
  });
  test("propagates repository errors", async () => {
    Repository.createTrajet.mockRejectedValue(new Error("failure"));
    await expect(Service.registerTrajet({})).rejects.toThrow("failure");
  });
});
