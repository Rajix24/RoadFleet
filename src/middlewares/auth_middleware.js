const User = require("../models/user.model")
const { verify_token } = require("../utils/jwt.utils")

async function auth_middleware(req, res, next) {
  const authorization = req.headers.authorization
  const bearerToken = authorization?.startsWith("Bearer ") ? authorization.slice(7) : null
  const token = req.cookies?.access_token || bearerToken

  if (!token) {
    return res.status(401).json({ message: "User not authenticated" })
  }

  try {
    const payload = verify_token(req, token)
    const user = await User.findOne({ email: payload.sub })
    if (!user) return res.status(401).json({ message: "User not found" })
    req.user = user
    return next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

module.exports = auth_middleware
