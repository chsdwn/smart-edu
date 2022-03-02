const User = require('../models/user')

exports.create = async (req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
