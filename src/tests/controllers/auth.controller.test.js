const bcrypt = require("bcrypt")
const User = require("../../models/user.model")
const jwt = require("../../utils/jwt.utils")
const { login_user, register_user, check_auth, logout } = require("../../controllers/auth")

jest.mock("bcrypt", () => ({ compare: jest.fn(), genSalt: jest.fn(), hash: jest.fn() }))
jest.mock("../../models/user.model", () => ({ findOne: jest.fn(), create: jest.fn() }))
jest.mock("../../utils/jwt.utils", () => ({ verify_token: jest.fn(), setToken: jest.fn() }))

describe("auth controller", () => {
  let res
  beforeEach(() => { res = { status: jest.fn().mockReturnThis(), json: jest.fn(), clearCookie: jest.fn() }; jest.clearAllMocks() })
  test("logs in an existing user", async () => {
    const user = { email: "user@example.com", password: "hash" }; User.findOne.mockResolvedValue(user)
    bcrypt.compare.mockResolvedValue(true); jwt.setToken.mockReturnValue("token")
    await login_user({ body: { email: user.email, password: "password" } }, res)
    expect(res.status).not.toHaveBeenCalled()
    expect(res.json).toHaveBeenCalledWith({ message: "Successfull login", user: { email: user.email, token: "token" } })
  })
  test("rejects login when user is missing", async () => {
    User.findOne.mockResolvedValue(null)
    await login_user({ body: { email: "missing@example.com", password: "password" } }, res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ status: false, message: "User not found" })
  })
  test("registers a user", async () => {
    const user = { email: "user@example.com" }; User.findOne.mockResolvedValue(null)
    bcrypt.genSalt.mockResolvedValue("salt"); bcrypt.hash.mockResolvedValue("hash"); User.create.mockResolvedValue(user); jwt.setToken.mockReturnValue("token")
    await register_user({ body: { first_name: "Test", last_name: "User", email: user.email, password: "password" } }, res)
    expect(User.create).toHaveBeenCalledWith({ first_name: "Test", last_name: "User", email: user.email, password: "hash" })
    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({ message: "User has been register ", user: user.email, token: "token" })
  })
  test("checks a valid token", () => {
    jwt.verify_token.mockReturnValue({ id: "u1" })
    check_auth({ cookies: { access_token: "token" } }, res)
    expect(jwt.verify_token).toHaveBeenCalledWith("token")
    expect(res.json).toHaveBeenCalledWith({ authorisation: { id: "u1" } })
  })
  test("rejects a missing token", () => {
    check_auth({ cookies: {} }, res)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ authorisation: false, message: "Token not avialible" })
  })
  test("logs out and clears the cookie", () => {
    logout({}, res)
    expect(res.clearCookie).toHaveBeenCalledWith("access_token", { httpOnly: true, secure: false, sameSite: "lax" })
    expect(res.json).toHaveBeenCalledWith({ message: "user logout!" })
  })
})
