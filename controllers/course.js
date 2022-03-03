const Course = require('../models/course')
const User = require('../models/user')

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

exports.enroll = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    user.courses.push(req.params.id)
    await user.save()
    res.status(200).redirect('/dashboard')
  } catch (err) {
    res.status(400).send(err.message)
  }
}

exports.release = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID)
    user.courses.pull({ _id: req.params.id })
    await user.save()
    res.status(200).redirect('/dashboard')
  } catch (err) {
    res.status(400).send(err.message)
  }
}
