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
