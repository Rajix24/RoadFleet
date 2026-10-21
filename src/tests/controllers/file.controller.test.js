const Controller = require("../../controllers/file.controller")
const Service = require("../../services/fileStorage.service")

jest.mock("../../services/fileStorage.service", () => ({ uploadFile: jest.fn(), getFileUrl: jest.fn(), deleteFile: jest.fn() }))

describe("file controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn() }; jest.clearAllMocks() })
  test("uploads a file", async () => {
    const file = { originalname: "doc.pdf" }; const data = { key: "key-1" }; Service.uploadFile.mockResolvedValue(data)
    await Controller.uploadFile({ file }, res)
    expect(Service.uploadFile).toHaveBeenCalledWith(file)
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: "file upload", file: data })
  })
  test("rejects upload without a file", async () => {
    await Controller.uploadFile({}, res)
    expect(Service.uploadFile).not.toHaveBeenCalled()
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ message: "please enter file" })
  })
  test("gets a file URL", async () => {
    Service.getFileUrl.mockResolvedValue("https://example.test/file")
    await Controller.getFile({ params: { key: "key-1" } }, res)
    expect(Service.getFileUrl).toHaveBeenCalledWith("key-1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "Temporary download URL generated", url: "https://example.test/file", expiresIn: 3000 })
  })
  test("deletes a file", async () => {
    await Controller.deleteFile({ params: { key: "key-1" } }, res)
    expect(Service.deleteFile).toHaveBeenCalledWith("key-1")
    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({ message: "File deleted successfully" })
  })
})
