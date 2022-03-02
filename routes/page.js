const express = require('express')
const pageController = require('../controllers/page')

const router = express.Router()

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/courses').get(pageController.getCoursesPage)
router.route('/courses/:slug').get(pageController.getCourseDetailsPage)

module.exports = router
