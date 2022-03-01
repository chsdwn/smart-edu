const Course = require('../models/course')

exports.create = async (req, res) => {
  try {
    const course = await Course.create(req.body)
    res.status(201).send(course)
  } catch (err) {
    res.status(400).send(err.message)
  }
}
