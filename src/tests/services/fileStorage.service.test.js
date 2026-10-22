const s3 = require("../../config/s3")
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const Service = require("../../services/fileStorage.service")

jest.mock("../../config/s3", () => ({ send: jest.fn() }))
jest.mock("@aws-sdk/client-s3", () => ({
  CreateBucketCommand: jest.fn(function (input) { this.input = input }),
  HeadBucketCommand: jest.fn(function (input) { this.input = input }),
  PutObjectCommand: jest.fn(function (input) { this.input = input }),
  GetObjectCommand: jest.fn(function (input) { this.input = input }),
  DeleteObjectCommand: jest.fn(function (input) { this.input = input })
}))
jest.mock("@aws-sdk/s3-request-presigner", () => ({ getSignedUrl: jest.fn() }))

describe("file storage service", () => {
  beforeEach(() => jest.clearAllMocks())
  test("uploads a file and initializes a missing bucket", async () => {
    s3.send.mockRejectedValueOnce(Object.assign(new Error("missing"), { name: "NotFound" })).mockResolvedValue({})
    const file = { buffer: Buffer.from("data"), size: 4, mimetype: "application/pdf", originalname: "doc.pdf" }
    const result = await Service.uploadFile(file)
    expect(result).toMatchObject({ bucket: "assigne-pdf-file", originalName: "doc.pdf", mimeType: "application/pdf", size: 4 })
    expect(result.key).toEqual(expect.any(String))
    expect(s3.send).toHaveBeenCalledTimes(3)
  })
  test("generates a signed download URL", async () => {
    getSignedUrl.mockResolvedValue("https://example.test/file")
    await expect(Service.getFileUrl("file-key")).resolves.toBe("https://example.test/file")
    expect(getSignedUrl).toHaveBeenCalledWith(s3, expect.any(Object), { expiresIn: 3000 })
  })
  test("deletes an object", async () => {
    s3.send.mockResolvedValue({})
    await expect(Service.deleteFile("file-key")).resolves.toBeUndefined()
    expect(s3.send).toHaveBeenCalledTimes(1)
  })
})
