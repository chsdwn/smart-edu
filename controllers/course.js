const Course = require('../models/course')

exports.getAll = async (req, res) => {
  try {
    const courses = await Course.find()
    res.status(200).send(courses)
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.create = async (req, res) => {
  try {
    await Course.create({ ...req.body, user: req.session.userID })
    res.status(201).redirect('/courses')
  } catch (err) {
    res.status(400).send(err.message)
  }
}
