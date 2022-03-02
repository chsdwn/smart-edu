const Category = require('../models/category')
const Course = require('../models/course')

exports.getIndexPage = (req, res) => {
  res.status(200).render('index', { page_name: 'index' })
}

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', { page_name: 'about' })
}

exports.getCoursesPage = async (req, res) => {
  let filter
  const categorySlug = req.query.category
  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug })
    filter = { category: category._id }
  }

  const courses = await Course.find(filter)
  const categories = await Category.find()
  res.status(200).render('courses', { page_name: 'courses', courses, categories })
}

exports.getCourseDetailsPage = async (req, res) => {
  const course = await Course.findOne({ slug: req.params.slug })
  res.status(200).render('course', { page_name: 'courses', course })
}

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', { page_name: 'register' })
}
