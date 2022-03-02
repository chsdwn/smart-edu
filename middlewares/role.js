module.exports = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.body.role)) return res.status(401).send('Unauthorized')
    next()
  }
}
