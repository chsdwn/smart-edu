const express = require('express')
const pageController = require('../controllers/page')
const authMiddleware = require('../middlewares/auth')
const redirectMiddleware = require('../middlewares/redirect')

const router = express.Router()

router.route('/').get(pageController.getIndexPage)
router.route('/about').get(pageController.getAboutPage)
router.route('/courses').get(pageController.getCoursesPage)
router.route('/courses/:slug').get(pageController.getCourseDetailsPage)
router.route('/dashboard').get(authMiddleware, pageController.getDashboardPage)
router.route('/login').get(redirectMiddleware, pageController.getLoginPage)
router.route('/register').get(redirectMiddleware, pageController.getRegisterPage)

module.exports = router
