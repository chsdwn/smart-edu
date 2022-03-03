const Category = require('../models/category')
const Course = require('../models/course')
const User = require('../models/user')

exports.getIndexPage = async (req, res) => {
  const [courses, courseCount, studentCount, teacherCount] = await Promise.all([
    Course.find().sort('-createdAt').limit(2),
    Course.countDocuments(),
    User.find({ role: 'student' }).countDocuments(),
    User.find({ role: 'teacher' }).countDocuments()
  ])

  res.status(200).render('index', { page_name: 'index', courses, courseCount, studentCount, teacherCount })
}

exports.getAboutPage = (req, res) => {
  res.status(200).render('about', { page_name: 'about' })
}

exports.getContactPage = (req, res) => {
  res.status(200).render('contact', { page_name: 'contact' })
}

exports.getCoursesPage = async (req, res) => {
  let filter = { category: null }
  const categorySlug = req.query.category
  const searchKeyword = req.query.keyword || ''

  if (categorySlug) {
    const category = await Category.findOne({ slug: categorySlug })
    filter = { category: category._id }
  }

  const courses = await Course
    .find({
      $or: [
        { name: { $regex: '.*' + searchKeyword + '.*', $options: 'i' } },
        { category: filter.category }
      ]
    })
    .sort('-createdAt')
    .populate('user')
  const categories = await Category.find()
  res.status(200).render('courses', { page_name: 'courses', courses, categories })
}

exports.getCourseDetailsPage = async (req, res) => {
  const user = await User.findById(req.session.userID)
  const course = await Course
    .findOne({ slug: req.params.slug })
    .populate('user')
  const categories = await Category.find()

  res.status(200).render('course', {
    page_name: 'courses',
    course,
    categories,
    isEnrolled: user.courses.includes(course._id)
  })
}

exports.getDashboardPage = async (req, res) => {
  const userID = req.session.userID
  const user = await User.findById(userID).populate('courses')
  const categories = await Category.find()
  const courses = await Course.find({ user: userID })
  const users = await User.find().sort('_id')
  res.status(200).render('dashboard', { page_name: 'dashboard', user, categories, courses, users })
}

exports.getLoginPage = (req, res) => {
  res.status(200).render('login', { page_name: 'login' })
}

exports.getRegisterPage = (req, res) => {
  res.status(200).render('register', { page_name: 'register' })
}
