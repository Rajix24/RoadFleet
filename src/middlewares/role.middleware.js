const roleMiddleware = (requiredRole) => (req, res, next) => {
  if (req.user?.role !== requiredRole) {
    return res.status(403).json({ message: "Not authorized" })
  }
  return next()
}

module.exports = roleMiddleware
