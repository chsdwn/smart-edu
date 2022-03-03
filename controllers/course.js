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
    const course = await Course.create({ ...req.body, user: req.session.userID })
    req.flash('success', `${course.name} has been created successfully.`)
    res.status(201).redirect('/courses')
  } catch (err) {
    req.flash('error', 'An error occured.')
    res.status(400).redirect('/courses')
  }
}

exports.update = async (req, res) => {
  try {
    const { name, description, category } = req.body
    const course = await Course.findOne({ slug: req.params.slug })
    course.name = name
    course.description = description
    course.category = category
    await course.save()

    req.flash('success', `${course.name} has been updated successfully.`)
    res.status(200).redirect('/dashboard')
  } catch (err) {
    req.flash('error', 'An error occured.')
    res.status(400).redirect('/dashboard')
  }
}

exports.delete = async (req, res) => {
  try {
    await Course.findOneAndRemove({ slug: req.params.slug })
    req.flash('success', 'Deleted successfully.')
    res.status(200).redirect('/dashboard')
  } catch (err) {
    req.flash('error', 'An error occured.')
    res.status(400).redirect('/dashboard')
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
