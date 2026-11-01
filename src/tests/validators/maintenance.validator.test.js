const { validationResult } = require("express-validator")
const {
  createMaintenanceValidator,
  updateMaintenanceValidator,
  maintenanceIdValidator
} = require("../../validators/maintenance.validator")

async function run(validators, body = {}, params = {}) {
  const req = { body, params }
  await Promise.all(validators.map(validator => validator.run(req)))
  return validationResult(req).array()
}

const validMaintenance = {
  camion: "507f1f77bcf86cd799439012",
  type: "vidange",
  description: "Oil change",
  maintenanceDate: "2026-10-08T10:00:00.000Z",
  mileage: 12000,
  cost: 500
}

describe("maintenance validator", () => {
  test("accepts a valid maintenance payload", async () => {
    await expect(run(createMaintenanceValidator, validMaintenance)).resolves.toHaveLength(0)
  })
  test("requires exactly one asset", async () => {
    const errors = await run(createMaintenanceValidator, { ...validMaintenance, camion: undefined })
    expect(errors.map(error => error.msg)).toContain("Select exactly one asset: camion or remorque")
  })
  test("rejects both camion and remorque", async () => {
    const errors = await run(createMaintenanceValidator, {
      ...validMaintenance,
      remorque: "507f1f77bcf86cd799439013"
    })
    expect(errors.map(error => error.msg)).toContain("Select exactly one asset: camion or remorque")
  })
  test("rejects invalid maintenance fields", async () => {
    const errors = await run(createMaintenanceValidator, {
      ...validMaintenance,
      type: "unknown",
      mileage: -1,
      cost: -1
    })
    expect(errors.map(error => error.msg)).toEqual(expect.arrayContaining([
      "Invalid maintenance type",
      "Mileage must be zero or greater",
      "Cost must be zero or greater"
    ]))
  })
  test("accepts a partial update", async () => {
    await expect(run(updateMaintenanceValidator, { status: "completed" }, { id: "507f1f77bcf86cd799439012" })).resolves.toHaveLength(0)
  })
  test("rejects an update containing both assets", async () => {
    const errors = await run(updateMaintenanceValidator, {
      camion: "507f1f77bcf86cd799439012",
      remorque: "507f1f77bcf86cd799439013"
    }, { id: "507f1f77bcf86cd799439012" })
    expect(errors.map(error => error.msg)).toContain("Select exactly one asset: camion or remorque")
  })
  test("rejects an invalid maintenance id", async () => {
    const errors = await run(maintenanceIdValidator, {}, { id: "invalid" })
    expect(errors.map(error => error.msg)).toContain("Maintenance id must be valid")
  })
})
