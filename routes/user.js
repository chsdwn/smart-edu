const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()

router.route('/login').post(authController.login)
router.route('/signup').post(authController.create)

module.exports = router
