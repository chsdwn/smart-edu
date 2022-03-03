const Category = require('../models/category')
const Course = require('../models/course')
const User = require('../models/user')

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
  const user = await User.findById(req.session.userID)
  const course = await Course
    .findOne({ slug: req.params.slug })
    .populate('user')
  res.status(200).render('course', { page_name: 'courses', course, isEnrolled: user.courses.includes(course._id) })
}

exports.getDashboardPage = async (req, res) => {
  const userID = req.session.userID
  const user = await User.findById(userID).populate('courses')
  const categories = await Category.find()
  const courses = await Course.find({ user: userID })
  res.status(200).render('dashboard', { page_name: 'dashboard', user, categories, courses })
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', { page_name: 'login' })
}

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', { page_name: 'register' })
}
