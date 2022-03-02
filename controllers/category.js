const Category = require('../models/category')

exports.create = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).send(category)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
