const Course = require('../models/course')

exports.getIndexPage = (req, res) => {
  res.status(200).render('index', { page_name: 'index' })
}

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', { page_name: 'about' })
}

exports.getCoursesPage = async (req, res) => {
  const courses = await Course.find()
  res.status(200).render('courses', { page_name: 'courses', courses })
}

exports.getCourseDetailsPage = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
  res.status(200).render('course', { page_name: 'courses', course })
}
